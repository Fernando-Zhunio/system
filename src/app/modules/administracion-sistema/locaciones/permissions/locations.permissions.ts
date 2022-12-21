import { PERMISSION_SUPER_ADMIN } from "../../../../core/class/constants";

// import { PERMISSION_PRODUCT_PRODUCT_EDIT } from './../../../catalogo/modules/buscar-productos/class/permissions-products';
export const PERMISSIONS_LOCATIONS = {
    index: [PERMISSION_SUPER_ADMIN, 'admin.locations.index'],
    create: [PERMISSION_SUPER_ADMIN, 'admin.locations.create'],
    edit: [PERMISSION_SUPER_ADMIN, 'admin.locations.edit'],
    delete: [PERMISSION_SUPER_ADMIN, 'admin.locations.destroy'],
}