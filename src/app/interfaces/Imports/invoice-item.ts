export interface Iresponse {
  success: boolean;
  data: any;
}

export interface InvoiceItemFull {
  code: string;
  created_at: string;
  description: string;
  id: number;
  import_invoice_id: number;
  invoice: invoice;
  new: boolean;
  note: string;
  price: number;
  product: any;
  product_id: number;
  quantity: number;
  tariff: number;
  updated_at: string;
}

export interface invoice {
  created_at: string;
  date_purchase: string;
  id: number;
  identifier: string;
  import_id: number;
  items: invoiceItem[];
  notes: string;
  provider_id: number;
  total_amount: number;
  updated_at: string;
}

export interface invoiceItem {
  code: string;
  created_at: string;
  description: string;
  id: number;
  images: invoiceItemImg[];
  import_invoice_id: number;
  new: boolean;
  note: string;
  price: number;
  prices: any[];
  product: any;
  product_id: any;
  quantity: number;
  tariff: number;
  update_at: string;
}

export interface invoiceItemImg {
  created_at: string;
  full_url_api: string;
  id: number;
  pivot: { item_id: number; image_id: number };
  updated_at: string;
  url: string;
}

export interface Iimportation {
  Counts?: {
    product_count: number;
    product_import_count: number;
    product_new_count: number;
    product_respuesto_count: number;
    promotion_count: number;
    proveedores: string;
  };
  arrival_date: string;
  code: string;
  created_at: string;
  estimated_date_first: string;
  estimated_date_last: string;
  id: number;
  import_log_status_id: number;
  import_origin_sequence_id: number;
  invoices?: invoice[];
  last_status?: {
    created_at: string;
    id: number;
    import_id: number;
    import_status_id: number;
    note: string;
    status: {
      created_at: string;
      id: number;
      name: string;
      type: string;
      updated_at: string;
    };
    updated_at: string;
    user_id: number;
  };
  note: string;
  note_plain_text: string;
  sequence: {
    created_at: string;
    id: number;
    import_id: number;
    import_origin_id: number;
    origin: {
      id: number;
      name: string;
      prefix: string;
      created_at: string;
      updated_at: string;
    };
    sequence_number: number;
    updated_at: string;
  };
  updated_at?: string;
  pivot?: {product_id: number, import_id: number}
}


export interface Iprovider {
  address: string;
  city: string;
  contacts: Icontact[];
  country: Icountry;
  country_id: number;
  created_at: string;
  email: string;
  id: number;
  name: string;
  phone: string;
  updated_at?: string;
  website: string;
}

interface Icountry {
  code: string;
  created_at: string;
  deleted_at: string;
  id: number;
  name: string;
  updated_at?: string;
}

export interface Icontact {
  created_at: string;
  email: string;
  id: number;
  name: string;
  phone: string;
  position: string;
  provider_id: number;
  updated_at?: string;
}
