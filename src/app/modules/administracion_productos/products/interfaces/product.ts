// import { Timestamp } from "../../../../shared/interfaces/Timestamp";

import { Timestamp } from "../../../../shared/interfaces/timestamp";

export interface Product extends Timestamp {
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
    last_sold_count: number;
    max_price_sold: string;
    min_price_sold: string;
    last_price_sold: string;
    code_alt?: any;
    old_code?: any;
    image?: any;
    last_prices: any[];
    prefix: Prefix;
    category: Category;
    sequence: Sequence;
    brand: Category;
  }
  
  interface Sequence {
    id: number;
    sequence_number: number;
    category_id: number;
  }
  
  interface Category {
    id: number;
    name: string;
    sort_name: string;
  }
  
  interface Prefix {
    id: number;
    type: string;
    prefix: string;
  }