import { StorageService } from '../services/storage.service';

interface IPermission {
    name: string;
    description: string;
    title: string;
    route: string;
}
export class ListPermissions {
    public permissions: IPermission[] =
        [
            {
                'name': 'home',
                'title': 'Home',
                'description': 'Ver Pagina de Inicio',
                'route': 'home/inicio'

            },
            {
                'name': 'products-admin.products.index',
                'title': 'Navegar Productos',
                'description': 'Ver listado de Producto',
                'route': 'admin-products/productos'
            },
            {
                'name': 'products-admin.products.show',
                'title': 'Ver detalle de un Producto',
                'description': 'Ver detalle de un Producto',
                'route': 'admin-products/productos'

            },
            {
                'name': 'products-admin.products.create',
                'title': 'Crear Productos',
                'description': 'Crear un o mas Productos',
                'route': 'admin-products/productos/create'
            },
            {
                'name': 'products-admin.products.edit',
                'title': 'Editar Productos',
                'description': 'Editar un o mas Productos',
                'route': 'admin-products/productos'
            },
            {
                'name': 'products-admin.products.destroy',
                'title': 'Eliminar Productos',
                'description': 'Eliminar un o mas Productos',
                'route': 'admin-products/productos'
            },
            {
                'name': 'products-admin.categories.index',
                'title': 'Navegar Categorias',
                'description': 'Ver listado de Categoria',
                'route': 'admin-products/categorias'
            },
            {
                'name': 'products-admin.categories.show',
                'title': 'Ver detalle de una Categoria',
                'description': 'Ver detalle de una Categoria',
                'route': 'admin-products/categorias'
            },
            {
                'name': 'products-admin.categories.create',
                'title': 'Crear Categorias',
                'description': 'Crear una o mas Categorias',
                'route': 'admin-products/categorias/create'
            },
            {
                'name': 'products-admin.categories.edit',
                'title': 'Editar Categorias',
                'description': 'Editar una o mas Categorias',
                'route': 'admin-products/categorias'
            },
            {
                'name': 'products-admin.categories.destroy',
                'title': 'Eliminar Categorias',
                'description': 'Eliminar una o mas Categorias',
                'route': 'admin-products/categorias'

            },
            {
                'name': 'products-admin.brands.index',
                'title': 'Navegar Marcas',
                'description': 'Ver listado de Marca',
                'route': 'admin-products/marcas'
            },
            {
                'name': 'products-admin.brands.show',
                'title': 'Ver detalle de una Marca',
                'description': 'Ver detalle de una Marca',
                'route': 'admin-products/marcas'

            },
            {
                'name': 'products-admin.brands.create',
                'title': 'Crear Marcas',
                'description': 'Crear una o mas Marcas',
                'route': 'admin-products/marcas/create'

            },
            {
                'name': 'products-admin.brands.edit',
                'title': 'Editar Marcas',
                'description': 'Editar una o mas Marcas',
                'route': 'admin-products/marcas'

            },
            {
                'name': 'products-admin.brands.destroy',
                'title': 'Eliminar Marcas',
                'description': 'Eliminar una o mas Marcas',
                'route': 'admin-products/marcas'

            },
            {
                'name': 'products-admin.prefixes.index',
                'title': 'Navegar Prefijos',
                'description': 'Ver listado de Prefijo',
                'route': 'admin-products/prefijos'
            },
            {
                'name': 'products-admin.prefixes.show',
                'title': 'Ver detalle de un Prefijo',
                'description': 'Ver detalle de un Prefijo',
                'route': 'admin-products/prefijos'

            },
            {
                'name': 'products-admin.prefixes.create',
                'title': 'Crear Prefijos',
                'description': 'Crear un o mas Prefijos',
                'route': 'admin-products/prefijos/create'

            },
            {
                'name': 'products-admin.prefixes.edit',
                'title': 'Editar Prefijos',
                'description': 'Editar un o mas Prefijos',
                'route': 'admin-products/prefijos'

            },
            {
                'name': 'products-admin.prefixes.destroy',
                'title': 'Eliminar Prefijos',
                'description': 'Eliminar un o mas Prefijos',
                'route': 'admin-products/prefijos'

            },
            {
                'name': 'catalogs.products.index',
                'title': 'Navegar Productos de Catalogo',
                'description': 'Ver listado de Producto de Catalogo',
                'route': 'catalogo/buscar_productos'
            },
            {
                'name': 'catalogs.products.show',
                'title': 'Ver detalle de un Producto de Catalogo',
                'description': 'Ver detalle de un Producto de Catalogo',
                'route': 'catalogo/buscar_productos'
            },
            {
                'name': 'catalogs.products.create',
                'title': 'Crear Productos de Catalogo',
                'description': 'Crear un o mas Productos de Catalogo',
                'route': 'admin-products/productos'
            },
            {
                'name': 'catalogs.products.edit',
                'title': 'Editar Productos de Catalogo',
                'description': 'Editar un o mas Productos de Catalogo',
                'route': 'admin-products/productos'
            },
            {
                'name': 'catalogs.products.destroy',
                'title': 'Eliminar Productos de Catalogo',
                'description': 'Eliminar un o mas Productos de Catalogo',
                'route': 'admin-products/productos'
            },
            {
                'name': 'catalogs.publications.index',
                'title': 'Navegar Publicaciones',
                'description': 'Ver listado de Publicación',
                'route': 'catalogo/publicaciones'
            },
            {
                'name': 'catalogs.publications.show',
                'title': 'Ver detalle de una Publicación',
                'description': 'Ver detalle de una Publicación',
                'route': 'catalogo/publicaciones'

            },
            {
                'name': 'catalogs.publications.create',
                'title': 'Crear Publicaciones',
                'description': 'Crear una o mas Publicaciones',
                'route': 'catalogo/publicaciones/create'

            },
            {
                'name': 'catalogs.publications.edit',
                'title': 'Editar Publicaciones',
                'description': 'Editar una o mas Publicaciones',
                'route': 'catalogo/publicaciones'
            },
            {
                'name': 'catalogs.publications.destroy',
                'title': 'Eliminar Publicaciones',
                'description': 'Eliminar una o mas Publicaciones',
                'route': 'catalogo/publicaciones'
            },
            {
                'name': 'admin.users.index',
                'title': 'Navegar Usuarios',
                'description': 'Ver listado de Usuario',
                'route': 'administracion-sistema/usuarios'
            },
            {
                'name': 'admin.users.show',
                'title': 'Ver detalle de un Usuario',
                'description': 'Ver detalle de un Usuario',
                'route': 'administracion-sistema/usuarios'
            },
            {
                'name': 'admin.users.create',
                'title': 'Crear Usuarios',
                'description': 'Crear un o mas Usuarios',
                'route': 'administracion-sistema/usuarios/create'
            },
            {
                'name': 'admin.users.edit',
                'title': 'Editar Usuarios',
                'description': 'Editar un o mas Usuarios',
                'route': 'administracion-sistema/usuarios'
            },
            {
                'name': 'admin.users.destroy',
                'title': 'Eliminar Usuarios',
                'description': 'Eliminar un o mas Usuarios',
                'route': 'administracion-sistema/usuarios'
            },
            {
                'name': 'admin.roles.index',
                'title': 'Navegar Roles de Usuarios',
                'description': 'Ver listado de Rol de Usuario',
                'route': 'administracion-sistema/roles'
            },
            {
                'name': 'admin.roles.show',
                'title': 'Ver detalle de un Rol de Usuario',
                'description': 'Ver detalle de un Rol de Usuario',
                'route': 'administracion-sistema/roles'
            },
            {
                'name': 'admin.roles.create',
                'title': 'Crear Roles de Usuarios',
                'description': 'Crear un o mas Roles de Usuarios',
                'route': 'administracion-sistema/roles/create'
            },
            {
                'name': 'admin.roles.edit',
                'title': 'Editar Roles de Usuarios',
                'description': 'Editar un o mas Roles de Usuarios',
                'route': 'administracion-sistema/roles'
            },
            {
                'name': 'admin.roles.destroy',
                'title': 'Eliminar Roles de Usuarios',
                'description': 'Eliminar un o mas Roles de Usuarios',
                'route': 'administracion-sistema/roles'
            },
            {
                'name': 'admin.countries.index',
                'title': 'Navegar Paises',
                'description': 'Ver listado de Pais',
                'route': 'administracion-sistema/paises'
            },
            {
                'name': 'admin.countries.show',
                'title': 'Ver detalle de un Pais',
                'description': 'Ver detalle de un Pais',
                'route': 'administracion-sistema/paises'
            },
            {
                'name': 'admin.countries.create',
                'title': 'Crear Paises',
                'description': 'Crear un o mas Paises',
                'route': 'administracion-sistema/paises'
            },
            {
                'name': 'admin.countries.edit',
                'title': 'Editar Paises',
                'description': 'Editar un o mas Paises',
                'route': 'administracion-sistema/paises'
            },
            {
                'name': 'admin.countries.destroy',
                'title': 'Eliminar Paises',
                'description': 'Eliminar un o mas Paises',
                'route': 'administracion-sistema/paises'
            },
            {
                'name': 'admin.countries.cities.index',
                'title': 'Navegar Ciudades',
                'description': 'Ver listado de Ciudad',
                'route': 'administracion-sistema/ciudades'
            },
            {
                'name': 'admin.countries.cities.show',
                'title': 'Ver detalle de una Ciudad',
                'description': 'Ver detalle de una Ciudad',
                'route': 'administracion-sistema/ciudades'
            },
            {
                'name': 'admin.countries.cities.create',
                'title': 'Crear Ciudades',
                'description': 'Crear una o mas Ciudades',
                'route': 'administracion-sistema/ciudades/create'
            },
            {
                'name': 'admin.countries.cities.edit',
                'title': 'Editar Ciudades',
                'description': 'Editar una o mas Ciudades',
                'route': 'administracion-sistema/ciudades'
            },
            {
                'name': 'admin.countries.cities.destroy',
                'title': 'Eliminar Ciudades',
                'description': 'Eliminar una o mas Ciudades',
                'route': 'administracion-sistema/ciudades'
            },
            {
                'name': 'admin.companies.index',
                'title': 'Navegar Empresas',
                'description': 'Ver listado de Empresa',
                'route': 'administracion-sistema/companies'
            },
            {
                'name': 'admin.companies.show',
                'title': 'Ver detalle de una Empresa',
                'description': 'Ver detalle de una Empresa',
                'route': 'administracion-sistema/companies'
            },
            {
                'name': 'admin.companies.create',
                'title': 'Crear Empresas',
                'description': 'Crear una o mas Empresas',
                'route': 'administracion-sistema/companies/create'
            },
            {
                'name': 'admin.companies.edit',
                'title': 'Editar Empresas',
                'description': 'Editar una o mas Empresas',
                'route': 'administracion-sistema/companies'
            },
            {
                'name': 'admin.companies.destroy',
                'title': 'Eliminar Empresas',
                'description': 'Eliminar una o mas Empresas',
                'route': 'administracion-sistema/companies'
            },
            {
                'name': 'admin.companies.departments.index',
                'title': 'Navegar Departamentos',
                'description': 'Ver listado de Departamento',
                'route': 'administracion-sistema/companies'
            },
            {
                'name': 'admin.companies.departments.show',
                'title': 'Ver detalle de un Departamento',
                'description': 'Ver detalle de un Departamento',
                'route': 'administracion-sistema/companies'

            },
            {
                'name': 'admin.companies.departments.create',
                'title': 'Crear Departamentos',
                'description': 'Crear un o mas Departamentos',
                'route': 'administracion-sistema/companies'
            },
            {
                'name': 'admin.companies.departments.edit',
                'title': 'Editar Departamentos',
                'description': 'Editar un o mas Departamentos',
                'route': 'administracion-sistema/companies'
            },
            {
                'name': 'admin.companies.departments.destroy',
                'title': 'Eliminar Departamentos',
                'description': 'Eliminar un o mas Departamentos',
                'route': 'administracion-sistema/companies'
            },
            {
                'name': 'admin.companies.departments.positions.index',
                'title': 'Navegar Cargos',
                'description': 'Ver listado de Cargo',
                'route': 'administracion-sistema/companies'
            },
            {
                'name': 'admin.companies.departments.positions.show',
                'title': 'Ver detalle de un Cargo',
                'description': 'Ver detalle de un Cargo',
                'route': 'administracion-sistema/companies'
            },
            {
                'name': 'admin.companies.departments.positions.create',
                'title': 'Crear Cargos',
                'description': 'Crear un o mas Cargos',
                'route': 'administracion-sistema/companies'
            },
            {
                'name': 'admin.companies.departments.positions.edit',
                'title': 'Editar Cargos',
                'description': 'Editar un o mas Cargos',
                'route': 'administracion-sistema/companies'
            },
            {
                'name': 'admin.companies.departments.positions.destroy',
                'title': 'Eliminar Cargos',
                'description': 'Eliminar un o mas Cargos',
                'route': 'administracion-sistema/companies'
            },
            {
                'name': 'admin.locations.index',
                'title': 'Navegar Locaciones',
                'description': 'Ver listado de Locación',
                'route': 'administracion-sistema/locaciones'
            },
            {
                'name': 'admin.locations.show',
                'title': 'Ver detalle de una Locación',
                'description': 'Ver detalle de una Locación',
                'route': 'administracion-sistema/locaciones'
            },
            {
                'name': 'admin.locations.create',
                'title': 'Crear Locaciones',
                'description': 'Crear una o mas Locaciones',
                'route': 'administracion-sistema/locaciones/create'
            },
            {
                'name': 'admin.locations.edit',
                'title': 'Editar Locaciones',
                'description': 'Editar una o mas Locaciones',
                'route': 'administracion-sistema/locaciones'
            },
            {
                'name': 'admin.locations.destroy',
                'title': 'Eliminar Locaciones',
                'description': 'Eliminar una o mas Locaciones',
                'route': 'administracion-sistema/locaciones'
            },
            {
                'name': 'ml.accounts.index',
                'title': 'Navegar Cuentas Mercado Libre',
                'description': 'Ver listado de Cuenta Mercado Libre',
                'route': 'administracion-sistema/mercado-libre/cuentas'
            },
            {
                'name': 'ml.accounts.show',
                'title': 'Ver detalle de una Cuenta Mercado Libre',
                'description': 'Ver detalle de una Cuenta Mercado Libre',
                'route': 'administracion-sistema/mercado-libre/cuentas'
            },
            {
                'name': 'ml.accounts.create',
                'title': 'Crear Cuentas Mercado Libre',
                'description': 'Crear una o mas Cuentas Mercado Libre',
                'route': 'administracion-sistema/mercado-libre/cuentas/create'
            },
            {
                'name': 'ml.accounts.edit',
                'title': 'Editar Cuentas Mercado Libre',
                'description': 'Editar una o mas Cuentas Mercado Libre',
                'route': 'administracion-sistema/mercado-libre/cuentas'
            },
            {
                'name': 'ml.accounts.destroy',
                'title': 'Eliminar Cuentas Mercado Libre',
                'description': 'Eliminar una o mas Cuentas Mercado Libre',
                'route': 'administracion-sistema/mercado-libre/cuentas'
            },
            {
                'name': 'catalogs.products.ml.assign',
                'title': 'Mercado Libre - Reasignar Producto',
                'description': 'Reasignar un item ml a un producto del sistema',
                'route': 'catalogo/mercado-libre'

            },
            {
                'name': 'catalogs.products.ml.relist',
                'title': 'Mercado Libre - Republicar Producto',
                'description': 'Republicar uno o mas Productos Ml',
                'route': 'catalogo/mercado-libre'
            },
            {
                'name': 'catalogs.products.ml.status.update',
                'title': 'Mercado Libre - Actualizar Estado de Producto',
                'description': 'Actualizar el estado de un producto',
                'route': 'catalogo/mercado-libre'
            },
            {
                'name': 'catalogs.products.ml.destroy',
                'title': 'Mercado Libre - Elimnar un Producto',
                'description': 'Elimina uno o mas Productos Ml',
                'route': 'catalogo/mercado-libre'
            },
            {
                'name': 'catalogs.products.ml.update',
                'title': 'Mercado Libre - Actualizar por completo un producto',
                'description': 'Actualizar uno o mas Productos Ml',
                'route': 'catalogo/mercado-libre'
            },
            {
                'name': 'catalogs.ml-products.index',
                'title': 'Mercado Libre - Listar y buscar productos',
                'description': 'Ver y buscar entre todos los productos ml',
                'route': 'catalogo/mercado-libre'
            },
            // {
            //     'name': 'general.products.index',
            //     'title': 'Navegar Productos [Informacion General]',
            //     'description': 'Ver listado de Producto [Informacion General]',
            // },
            // {
            //     'name': 'general.products.show',
            //     'title': 'Ver detalle de  Producto [Informacion General]',
            //     'description': 'Ver detalle de  Producto [Informacion General]'
            // },
            // {
            //     'name': 'general.imports.index',
            //     'title': 'Navegar Importaciones [Informacion General]',
            //     'description': 'Ver listado de Importacion [Informacion General]'
            // },
            // {
            //     'name': 'general.imports.show',
            //     'title': 'Ver detalle de  Importacion [Informacion General]',
            //     'description': 'Ver detalle de  Importacion [Informacion General]'
            // },
            // {
            //     'name': 'general.promotions.index',
            //     'title': 'Navegar Promociones [Informacion General]',
            //     'description': 'Ver listado de Promocion [Informacion General]'
            // },
            // {
            //     'name': 'general.promotions.show',
            //     'title': 'Ver detalle de  Promocion [Informacion General]',
            //     'description': 'Ver detalle de  Promocion [Informacion General]'
            // },
            // {
            //     'name': 'products-admin.imports.index',
            //     'title': 'Navegar Codificacion de Importaciones [Administracion de Productos]',
            //     'description': 'Ver listado de Codificacion de Importaci�n [Administracion de Productos]'
            // },
            {
                'name': 'products-admin.imports.show',
                'title': 'Ver detalle de una Codificacion de Importación [Administracion de Productos]',
                'description': 'Ver detalle de una Codificación de Importación [Administracion de Productos]',
                'route': 'importaciones/index'
            },
            {
                'name': 'products-admin.imports.create',
                'title': 'Crear Codificacion de Importaciones [Administracion de Productos]',
                'description': 'Crear una o mas Codificacion de Importaciones [Administracion de Productos]',
                'route': 'importaciones/create'
            },
            {
                'name': 'products-admin.imports.edit',
                'title': 'Editar Codificacion de Importaciones [Administracion de Productos]',
                'description': 'Editar una o mas Codificacion de Importaciones [Administracion de Productos]',
                'route': 'importaciones/index'
            },
            {
                'name': 'products-admin.imports.destroy',
                'title': 'Eliminar Codificacion de Importaciones [Administracion de Productos]',
                'description': 'Eliminar una o mas Codificacion de Importaciones [Administracion de Productos]',
                'route': 'importaciones/index'
            },
            // {
            //     'name': 'purchase-department.imports.index',
            //     'title': 'Navegar Importaciones [Departamento Compras]',
            //     'description': 'Ver listado de Importaci�n [Departamento Compras]',

            // },
            // {
            //     'name': 'purchase-department.imports.show',
            //     'title': 'Ver detalle de una Importaci�n [Departamento Compras]',
            //     'description': 'Ver detalle de una Importaci�n [Departamento Compras]'
            // },
            // {
            //     'name': 'purchase-department.imports.create',
            //     'title': 'Crear Importaciones [Departamento Compras]',
            //     'description': 'Crear una o mas Importaciones [Departamento Compras]'
            // },
            // {
            //     'name': 'purchase-department.imports.edit',
            //     'title': 'Editar Importaciones [Departamento Compras]',
            //     'description': 'Editar una o mas Importaciones [Departamento Compras]'
            // },
            // {
            //     'name': 'purchase-department.imports.destroy',
            //     'title': 'Eliminar Importaciones [Departamento Compras]',
            //     'description': 'Eliminar una o mas Importaciones [Departamento Compras]'
            // },
            // {
            //     'name': 'prices-and-promotions.imports.index',
            //     'title': 'Navegar Importaciones [Precios y Promociones]',
            //     'description': 'Ver listado de Importaci�n [Precios y Promociones]'
            // },
            // {
            //     'name': 'prices-and-promotions.imports.show',
            //     'title': 'Ver detalle de una Importaci�n [Precios y Promociones]',
            //     'description': 'Ver detalle de una Importaci�n [Precios y Promociones]'
            // },
            // {
            //     'name': 'prices-and-promotions.imports.create',
            //     'title': 'Crear Importaciones [Precios y Promociones]',
            //     'description': 'Crear una o mas Importaciones [Precios y Promociones]'
            // },
            // {
            //     'name': 'prices-and-promotions.imports.edit',
            //     'title': 'Editar Importaciones [Precios y Promociones]',
            //     'description': 'Editar una o mas Importaciones [Precios y Promociones]'
            // },
            // {
            //     'name': 'prices-and-promotions.imports.destroy',
            //     'title': 'Eliminar Importacioneimport  [Precios y Promociones]',
            //     'description': 'Eliminar una o mas Importaciones [Precios y Promociones]',

            // },
            // {
            //     'name': 'prices-and-promotions.promotions.index',
            //     'title': 'Navegar Promociones [Precios y Promociones]',
            //     'description': 'Ver listado de Promoci�n [Precios y Promociones]'
            // },
            // {
            //     'name': 'prices-and-promotions.promotions.show',
            //     'title': 'Ver detalle de una Promoci�n [Precios y Promociones]',
            //     'description': 'Ver detalle de una Promoci�n [Precios y Promociones]'
            // },
            // {
            //     'name': 'prices-and-promotions.promotions.create',
            //     'title': 'Crear Promociones [Precios y Promociones]',
            //     'description': 'Crear una o mas Promociones [Precios y Promociones]'
            // },
            // {
            //     'name': 'prices-and-promotions.promotions.edit',
            //     'title': 'Editar Promociones [Precios y Promociones]',
            //     'description': 'Editar una o mas Promociones [Precios y Promociones]'
            // },
            // {
            //     'name': 'prices-and-promotions.promotions.destroy',
            //     'title': 'Eliminar Promociones [Precios y Promociones]',
            //     'description': 'Eliminar una o mas Promociones [Precios y Promociones]'
            // },
            // {
            //     'name': 'prices-and-promotions.prices.index',
            //     'title': 'Navegar Precios [Precios y Promociones]',
            //     'description': 'Ver listado de Precio [Precios y Promociones]'
            // },
            // {
            //     'name': 'prices-and-promotions.prices.show',
            //     'title': 'Ver detalle de un Precio [Precios y Promociones]',
            //     'description': 'Ver detalle de un Precio [Precios y Promociones]'
            // },
            // {
            //     'name': 'prices-and-promotions.prices.create',
            //     'title': 'Crear Precios [Precios y Promociones]',
            //     'description': 'Crear un o mas Precios [Precios y Promociones]'
            // },
            // {
            //     'name': 'prices-and-promotions.prices.edit',
            //     'title': 'Editar Precios [Precios y Promociones]',
            //     'description': 'Editar un o mas Precios [Precios y Promociones]'
            // },
            // {
            //     'name': 'prices-and-promotions.prices.destroy',
            //     'title': 'Eliminar Precios [Precios y Promociones]',
            //     'description': 'Eliminar un o mas Precios [Precios y Promociones]'
            // },
            // {
            //     'name': 'reports.group-products.index',
            //     'title': 'Navegar Grupos de Productos [Reportes]',
            //     'description': 'Ver listado de Grupo de Producto [Reportes]'
            // },
            // {
            //     'name': 'reports.group-products.show',
            //     'title': 'Ver detalle de un Grupo de Producto [Reportes]',
            //     'description': 'Ver detalle de un Grupo de Producto [Reportes]'
            // },
            // {
            //     'name': 'reports.group-products.create',
            //     'title': 'Crear Grupos de Productos [Reportes]',
            //     'description': 'Crear un o mas Grupos de Productos [Reportes]'
            // },
            // {
            //     'name': 'reports.group-products.edit',
            //     'title': 'Editar Grupos de Productos [Reportes]',
            //     'description': 'Editar un o mas Grupos de Productos [Reportes]'
            // },
            // {
            //     'name': 'reports.group-products.destroy',
            //     'title': 'Eliminar Grupos de Productos [Reportes]',
            //     'description': 'Eliminar un o mas Grupos de Productos [Reportes]'
            // },
            {
                'name': 'admin.facebook-ads.campaigns.index',
                'title': 'Navegar Campa�as [Facebook Ads]',
                'description': 'Ver listado de Campa�a [Facebook Ads]',
                'route': 'administracion-sistema/facebook-ads-manager'
            },
            {
                'name': 'admin.facebook-ads.campaigns.show',
                'title': 'Ver detalle de una Campa�a [Facebook Ads]',
                'description': 'Ver detalle de una Campa�a [Facebook Ads]',
                'route': 'administracion-sistema/facebook-ads-manager'
            },
            {
                'name': 'admin.facebook-ads.campaigns.create',
                'title': 'Crear Campa�as [Facebook Ads]',
                'description': 'Crear una o mas Campa�as [Facebook Ads]',
                'route': 'administracion-sistema/facebook-ads-manager'
            },
            {
                'name': 'admin.facebook-ads.campaigns.edit',
                'title': 'Editar Campa�as [Facebook Ads]',
                'description': 'Editar una o mas Campa�as [Facebook Ads]',
                'route': 'administracion-sistema/facebook-ads-manager'
            },
            {
                'name': 'admin.facebook-ads.campaigns.destroy',
                'title': 'Eliminar Campa�as [Facebook Ads]',
                'description': 'Eliminar una o mas Campa�as [Facebook Ads]',
                'route': 'administracion-sistema/facebook-ads-manager'
            },
            {
                'name': 'admin.facebook-ads.adsets.index',
                'title': 'Navegar Conjunto de Anuncios [Facebook Ads]',
                'description': 'Ver listado de Conjunto de Anuncios [Facebook Ads]',
                'route': 'administracion-sistema/facebook-ads-manager'
            },
            {
                'name': 'admin.facebook-ads.adsets.show',
                'title': 'Ver detalle de un Conjunto de Anuncios [Facebook Ads]',
                'description': 'Ver detalle de un Conjunto de Anuncios [Facebook Ads]',
                'route': 'administracion-sistema/facebook-ads-manager'
            },
            {
                'name': 'admin.facebook-ads.adsets.create',
                'title': 'Crear Conjunto de Anuncios [Facebook Ads]',
                'description': 'Crear un o mas Conjunto de Anuncios [Facebook Ads]',
                'route': 'administracion-sistema/facebook-ads-manager'
            },
            {
                'name': 'admin.facebook-ads.adsets.edit',
                'title': 'Editar Conjunto de Anuncios [Facebook Ads]',
                'description': 'Editar un o mas Conjunto de Anuncios [Facebook Ads]',
                'route': 'administracion-sistema/facebook-ads-manager'
            },
            {
                'name': 'admin.facebook-ads.adsets.destroy',
                'title': 'Eliminar Conjunto de Anuncios [Facebook Ads]',
                'description': 'Eliminar un o mas Conjunto de Anuncios [Facebook Ads]',
                'route': 'administracion-sistema/facebook-ads-manager'
            },
            {
                'name': 'admin.facebook-ads.ads.index',
                'title': 'Navegar Anuncios [Facebook Ads]',
                'description': 'Ver listado de Anuncio [Facebook Ads]',
                'route': 'administracion-sistema/facebook-ads-manager'
            },
            {
                'name': 'admin.facebook-ads.ads.show',
                'title': 'Ver detalle de un Anuncio [Facebook Ads]',
                'description': 'Ver detalle de un Anuncio [Facebook Ads]',
                'route': 'administracion-sistema/facebook-ads-manager'
            },
            {
                'name': 'admin.facebook-ads.ads.create',
                'title': 'Crear Anuncios [Facebook Ads]',
                'description': 'Crear un o mas Anuncios [Facebook Ads]',
                'route': 'administracion-sistema/facebook-ads-manager'
            },
            {
                'name': 'admin.facebook-ads.ads.edit',
                'title': 'Editar Anuncios [Facebook Ads]',
                'description': 'Editar un o mas Anuncios [Facebook Ads]',
                'route': 'administracion-sistema/facebook-ads-manager'
            },
            {
                'name': 'admin.facebook-ads.ads.destroy',
                'title': 'Eliminar Anuncios [Facebook Ads]',
                'description': 'Eliminar un o mas Anuncios [Facebook Ads]',
                'route': 'administracion-sistema/facebook-ads-manager'
            },
            {
                'name': 'reports.general-stock.export',
                'title': 'Descargar Stock',
                'description': 'Descargar el stock por bodega',
                'route': 'reports/general-stock'
            },
            {
                'name': 'product-admin.vtex.product-vtex.index',
                'title': 'Navegar Products [Vtex]',
                'description': 'Ver listado de Product [Vtex]',
                'route': 'admin-products/vtex-products'
            },
            {
                'name': 'product-admin.vtex.product-vtex.show',
                'title': 'Ver detalle de un Product [Vtex]',
                'description': 'Ver detalle de un Product [Vtex]',
                'route': 'admin-products/vtex-products'
            },
            {
                'name': 'product-admin.vtex.product-vtex.create',
                'title': 'Crear Products [Vtex]',
                'description': 'Crear un o mas Products [Vtex]',
                'route': 'admin-products/vtex-products'
            },
            {
                'name': 'product-admin.vtex.product-vtex.edit',
                'title': 'Editar Products [Vtex]',
                'description': 'Editar un o mas Products [Vtex]',
                'route': 'admin-products/vtex-products'
            },
            {
                'name': 'product-admin.vtex.product-vtex.destroy',
                'title': 'Eliminar Products [Vtex]',
                'description': 'Eliminar un o mas Products [Vtex]',
                'route': 'admin-products/vtex-products'
            },
            {
                'name': 'dashboard',
                'title': 'Dashboard',
                'description': 'Dashboard',
                'route': 'home/dashboard'
            },
            {
                'name': 'rrhh-dashboard',
                'title': 'Dashboard [Rrhh]',
                'description': 'Recursos Humanos Dashboard',
                'route': 'recursos-humanos/dashboard'
            },
            {
                'name': 'rrhh-appointments',
                'title': 'Citas [Rrhh]',
                'description': 'Recursos Humanos Citas',
                'route': 'recursos-humanos/appointments'
            },
            {
                'name': 'rrhh-requests',
                'title': 'Solitudes [Rrhh]',
                'description': 'Recursos Humanos Solicitudes',
                'route': 'recursos-humanos/requests'
            },
            {
                'name': 'rrhh-works',
                'title': 'Empleos [Rrhh]',
                'description': 'Recursos Humanos Empleos',
                'route': 'recursos-humanos/works'
            }
        ];

