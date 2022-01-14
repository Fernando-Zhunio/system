import { IRoles } from "./iroles-and-permissions";

export interface IProductPrice {
    id: number;
    name: string;
    description: string;
    user_id: number;
    brand_id: number;
    category_id: number;
    sequence_id: number;
    prefix_id: number;
    code: string;
    available: number;
    code_alt: string;
    old_code?: string;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
    last_prices?: IPrice[] ;
    price?: IPrice;
  }

  export interface IPrice {
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
    group?: IPriceGroup;
  }
  export interface IPriceGroup {
    id: number;
    type: string;
    name: string;
    active: string;
    required: string;
    created_at: string;
    updated_at: string;
    roles: IRoles[];
  }