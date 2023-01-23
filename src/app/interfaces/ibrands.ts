export interface Brand {
  actions?: { items: Iactions[] };
  created_at: string;
  deleted_at: string;
  id: number;
  name: string;
  products_count?: number;
  sort_name: string;
  updated_at: string;
}



interface Iactions {
  icon: string;
  label: string;
  route: string;
  url: string;
}
