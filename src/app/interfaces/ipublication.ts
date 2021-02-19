import { Iaccount, Icompanies_access, ImlInfo } from "./iml-info";

// export interface Ipublication {
// aditional_data: {attributes: Array(3)}
// buying_mode: string
// category: string
// companies_access: (2) [{…}, {…}],
// created_at: string,
// description: string,
// errors: []
// id: number
// listing_type: string
// menu: {type: "Todas las cuentas", availablesItems: Array(7), item: 9593}
// ml_accounts: [{…}]
// ml_infos: [{…}]
// name:string,
// price: number,
// quantity: number,
// status: string,
// updated_at: string
// }

export interface Ipublication {
  aditional_data: { attributes: any[] };
  buying_mode: string;
  category: string;
  companies_access: Icompanies_access[];
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
}
