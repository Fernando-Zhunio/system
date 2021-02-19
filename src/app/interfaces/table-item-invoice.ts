export interface TableItemInvoice {
  new: boolean;
  id: number;
  code: string;
  description: string;
  note: string;
  quantity: number;
  price: number;
  tariff: number;
  images: string;
  product:any;
}
