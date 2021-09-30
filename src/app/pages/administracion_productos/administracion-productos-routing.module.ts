import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriasComponent } from './categorias/categorias.component';
import { CategoriasCreateOrEditComponent } from './categorias/categorias-create-or-edit/categorias-create-or-edit.component';
// import { CategoriasMainComponent } from './categorias-main.component';
import { Component } from '@angular/core';
import { NgxPermissionsGuard } from 'ngx-permissions';

@Component({
  selector: 'app-admin-products',
  template: '<router-outlet></router-outlet>',

})
export class AdminProductsMainComponents  {}


const routes: Routes = [
  {
    path: '',
    component: AdminProductsMainComponents,
    data: {name: 'products_admin'},
    children: [
      {
        path: 'categorias',
        loadChildren: () => import('./categorias/categorias.module').then(m => m.CategoriasModule),
        data: {
          isEdit: false,
          name: 'categorias',
          permissions: {
            only: ['super-admin', 'products-admin.categories.index'],
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'marcas',
        loadChildren: () => import('./marcas/marcas.module').then(m => m.MarcasModule),
        data: {
          isEdit: false,
          name: 'marcas',
          permissions: {
            only: ['super-admin', 'products-admin.brands.index'],
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'productos',
        loadChildren: () => import('./productos/producto.module').then(m => m.ProductoModule),
        data: {
          isEdit: false,
          permissions: {
            only: ['super-admin', 'products-admin.products.index'],
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'prefijos',
        loadChildren: () => import('./prefijo/prefijo.module').then(m => m.PrefijoModule),
        data: {
          name:'prefijos',
          isEdit: false,
          permissions: {
            only: ['super-admin', 'products-admin.prefixes.index'],
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'vtex-products',
        loadChildren: () => import('./vtex-productos/vtex-productos.module').then(m => m.VtexProductosModule),
        data: {
          name:'vtex',
          isEdit: false,
          permissions: {
            only: ['super-admin', 'product-admin.vtex.product-vtex'],
          },
        },
        canActivate: [NgxPermissionsGuard],
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminProductRoutingModule {}
