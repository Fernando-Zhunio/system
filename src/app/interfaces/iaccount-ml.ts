export interface IAccountMl {
  city: Icity;
  city_id: number;
  companies_access: Icompany_access[];
  created_at: string;
  id: number;
  status: string;
  updated_at: string;
  user_id: string;
  user_name: string;
}
interface Icity {
  code: string;
  country_id: number;
  created_at: string;
  deleted_at: string;
  id: number;
  name: string;
  updated_at: string;
}

interface Icompany_access {
  id: number;
  name: string;
  country_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  pivot: {
    accessible_id: number;
    company_id: number;
    accessible_type: string;
  };
}
