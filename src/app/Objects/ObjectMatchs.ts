export const TYPES_CONTACTS = {
  corp_email: "Correo coorporativo",
  personal_email: "Correo personal",
  corp_phone: "Telefono coorporativo",
  personal_phone: "Telefono personal",
  address: "Dirección",
};

export const STATES_PUBLICATION = {
  published: {value:"Publicado",css:{color:'#4caf50',background:'#4caf5024'}},
  unpublished: {value:"No publicado",css:{color:'#726d6d',background:'#726d6d24'}},
  incomplete: {value:"Incompleto",css:{color:'white',background:'#023D4C'}},
  queue: {value:"En cola",css:{color:'#3f51b5',background:'#3f51b524'}},
  processing: {value:"Procesando",css:{color:'white',background:'#0086FF'}},
  updating: {value:"Actualizando",css:{color:'white',background:'#0059AA'}},
  partially_processed: {value:"Parcialmente procesado",css:{color:'white',background:'#2C5500'}},
  deleting_unselected_items: {value:"Borrando item",css:{color:'white',background:'#FF2000'}},
  error: {value:"Con error",css:{color:'#e91e63',background:'#e91e6324'}},
}

export const STATE_ML_INFO ={
active : {value:"Activo",css:{color:'white',background:'#86FF00'}},
paused : {value:"Pausado",css:{color:'white',background:'#808080'}},
closed : {value:"Cerrado",css:{color:'black',background:'#E1E11E'}},
payment_required : {value:"Pago Requerido",css:{color:'black',background:'#E1E11E'}},
under_review : {value:"Bajo revisión",css:{color:'black',background:'#AAD6FF'}},
inactive : {value:"Inactivo",css:{color:'white',background:'#023D4C'}},
not_yet_active : {value:"Aún no activo",css:{color:'black',background:'#E1E11E'}},
}
export const STATUS_FACEBOOK = {
GOOD: {value:"CON STOCK",css:{color:'white',background:'#86FF00'}},
WARNING : {value:"POR AGOTARSE",css:{color:'white',background:'gold'}},
DANGER : {value:"AGOTADO",css:{color:'white',background:'red'}},
}

export const PageMatchBackend = {
  products_admin_products_index:'admin-products/productos?id=number',
  products_admin_products_create:'admin-products/productos/create',
  products_admin_products_edit:'admin-products/productos/edit/:id',

  products_admin_categories_index:'admin-products/categorias',
  products_admin_categories_create:'admin-products/categorias/create',
  products_admin_categories_edit:'admin-products/categorias/edit/1',

  products_admin_brands_index:'admin-products/marcas',
  products_admin_brands_create:'admin-products/marcas/create',
  products_admin_brands_edit:'admin-products/marcas/edit/:id',

  products_admin_prefixes_index:'admin-products/prefijos',
  products_admin_prefixes_create:'admin-products/prefijos/create',
  products_admin_prefixes_edit:'admin-products/prefijos/edit/:id',

  catalogs_search_products_index:'catalogo/buscar_productos?search=string&page=number&pageSize=number',

  catalogs_mercado_libre_index:'catalogo/mercado-libre?search=string&page=number&pageSize=number',

  catalogs_publications_index:'catalogo/publicaciones?search=string&page=number&pageSize=number',
  catalogs_publications_show:' catalogo/publicaciones/show/:id',
  catalogs_publications_create:'catalogo/publicaciones/create',
  catalogs_publications_edit:'catalogo/publicaciones/edit/:id',

  imports_providers_index:'importaciones/proveedores?search=string&page=number&pageSize=number',
  imports_providers_create:'importaciones/import/create',
  imports_providers_edit:'importaciones/import/edit/:id',

  admin_system_users_index:'administracion-sistema/usuarios?search=string&page=number&pageSize=number',
  admin_system_users_create:'administracion-sistema/usuarios/create',
  admin_system_edit:'administracion-sistema/usuarios/edit/:id',

  admin_system_persons_index:'administracion-sistema/personas?search=string&page=number&pageSize=number',
  admin_system_persons_create:'administracion-sistema/personas/create',
  admin_system_persons_edit:'administracion-sistema/personas/edit/:id',


  admin_system_role_index:'administracion-sistema/roles?search=string&page=number&pageSize=number',
  admin_system_role_create:'administracion-sistema/roles/create',
  admin_system_role_edit:'administracion-sistema/roles/edit/:id',

  admin_system_countries_index:'administracion-sistema/paises?search=string&page=number&pageSize=number',
  // creacion en un modal en el index
  admin_system_countries_create:'administracion-sistema/paises?search=string(nombre del pais)&page=number&pageSize=number',
  // edicion en un modal en el index
  admin_system_countries_edit:'administracion-sistema/paises?search=string(nombre del pais)&page=number&pageSize=number',

  admin_system_locations_index:'administracion-sistema/locaciones?search=string(nombre del pais)&page=number&pageSize=number',
  admin_system_locations_create:'administracion-sistema/locaciones/create',
  admin_system_locations_edit:'administracion-sistema/locaciones/edit/:id',

  admin_system_mercado_libre_index:'administracion-sistema/mercado-libre/cuentas?search=string&page=number&pageSize=number',
  admin_system_mercado_libre_create:'administracion-sistema/mercado-libre/cuentas/create',
  admin_system_mercado_libre_edit:'administracion-sistema/mercado-libre/cuentas/edit/:id',
}
