export interface IvtexWarehouse {
  created_at: string;
  id: string;
  internal_warehouse: IinternalWarehouse;
  name: string;
  updated_at: string;
  vtex_api_id: string;
  vtex_site_id: string;
  warehouse_id: string;
}

interface IinternalWarehouse {
  address: string;
city: string;
code: string;
created_at: string;
id: number;
local_code: string;
name: string;
principal: string;
type: string;
updated_at: string;
}
