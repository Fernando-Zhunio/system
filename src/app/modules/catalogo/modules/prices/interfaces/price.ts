import { PriceGroup } from "./price-group";

export interface ProductPrice {
    id: number;
    name: string;
    description: string;
    user_id: number;
    brand_id: number;
    category_id: number;
    sequence_id: number;
    image: string,
    prefix_id: number;
    code: string;
    available: number;
    code_alt: string;
    old_code?: string;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
    last_prices?: Price[] ;
    price?: Price;
  }

  export interface Price {
    id: number;
    price: number;
    price_with_tax: number;
    duration_type: string;
    start_date?: null;
    end_date?: null;
    status: string;
    action: string;
    product_id?: null;
    price_group_id: number;
    tax_group_id: number;
    created_at: string;
    updated_at: string;
    full_price_formated: string;
    group?: PriceGroup;
  }
 