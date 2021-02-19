export interface ImlInfo {
  account: Iaccount;
  companies_access: Icompanies_access[];
  created_at: string;
  description: string;
  end_time: string;
  expiration_time: string;
  historical_start_time: string;
  id: number;
  image: string;
  link: string;
  listing_type_id: string;
  manual_edition: number;
  menu: any;
  ml_account_id: number;
  name: string;
  parent_item_id: null;
  pivot: { publication_id: number; product_ml_info_id: number };
  price: number;
  product_id: number;
  reference: null;
  relist_forever: string;
  resource_id: string;
  start_time: string;
  status: string;
  stock: Istock;
  stop_time: string;
  sub_status: string;
  tax: number;
  updated_at: string;
}

export interface Istock {
  available_quantity: number;
  created_at: string;
  id: number;
  initial_quantity: number;
  product_ml_info_id: number;
  sold_quantity: number;
  updated_at: string;
}

export interface Iaccount {
  city: Icity;
  city_id: number;
  companies_access: Icompanies_access;
  created_at: string;
  id: number;
  status: string;
  updated_at: string;
  user_id: string;
  user_name: string;
}

export interface Icity {
  code: string;
  country_id: string;
  created_at: string;
  deleted_at: string;
  id: number;
  name: string;
  updated_at: string;
}

export interface Icompanies_access {
  country_id: number;
  created_at: string;
  deleted_at: string;
  id: number;
  name: string;
  pivot: { accessible_id: number; company_id: number; accessible_type: string };
  updated_at: string;
}
