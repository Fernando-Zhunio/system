import { Iaccount, CompanyAccess, ImlInfo } from "./iml-info";


export interface Ipublication {
  aditional_data: { attributes: any[] };
  buying_mode: string;
  category: string;
  companies_access: CompanyAccess[];
  created_at: string;
  description: string;
  errors: [];
  id: number;
  listing_type: string;
  ml_accounts: Iaccount[];
  ml_infos: ImlInfo[];
  name: string;
  images?: Iimages[];
  price: number;
  quantity: number;
  status: number;
  updated_at: number;
  menu?: Imenu;
}

interface Imenu {
  availablesItems: {
    icon: string;
    id: string;
    label: string;
    type: string;
  }[];
  item: number;
  type: string;
}

export interface Iimages {
  created_at: string;
  id: number;
  position: number;
  publication_id: number;
  updated_at: string;
  url: string;
  permalink: string;
}
