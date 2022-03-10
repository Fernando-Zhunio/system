// export interface IOrder {
//     id: number;
//     type: string;
//     client_id: string;
//     channel_id: string;
//     subtotal: string;
//     discount: string;
//     retention: string;
//     tax: string;
//     total: string;
//     total_paid: string;
//     created_at: string;
//     updated_at: string;
//     deleted_at?: string;
// }

import { Iwarehouse } from "./iwarehouse";

export interface IItemOrder {
    product_id: number;
    quantity: string;
    price: number;
    order_id: number;
    updated_at: string;
    created_at: string;
    id: number;
    order: IOrder;
    product: Product;
  }
  export interface AdditionalAmountsEntity {
    id: number;
    type: string;
    amount_type: string;
    amount: string;
    order_id: number;
    created_at: string;
    updated_at: string;
  }
  export interface ItemsEntity {
    id: number;
    product_id: number;
    order_id: number;
    quantity: number;
    price: number;
    created_at: string;
    updated_at: string;
  }
  export interface Product {
    id: number;
    name: string;
    description: string;
    category_id: number;
    brand_id: number;
    sequence_id: number;
    prefix_id: number;
    code: string;
    code_alt: string;
    user_id: number;
    old_code?: any;
    available: number;
    image?: any;
    cubicweight?: any;
    weight?: any;
    height?: any;
    width?: any;
    length?: any;
    created_at: string;
    updated_at: string;
    deleted_at?: any;
  }


  export interface IOrder {
    id: number;
    type: string;
    channel_id: number;
    client_id: number;
    shipping: number;
    subtotal: number;
    discount: number;
    retention: number;
    tax: number;
    total: number;
    total_paid: number;
    created_at: string;
    updated_at: string;
    shippings: IShipping[];
    client: Client;
    shipping_address: IShippingAddress;
    payments?: (any)[] | any;
    additional_amounts?: (AdditionalAmountsEntity)[] | any;
    items?:  (ItemsEntity)[] | any;
  }
  export interface Client {
    id: number;
    first_name: string;
    last_name: string;
    doc_type: string;
    doc_id: string;
    email: string;
    phone: string;
    city: string;
    state: string;
    country: string;
    novisys_id?: any;
    created_at: string;
    updated_at: string;
  }
  export interface IShippingAddress {
    id: number;
    first_name: string;
    last_name: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zip_code: string;
    order_id: number;
    created_at: string;
    updated_at: string;
  }

  export interface IPayments{
    id: number;
    type: 'credit_card' | 'cash' | 'debit_card' | 'wire' | 'paymentez';
    status: 'pending' | 'paid' | 'refunded' | 'cancelled';
    amount: number;
    description: string;
    order_id: number;
    created_at: string;
    updated_at: string;
  }

   export interface IShipping {
    id: number;
    type: string;
    status: string;
    amount: number;
    cubicweight?: any;
    weight?: any;
    height?: any;
    width?: any;
    length?: any;
    tracking_number: string;
    order_id: number;
    origin_warehouse_id?: any;
    origin_warehouse: Iwarehouse;
    created_at: string;
    updated_at: string;
  }
