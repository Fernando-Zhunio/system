export interface PaymentMbaData  {
  id: number;
  code: string;
  status: string;
  method: string;
  memo: string;
  transaction_code: string;
  seller_code?: any;
  local_code: string;
  amount: string;
  discount: string;
  retention: string;
  net_payment: string;
  date: string;
  client_id: number;
  seller_id?: any;
  created_at: string;
  updated_at: string;
  client: Client;
  seller?: any;
}

interface Client {
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