    permissionMap: Map<string, IPermission> = new Map<string, IPermission>();
    myPermissionMap: Map<string, IPermission> = new Map<string, IPermission>();
    constructor(public store: StorageService) {
        this.transformPermissionsInMap();
        this.getMyPermissions();
    }

    isSuperAdmin: boolean = false;

    transformPermissionsInMap() {
        this.permissions.forEach(permission => {
            this.permissionMap.set(permission.name, permission);
        });
    }

    getMyPermissions() {
        this.myPermissionMap.clear();
        const permissionsAndRol = this.store.getCurrentSession();
        if (permissionsAndRol.user.rol.findIndex(rol => rol === 'super-admin') !== -1) {
            this.isSuperAdmin = true;
            console.log('Soy super admin');
            this.myPermissionMap = this.permissionMap;
            return;
        }
        const permissionsUser = permissionsAndRol.user.permission;
        console.log({permissionsUser}, this.store.getCurrentSession());
        const permissions = permissionsUser.forEach(permission => {
            if (this.permissionMap.has(permission)) {
                this.myPermissionMap.set(permission, this.permissionMap.get(permission));
            }
        }
        );
        return permissions;
    }

    searchRoute(name: string) {
        const searchData = [];
        if (name.trim() === '') {
            return [];
        }
        const search = name.toLowerCase();
        // console.log(this.permissionMap);
        
        this.myPermissionMap.forEach((value, key) => {
            if (value.title.toLowerCase().includes(search) || value.description.toLowerCase().includes(search)) {
                searchData.push(value);
            }
        });
        return searchData;
    }

}

