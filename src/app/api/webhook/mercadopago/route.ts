import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';
import { sendMultipleCommands } from '@/lib/pterodactyl';
import type { Order, OrderItem } from '@/types/database';

// Mercado Pago webhook handler
// This receives payment notifications and delivers products to the player

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check if it's a payment notification
    if (body.type !== 'payment') {
      return NextResponse.json({ received: true });
    }

    const paymentId = body.data?.id;
    if (!paymentId) {
      return NextResponse.json({ error: 'Missing payment ID' }, { status: 400 });
    }

    // Fetch payment details from Mercado Pago
    const mpAccessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
    if (!mpAccessToken) {
      console.error('Missing Mercado Pago access token');
      return NextResponse.json({ error: 'Configuration error' }, { status: 500 });
    }

    const paymentResponse = await fetch(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          'Authorization': `Bearer ${mpAccessToken}`,
        },
      }
    );

    if (!paymentResponse.ok) {
      console.error('Failed to fetch payment from MP');
      return NextResponse.json({ error: 'Failed to verify payment' }, { status: 500 });
    }

    const payment = await paymentResponse.json();

    // Only process approved payments
    if (payment.status !== 'approved') {
      console.log(`Payment ${paymentId} status: ${payment.status}`);
      return NextResponse.json({ received: true });
    }

    const supabase = createServerClient();

    // Find the order by payment_id
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('payment_id', paymentId.toString())
      .single();

    if (orderError || !orderData) {
      console.error('Order not found for payment:', paymentId);
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const order = orderData as Order;

    // Check if already delivered
    if (order.status === 'delivered') {
      console.log(`Order ${order.id} already delivered`);
      return NextResponse.json({ received: true });
    }

    // Update order status to approved
    await supabase
      .from('orders')
      .update({ status: 'approved' } as never)
      .eq('id', order.id);

    // Fetch order items
    const { data: itemsData, error: itemsError } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', order.id);

    if (itemsError || !itemsData) {
      console.error('Failed to fetch order items:', itemsError);
      return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
    }

    const orderItems = itemsData as OrderItem[];

    // Collect all commands to execute
    const allCommands: string[] = [];
    for (const item of orderItems) {
      // Each item can have multiple commands, and quantity matters
      for (let i = 0; i < item.quantity; i++) {
        allCommands.push(...item.commands);
      }
    }

    // Send commands to Pterodactyl
    const { success, errors } = await sendMultipleCommands(
      allCommands,
      order.player_nickname
    );

    if (success) {
      // Update order status to delivered
      await supabase
        .from('orders')
        .update({ status: 'delivered' } as never)
        .eq('id', order.id);

      console.log(`Order ${order.id} delivered successfully`);
    } else {
      console.error('Some commands failed:', errors);
      // Keep status as approved, maybe retry later
    }

    return NextResponse.json({ received: true, delivered: success });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
