import { CompanyAccess } from "./iml-info";

export interface IprestashopProduct {
  combinations: [];
  companies_access: CompanyAccess[];
  created_at: string;
  description: string;
  description_short: string;
  discount: number;
  full_price: number;
  full_price_formated: string;
  id: number;
  image: string;
  link: string;
  name: string;
  prestashop: Iprestashop;
  prestashop_id: number;
  price: number;
  ps_product_id: number;
  reference: string;
  self_combination:any;
  status: string;
  tax: number;
  updated_at: string;
}

export interface Iprestashop {
  active: boolean;
  companies_access: CompanyAccess[];
  created_at: string;
  domain: string;
  id: number;
  id_shop: number;
  name: string;
  path: string;
  token: string;
  updated_at: string;
}
