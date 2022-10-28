import { Roles } from "../../../../../interfaces/iroles-and-permissions";

export interface PriceGroup {
    id: number;
    type: string;
    name: string;
    active: string;
    required: string;
    created_at: string;
    updated_at: string;
    roles: Roles[];
  }