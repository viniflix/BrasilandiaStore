import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

// Checkout API - Creates order and Mercado Pago payment

interface CheckoutItem {
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  commands: string[];
}

interface CheckoutRequest {
  items: CheckoutItem[];
  player_nickname: string;
  email: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutRequest = await request.json();
    const { items, player_nickname, email } = body;

    // Validate request
    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 });
    }

    if (!player_nickname?.trim()) {
      return NextResponse.json({ error: 'Player nickname is required' }, { status: 400 });
    }

    if (!email?.trim()) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Calculate total
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const supabase = createServerClient();

    // Create order in database
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        player_nickname,
        email,
        total,
        status: 'pending',
        payment_id: '', // Will be updated after MP payment creation
      } as never)
      .select()
      .single();

    if (orderError || !order) {
      console.error('Failed to create order:', orderError);
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }

    const orderId = (order as { id: string }).id;

    // Create order items
    const orderItems = items.map((item) => ({
      order_id: orderId,
      product_id: item.product_id,
      product_name: item.product_name,
      quantity: item.quantity,
      price: item.price,
      commands: item.commands,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems as never);

    if (itemsError) {
      console.error('Failed to create order items:', itemsError);
      // Rollback order
      await supabase.from('orders').delete().eq('id', orderId);
      return NextResponse.json({ error: 'Failed to create order items' }, { status: 500 });
    }

    // Create Mercado Pago payment
    const mpAccessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    if (!mpAccessToken) {
      console.error('Missing Mercado Pago access token');
      return NextResponse.json({ error: 'Payment configuration error' }, { status: 500 });
    }

    // Create payment preference
    const preference = {
      items: items.map((item) => ({
        title: item.product_name,
        quantity: item.quantity,
        unit_price: item.price,
        currency_id: 'BRL',
      })),
      payer: {
        email: email,
      },
      back_urls: {
        success: `${appUrl}/checkout/success?order_id=${orderId}`,
        failure: `${appUrl}/checkout/failure?order_id=${orderId}`,
        pending: `${appUrl}/checkout/pending?order_id=${orderId}`,
      },
      auto_return: 'approved',
      notification_url: `${appUrl}/api/webhook/mercadopago`,
      external_reference: orderId,
      payment_methods: {
        excluded_payment_types: [],
        installments: 1,
      },
    };

    const mpResponse = await fetch(
      'https://api.mercadopago.com/checkout/preferences',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${mpAccessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preference),
      }
    );

    if (!mpResponse.ok) {
      const error = await mpResponse.text();
      console.error('Mercado Pago error:', error);
      return NextResponse.json({ error: 'Failed to create payment' }, { status: 500 });
    }

    const mpData = await mpResponse.json();

    // Update order with payment ID
    await supabase
      .from('orders')
      .update({ payment_id: mpData.id } as never)
      .eq('id', orderId);

    return NextResponse.json({
      order_id: orderId,
      init_point: mpData.init_point, // Checkout URL
      sandbox_init_point: mpData.sandbox_init_point, // Sandbox URL for testing
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
