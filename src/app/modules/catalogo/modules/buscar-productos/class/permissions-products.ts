import { PERMISSION_SUPER_ADMIN } from "../../../../../core/class/constants";

export const PERMISSION_PRODUCT_INDEX = [PERMISSION_SUPER_ADMIN, 'catalogs.products.index'];
export const PERMISSION_PRODUCT_SHOW = [PERMISSION_SUPER_ADMIN, 'catalogs.products.show'];
export const PERMISSION_PRODUCT_CREATE = [PERMISSION_SUPER_ADMIN, 'catalogs.products.create'];
export const PERMISSION_PRODUCT_EDIT = [PERMISSION_SUPER_ADMIN, 'catalogs.products.edit'];
export const PERMISSION_PRODUCT_DELETE = [PERMISSION_SUPER_ADMIN, 'catalogs.products.destroy'];
export const PERMISSION_PRODUCT_PRODUCT_EDIT = [PERMISSION_SUPER_ADMIN, 'products-admin.products.edit'];


export const PERMISSIONS_CATALOG_PRODUCTS = {
    index: PERMISSION_PRODUCT_INDEX,
    show: PERMISSION_PRODUCT_SHOW,
    create: PERMISSION_PRODUCT_CREATE,
    edit: PERMISSION_PRODUCT_EDIT,
    delete: PERMISSION_PRODUCT_DELETE,
    product_edit: PERMISSION_PRODUCT_PRODUCT_EDIT
};

