export interface Database {
  public: {
    Tables: {
      products: {
        Row: Product;
        Insert: Omit<Product, 'id' | 'created_at'>;
        Update: Partial<Omit<Product, 'id' | 'created_at'>>;
      };
      categories: {
        Row: Category;
        Insert: Omit<Category, 'id' | 'created_at'>;
        Update: Partial<Omit<Category, 'id' | 'created_at'>>;
      };
      orders: {
        Row: Order;
        Insert: Omit<Order, 'id' | 'created_at'>;
        Update: Partial<Omit<Order, 'id' | 'created_at'>>;
      };
      order_items: {
        Row: OrderItem;
        Insert: Omit<OrderItem, 'id'>;
        Update: Partial<Omit<OrderItem, 'id'>>;
      };
      store_settings: {
        Row: StoreSettings;
        Insert: Omit<StoreSettings, 'id' | 'updated_at'>;
        Update: Partial<Omit<StoreSettings, 'id' | 'updated_at'>>;
      };
      admin_whitelist: {
        Row: AdminWhitelist;
        Insert: Omit<AdminWhitelist, 'id' | 'created_at'>;
        Update: Partial<Omit<AdminWhitelist, 'id' | 'created_at'>>;
      };
    };
  };
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category_id: string;
  commands: string[];
  active: boolean;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  created_at: string;
}

export interface Order {
  id: string;
  player_nickname: string;
  email: string;
  total: number;
  status: 'pending' | 'approved' | 'delivered' | 'cancelled';
  payment_id: string;
  created_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  price: number;
  commands: string[];
}

export interface StoreSettings {
  id: string;
  store_name: string;
  logo_url: string;
  primary_green: string;
  primary_blue: string;
  primary_yellow: string;
  background_color: string;
  updated_at: string;
}

export interface AdminWhitelist {
  id: string;
  email: string;
  created_at: string;
}

// Cart types for Zustand store
export interface CartItem {
  product: Product;
  quantity: number;
}
