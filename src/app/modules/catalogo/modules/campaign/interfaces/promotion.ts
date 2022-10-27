// export interface Promotion  {
//   price: {
//     price: number;
//   },
//   price_formatted: string;
//   products: IProduct[];
//   note: string

// }
export interface Promotion {
  id: number;
  title: string;
  status: string;
  note: string;
  campaign_id: number;
  duration_type: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  price_formated: string;
  price: Price;
  campaign: Campaign;
  products: Product[];
}

interface Product {
  id: number;
  name: string;
  description: string;
  user_id: number;
  category_id: number;
  brand_id: number;
  sequence_id: number;
  prefix_id: number;
  code: string;
  available: number;
  code_alt?: string;
  old_code?: any;
  created_at: string;
  updated_at: string;
  deleted_at?: any;
  image?: string;
  last_prices: any[];
  pivot: Pivot;
}

interface Pivot {
  promotion_id: number;
  product_id: number;
  quantity: number;
  price: number;
}

interface Campaign {
  id: number;
  title: string;
  description: string;
  duration_type: string;
  status: string;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
}

interface Price {
  id: number;
  price: number;
  price_with_tax: number;
  duration_type: string;
  start_date?: any;
  end_date?: any;
  status: string;
  action: string;
  product_id?: any;
  price_group_id?: any;
  tax_group_id: number;
  created_at: string;
  updated_at: string;
  full_price_formated: string;
}


