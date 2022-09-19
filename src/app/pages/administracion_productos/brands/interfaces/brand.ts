export interface Brand {
    actions?: { items: Actions[] };
    created_at: string;
    deleted_at: string;
    id: number;
    name: string;
    products_count?: number;
    sort_name: string;
    updated_at: string;
  }
  
  
  
  interface Actions {
    icon: string;
    label: string;
    route: string;
    url: string;
  }