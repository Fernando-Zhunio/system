export const PRICE_ROUTE_API_INDEX = 'catalogs/products/prices';
export const PRICE_ROUTE_API_GROUP_PRICE = 'catalogs/products/prices/prices-group';
export const PRICE_PRODUCT_ROUTE_API_STORE_OR_SHOW = (id) => `catalogs/products/${id}/prices`
export const PRICE_ROUTE_API_IMPORT = 'catalogs/products/prices/import-file'
export const PRICE_ROUTE_API_EXPORT = 'catalogs/products/prices/export-file'
export const PRICE_ROUTE_API_EDIT = (id) =>`catalogs/products/${id}/prices/edit`
export const PRICE_PRODUCT_ROUTE_API_SHOW_DELETE = (product_id, id) =>`catalogs/products/${product_id}/prices/${id}`
