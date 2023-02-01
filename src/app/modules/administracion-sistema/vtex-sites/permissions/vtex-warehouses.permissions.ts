import { PERMISSION_SUPER_ADMIN } from "../../../../core/class/constants";

export const PERMISSIONS_VTEX_WAREHOUSES =  {
    index: [PERMISSION_SUPER_ADMIN, 'admin.vtex.warehouses.index'],
    show: [PERMISSION_SUPER_ADMIN, 'admin.vtex.warehouses.show'],
    create: [PERMISSION_SUPER_ADMIN, 'admin.vtex.warehouses.create'],
    edit: [PERMISSION_SUPER_ADMIN, 'admin.vtex.warehouses.edit'],
    delete: [PERMISSION_SUPER_ADMIN, 'admin.vtex.warehouses.destroy'],
  }