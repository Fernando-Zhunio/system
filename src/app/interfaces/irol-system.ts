import { IpermissionSystem } from "./administracion-sistema/ipermission-system";

export class IrolSystem {
  id: number;
  name: string;
  guard_name: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  permissions_count?: number;
  permissions?:IpermissionSystem[] = [];

}
