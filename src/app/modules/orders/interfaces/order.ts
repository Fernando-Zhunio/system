

// import { warehouse } from './iwarehouse';
// import { Iwarehouse } from '../../../interfaces/iwarehouse';
import { ShippingAddress } from './shipping-address';


export const MethodTypeCode = {
  '0': 'Credit Card',
  '1': 'Boleto (Bank Ticket)',
  '3': 'E-wallet',
  '5': 'Vouchers Card',
  '6': 'Bank Transfer',
  '7': 'Debit Card',
  '8': 'Prepaid Card',
}

export interface IOrderWorkspace {
  created_at: string;
  description: string;
  id: number;
  name: string;
  updated_at: string;
}

export interface ProductOrder {
  product_id: number;
  description: string;
  quantity: number;
  price: number;
  order_id: number;
  updated_at: string;
  created_at: string;
  id: number;
  order: Order;
  product: SubProductItem;
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


interface ITiming {
  id: number;
  started_at: string;
  ended_at: string;
  processed_time: number;
  shipped_time?: any;
  delivered_time: number;
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
export interface SubProductItem {
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
  quantity_remaining?: number;
}


export interface Order {
  id: number;
  additional_data: {transfers_status: any}
  type: string;
  status: string;
  channel_id: number;
  external_reference_type: 'vtex' | 'ml';
  external_reference: string;
  client_id: number;
  shipping: number;
  subtotal: number;
  discount: number;
  retention: number;
  products_subtotal: number;
  tax: number;
  total: number;
  total_paid: number;
  created_at: string;
  updated_at: string;
  shippings: ShippingOrder[];
  client: Client;
  shipping_address: ShippingAddress;
  payments?: (any)[] | any;
  additional_amounts?: (IDiscountAndTaxes)[] | any;
  items?: (ProductOrder)[] | any;
  transfers?: ITransference[];
  statuses: Status[];
  invoices: IInvoice[];
  mba_payments: PaymentMBA[];
  company: { id: number, name: string };
  seller_code: string;
  timing: ITiming;
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
  order: Order;
  installments_type: string;
  statuses: Status[];
}

export interface ShippingOrder {
  id: number;
  type: string;
  status: string;
  amount: number;
  cubicweight?: any;
  weight?: any;
  height?: any;
  width?: any;
  length?: any;
  tracking_link: string | null;
  tracking_number: string | null;
  order_id: number;
  origin_warehouse_id?: any;
  origin_warehouse: Warehouse;
  created_at: string;
  updated_at: string;
  statuses?: Status[];
  is_return: boolean | number;
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
  memo: string | null;
  creation_date: string;
  transfer_date: string  | null;
  origin_warehouse_id: number | null;
  destination_warehouse_id: number | null;
  created_at: string;
  updated_at: string;
  origin_warehouse: IOriginWarehouse | null;
  destination_warehouse: IOriginWarehouse | null;
  items?: ProductOrder[];
  pivot?: IPivot;
  statuses: Status[];

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

export interface Status {
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
  data?: InvoiceData | null;
  created_at: string;
  updated_at: string;
  pivot: PivotInvoice;
}
export interface PivotInvoice {
  order_id: number;
  invoice_id: number;
}

// ** Data invoice interface ****************************************************************/
export interface InvoiceData {
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
  items?: InvoiceDataItem[] | [];
  warehouse: Warehouse;
  client: Client;
  user: User;
}

export interface InvoiceDataItem {
  id: number;
  product_id: number;
  invoice_id: number;
  quantity: number;
  price: number;
  created_at: string;
  updated_at: string;
  product: ProductInvoice;
}
export interface ProductInvoice {
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

export interface IDocumentPaymentOrder {
  id: number;
  code: string;
  documentable_type: string;
  documentable_id: number;
  created_at: string;
  updated_at: string;
  file: DocumentPaymentItemOrder;
}
export interface DocumentPaymentItemOrder {
  id: number;
  type: string;
  file: string;
  original_name: string;
  mime_type: string;
  attributes?: (null)[] | null;
  created_at: string;
  updated_at: string;
  ext: string;
  permalink: string;
}


export interface TransactionPaymentOrder {
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
  user: UserPaymentOrder;
  card: CardPaymentOrder;
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
  lote: string
}
export interface UserPaymentOrder {
  id: string;
  email: string;
}
export interface CardPaymentOrder {
  bin: string;
  origin: string;
  holder_name: string;
  type: string;
  number: string;
  bank_name: string;
}

export interface PaymentMBA {
  id: number;
  code: string;
  number: string;
  status: string;
  memo: string;
  data: PaymentMBAData;
  created_at: string;
  updated_at: string;
  pivot: Pivot;
}
export interface PaymentMBAData {
  id: number;
  code: string;
  status: string;
  method: string;
  memo: string;
  transaction_code: string;
  seller_code?: null;
  local_code: string;
  amount: string;
  discount: string;
  retention: string;
  net_payment: string;
  date: string;
  client_id: number;
  seller_id?: string | null;
  created_at: string;
  updated_at: string;
  client: PaymentMBADataClient;
  seller?: ISellerOrder | null;
}

export interface PaymentMBADataClient {
  id: number;
  code: string;
  name: string;
  identification: string;
  address: string;
  email: string;
  phone: string;
  created_at: string;
  updated_at: string;
}
export interface Pivot {
  order_id: number;
  mba_payment_id: number;
}

export interface ISellerOrder {
  code: string;
  name: string;
  created_at: string;
  id: number;
  updated_at: string;
}


// data for tickets ************************************************
export interface ITicketOrder {
  id: string;
  code: string;
  status: string;
  subject: string;
  ticket_department_id: number;
  order_id?: number;
  client_id: number;
  assigned_user_id?: number;
  last_message_id?: number;
  client_unread_messages: number;
  user_unread_messages: number;
  created_at: string;
  updated_at: string;
  department?: any;
  order?: Order;
  client: Client;
  assigned_user?: any;
  last_message?: any;
}

export interface IOrderTicketMessage {
  id: number;
  ticket_id: string;
  message: string;
  client_id: number;
  user_id?: any;
  client_read_at: string;
  user_read_at?: any;
  created_at: string;
  updated_at: string;
  is_staff_message: boolean;
  client: Client;
  user?: any;
  attachments?: (any)[] | any;
}

export interface IServientregaGuide {
  numero_guia: number;
  tipo_logistica: string;
  tipo_guia: string;
  cliente: string;
  sucursal: string;
  dependencia: string;
  detalle1: string;
  detalle2: string;
  detalle3: string;
  destino: string;
  origen: string;
  remitente: string;
  razon_social_remitente: string;
  direccion_remitente: string;
  sector_remitente: string;
  telefono1_remitente: string;
  telefono2_remitente: string;
  destinatario: string;
  razon_social_destinatario: string;
  direccion_destinatario: string;
  sector_destinatario?: null;
  producto: string;
  contenido: string;
  cantidad: number;
  valor_mercancia: number;
  valor_asegurado: number;
  largo: number;
  ancho: number;
  alto: number;
  peso_volumetrico: number;
  peso_fisico: number;
  fecha: string;
  estado: string;
  registrado_por: string;
}





