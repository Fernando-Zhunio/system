import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';
import { CreateOrEditPublicacionComponent } from './publicaciones/create-or-edit-publicacion/create-or-edit-publicacion.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { ShowPublicationComponent } from './publicaciones/show-publication/show-publication.component';
import { MenuMultiPublicationComponent } from './publicaciones/menu-multi-publication/menu-multi-publication.component';
import { CreateOrEditMultipublicationComponent } from './publicaciones/create-or-edit-multipublication/create-or-edit-multipublication.component';

// @Component({
//   selector: 'app-catalogo',
//   template: '<router-outlet></router-outlet>',
// })
// export class CatalogoMainComponents  {
// }

const permission_module = {
  publicaciones: {
    index: ['super-admin', 'catalogs.publications.index'],
    show: ['super-admin', 'catalogs.publications.show'],
    create: ['super-admin', 'catalogs.publications.create'],
    edit: ['super-admin', 'catalogs.publications.edit'],
    delete: ['super-admin', 'catalogs.publications.destroy']
  },
};

const routes: Routes = [
       { path: 'mercado-libre',
        data: {name: 'mercado_libre_ll'},
        // component:MarcasMainComponents,
        loadChildren: () => import('./mercado-libre/mercado-libre.module').then(m => m.MercadoLibreModule),
        // data: {  reuse:true,}
      },
      {
        path: 'buscar_productos',
        data: {name: 'bucar_products_ll'},
        // component:MarcasMainComponents,
        loadChildren: () => import('./buscar-productos/buscar-productos.module').then(m => m.BuscarProductosModule),
      },
      {
        path: 'publicaciones',
        component: PublicacionesComponent,
        data: {
          // isEdit: false,
          name: 'publicaciones',
          reuse: true,
          permissions: {
            only: ['super-admin', permission_module.publicaciones.index],
            all: permission_module.publicaciones
          },
        },
        // loadChildren: () => import('./buscar-productos/buscar-productos.module').then(m => m.BuscarProductosModule)
      },
      {
        path: 'publicaciones/menu-multi-publicaciones',
        component: MenuMultiPublicationComponent,
        data: {
          isEdit: false,
          permissions: {
            only: ['super-admin', 'catalogs.publications.menu-multi'],
          },
        },
        canActivate: [NgxPermissionsGuard],
        // loadChildren: () => import('./buscar-productos/buscar-productos.module').then(m => m.BuscarProductosModule)
      },
        {
        path: 'publicaciones/multi-publicaciones',
        component: CreateOrEditMultipublicationComponent,
        data: {
          isEdit: false,
          permissions: {
            only: ['super-admin', 'catalogs.publications.multi'],
          },
        },
        canActivate: [NgxPermissionsGuard],
        // loadChildren: () => import('./buscar-productos/buscar-productos.module').then(m => m.BuscarProductosModule)
      },
      {
        path: 'publicaciones/edit/:id',
        component: CreateOrEditPublicacionComponent,
        data: {
          isEdit: true,
          permissions: {
            only: ['super-admin', 'catalogs.publications.edit'],
          },
        },
        canActivate: [NgxPermissionsGuard],
        // loadChildren: () => import('./buscar-productos/buscar-productos.module').then(m => m.BuscarProductosModule)
      },
      {
        path: 'publicaciones/create',
        component: CreateOrEditPublicacionComponent,
        data: {
          isEdit: false,
          permissions: {
            only: ['super-admin', 'catalogs.publications.create'],
          },
        },
        canActivate: [NgxPermissionsGuard],
        // loadChildren: () => import('./buscar-productos/buscar-productos.module').then(m => m.BuscarProductosModule)
      },

      {
        path: 'publicaciones/show/:id',
        component: ShowPublicationComponent,
        data: {
          permissions: {
            only: permission_module.publicaciones.show,
            all: permission_module.publicaciones
          },
        },
        canActivate: [NgxPermissionsGuard],
        // loadChildren: () => import('./buscar-productos/buscar-productos.module').then(m => m.BuscarProductosModule)
      },
      {
        path: 'products',
        data: {name: 'prices'},
        loadChildren: () => import('./prices/prices.module').then(m => m.PricesModule),
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class CatalogoRoutingModule {}
