

import { Iwarehouse } from './iwarehouse';

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
export interface IDiscountAndTaxes {
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
  status: string;
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
  shippings: IShippingOrder[];
  client: IClientOrder;
  shipping_address: IShippingAddress;
  payments?: (any)[] | any;
  additional_amounts?: (IDiscountAndTaxes)[] | any;
  items?: (ItemsEntity)[] | any;
  transfers?: ITransference[];
  statuses: IStatus[];
  invoices: IInvoice[];
}
export interface IClientOrder {
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
  address_id: number;
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

export interface IPaymentOrder {
  id: number;
  type: 'credit_card' | 'cash' | 'debit_card' | 'wire' | 'paymentez';
  status: 'pending' | 'paid' | 'refunded' | 'cancelled';
  amount: number;
  link_to_pay: string;
  description: string;
  order_id: number;
  created_at: string;
  updated_at: string;
  order: IOrder;
  statuses: IStatus[];
}

export interface IShippingOrder {
  id: number;
  type: string;
  status: string;
  amount: number;
  cubicweight?: any;
  weight?: any;
  height?: any;
  width?: any;
  length?: any;
  tracking_link: string;
  tracking_number: string;
  order_id: number;
  origin_warehouse_id?: any;
  origin_warehouse: Iwarehouse;
  created_at: string;
  updated_at: string;
  statuses: IStatus[];
}

export interface IChannelOrder {
  id: number;
  name: string;
  type: string;
  created_at: string;
  updated_at: string;
}

export interface ITransference {
  id: number;
  doc_id: string;
  status: string;
  is_manual: number;
  memo: string;
  creation_date: string;
  transfer_date: string;
  origin_warehouse_id: number;
  destination_warehouse_id: number;
  created_at: string;
  updated_at: string;
  origin_warehouse: IOriginWarehouse;
  destination_warehouse: IOriginWarehouse;
  items?: IItemOrder[];
  pivot?: IPivot;
  statuses: IStatus[];

}
export interface IOriginWarehouse {
  id: number;
  code: string;
  name: string;
  city: string;
  address: string;
  local_code: string;
  principal: string;
  type: string;
  location_id?: null;
  created_at: string;
  updated_at: string;
}
export interface IPivot {
  order_id: number;
  inventory_transfer_id: number;
}

export interface IStatus {
  id: number;
  type: string;
  reason?: string;
  user_id?: number;
  user: any;
  statusable_type: string;
  statusable_id: number;
  created_at: string;
  updated_at: string;
}

export interface IInvoice {
  id: number;
  code: string;
  number: string;
  status: string;
  data?: IInvoiceData | null;
  created_at: string;
  updated_at: string;
  pivot: IPivotInvoice;
}
export interface IPivotInvoice {
  order_id: number;
  invoice_id: number;
}

//** Data invoice interface ****************************************************************/
export interface IInvoiceData {
  number: number;
  code: string;
  seller_code: string;
  status: string;
  total_amount_without_taxes: number;
  total_amount: number;
  client_id: number;
  warehouse_id: number;
  user_id: number;
  date: string;
  updated_at: string;
  created_at: string;
  id: number;
  items?: IInvoiceDataItem[] | [];
  warehouse: Warehouse;
  client: Client;
  user: User;
}

export interface IInvoiceDataItem {
  id: number;
  product_id: number;
  invoice_id: number;
  quantity: number;
  price: number;
  created_at: string;
  updated_at: string;
  product: IProductInvoice;
}
export interface IProductInvoice {
  id: number;
  code: string;
  name: string;
  type: string;
  description: string;
  available: number;
  created_at: string;
  updated_at: string;
}

export interface Warehouse {
  id: number;
  code: string;
  name: string;
  city?: null;
  address?: null;
  local_code: string;
  principal: string;
  type: string;
  created_at: string;
  updated_at: string;
}
export interface Client {
  id: number;
  code: string;
  name: string;
  identification: string;
  address: string;
  email: string;
  created_at: string;
  updated_at: string;
}
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  code: string;
  nickname: string;
  email?: null;
  email_verified_at?: null;
  created_at: string;
  updated_at: string;
}

export interface IAttachmentPaymentOrder {
  id: number;
  type: string;
  file: string;
  original_name: string;
  description: string;
  mime_type: string;
  attributes?: (null)[] | null;
  created_at: string;
  updated_at: string;
  ext: string;
  permalink: string;
}


export interface ITransactionPaymentOrder {
  id: number;
  transaction_id: string;
  status: string;
  status_detail: string;
  message: string;
  description: string;
  date: string;
  paid_date: string;
  amount: number;
  full_data: FullData;
  payment_id: number;
  created_at: string;
  updated_at: string;
}
export interface FullData {
  transaction: ITransaction;
  user: IUserPaymentOrder;
  card: ICardPaymentOrder;
  token: string;
}
export interface ITransaction {
  status: string;
  order_description: string;
  payment_method_type: string;
  authorization_code: string;
  dev_reference: string;
  carrier_code: string;
  status_detail: string;
  installments: string;
  amount: string;
  paid_date: string;
  application_code: string;
  date: string;
  message: string;
  stoken: string;
  id: string;
  ltp_id: string;
}
export interface IUserPaymentOrder {
  id: string;
  email: string;
}
export interface ICardPaymentOrder {
  bin: string;
  origin: string;
  holder_name: string;
  type: string;
  number: string;
}
