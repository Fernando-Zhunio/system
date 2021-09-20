import { Ibrands } from "./ibrands";
import { Icategory } from "./icategory";
import { ImlInfo } from "./iml-info";
import { Iimportation } from "./Imports/invoice-item";
import { Iprefix } from "./iprefix";
import { IprestashopProduct } from "./iprestashop-product";

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


export interface Iproduct3{
available: number,
brand: {id: number, name: string, sort_name: string},
brand_id: number,
category: {id: number, name: string, sort_name: string}
category_id: number,
code: string
code_alt: string,
created_at: string,
deleted_at: null
description: string,
id: number,
last_prices: []
name: string,
prefix: {id: number, type: string, prefix: string}
prefix_id: number,
sequence: {id: number, sequence_number: number, category_id: number}
sequence_id: number
updated_at: string,
user_id: number
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
  prestashop_products: IprestashopProduct[];
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

export interface IproductWithVtex {
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
  old_code: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  facebook_posts_count: number;
  instagram_posts_count: number;
  last_prices: any[];
  vtex_skus: IproductVtexSku[];
  ml_infos: [
    {
      id: number;
      product_id: number;
      resource_id: string;
      name: string;
      listing_type_id: string;
      description: string;
      reference: string;
      image: string;
      link: string;
      price: number;
      tax: number;
      status: string;
      sub_status: string;
      start_time: string;
      historical_start_time: string;
      stop_time: string;
      end_time: string;
      expiration_time: string;
      relist_forever: string;
      parent_item_id: string;
      ml_account_id: 2;
      created_at: string;
      updated_at: string;
      manual_edition: number;
      menu: {
        type: string;
        availablesItems: {
          id: string;
          type: string;
          icon: string;
          label: string;
        }[];
        item: number;
      };
      pivot: {
        product_id: number;
        product_ml_info_id: number;
      };
      account: {
        id: number;
        user_id: number;
        user_name: string;
        city_id: number;
        status: string;
        created_at: string;
        updated_at: string;
        city: {
          id: number;
          name: string;
          code: string;
          country_id: number;
          created_at: string;
          updated_at: string;
          deleted_at: string;
        };
        companies_access: {
          id: number;
          name: string;
          country_id: number;
          created_at: string;
          updated_at: string;
          deleted_at: string;
          pivot: {
            accessible_id: number;
            company_id: number;
            accessible_type: string;
          };
        }[];
      };
      stock: {
        id: number;
        product_ml_info_id: number;
        initial_quantity: number;
        available_quantity: number;
        sold_quantity: number;
        created_at: string;
        updated_at: string;
      };
      companies_access: [
        {
          id: number;
          name: string;
          country_id: number;
          created_at: string;
          updated_at: string;
          deleted_at: string;
          pivot: {
            accessible_id: number;
            company_id: number;
            accessible_type: string;
          };
        }
      ];
    }
  ];
  prefix: {
    id: number;
    type: string;
    prefix: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
  };
  category: {
    id: number;
    name: string;
    sort_name: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
  };
  brand: {
    id: number;
    name: string;
    sort_name: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
  };
  sequence: {
    id: number;
    sequence_number: number;
    category_id: number;
    created_at: string;
    updated_at: string;
  };
  promotions: [];
  imports: [];
}

export interface IproductVtexSku {
  id: number;
  vtex_api_id: number;
  name: string;
  status: string;
  ean: string;
  reference_code: string;
  images: {
    ImageUrl: string;
    ImageName: string;
    FileId: number;
  }[];
  specifications: any[];
  cubicweight: number;
  weight: number;
  height: number;
  width: number;
  length: number;
  vtex_product_id: number;
  product_id: number;
  created_at: string;
  updated_at: string;
  vtex_product?: IproductVtex;
  full_price: number;
}

export interface IproductVtex {
  id: number;
  vtex_api_id: number;
  vtex_site_id: number;
  name: string;
  link_id: string;
  description: string;
  specifications: any[];
  is_visible: string;
  status: string;
  created_at: string;
  updated_at: string;
  link: string;
  skus?:IproductVtexSku[],
  site: {
    id: number;
    vtex_api_id: number;
    name: string;
    friendly_name: string;
    url: string;
    app_key: string;
    app_token: string;
    created_at: string;
    updated_at: string;
  }
}
