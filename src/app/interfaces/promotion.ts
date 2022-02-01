export interface IPromotions {
    id: number;
    title: string;
    status: string;
    note: string;
    created_at: string;
    updated_at: string;
    note_plain_text: string;
    price_formated: string;
    duration_type: string;
    start_date: string;
    end_date: string;
    price: IPrice;
    products: IProduct[];
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
    price_group_id?: null;
    tax_group_id: number;
    created_at: string;
    updated_at: string;
    full_price_formated: string;
  }

  export interface IProduct {
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
    old_code?: null;
    created_at: string;
    updated_at: string;
    deleted_at?: null;
    image: string;
    last_prices?: (LastPricesEntity)[] | null;
    pivot: Pivot;
    ml_infos?: (null)[] | null;
  }

  export interface LastPricesEntity {
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
    group: Group;
  }
  export interface Group {
    id: number;
    type: string;
    name: string;
    active: boolean;
    required: boolean;
    created_at: string;
    updated_at: string;
  }
  export interface Pivot {
    promotion_id: number;
    product_id: number;
    quantity: number;
    price: number;
  }
