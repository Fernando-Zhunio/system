export interface ICompany {
    id: number;
    name: string;
    country_id: number;
    created_at: string;
    updated_at: string;
    deleted_at?: null;
    country: Country;
  }
  export interface Country {
    id: number;
    name: string;
    code: string;
    created_at: string;
    updated_at: string;
    deleted_at?: null;
  }
  
