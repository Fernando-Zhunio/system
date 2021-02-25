import { Ibrands } from "./ibrands";
import { Icategory } from "./icategory";
import { ImlInfo } from "./iml-info";
import { Iimportation } from "./Imports/invoice-item";
import { Iprefix } from "./iprefix";

export interface IProducts {
  current_page: number;
  data: Array<IProduct>;
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url?: string;
  to: number;
  total: number;
}

interface IProduct {
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
  code_alt: string;
  old_code: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  last_prices: [];
  prestashop_products: [];
  ml_infos: [];
}

export interface Iproduct2 {
  available: number;
  brand: Ibrands;
  brand_id: number;
  category: Icategory;
  category_id: number;
  code: string;
  code_alt: string;
  created_at: string;
  deleted_at: string;
  description: string;
  facebook_posts_count: number;
  id: number;
  imports: Iimportation[];
  instagram_posts_count: number;
  last_prices: [];
  ml_infos: ImlInfo[];
  name: number;
  old_code: string;
  prefix: Iprefix;
  prefix_id: number;
  prestashop_products: [];
  promotions: [];
  sequence: {
    category_id: number;
    created_at: string;
    id: number;
    sequence_number: number;
    updated_at: string;
  };
  sequence_id: number;
  updated_at: string;
  user_id: number;
}
