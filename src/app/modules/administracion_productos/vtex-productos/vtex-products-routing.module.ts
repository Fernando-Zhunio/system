import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { IndexComponent } from './index/index.component';
import { CreateOrEditComponent } from './create-or-edit/create-or-edit.component';

const routes: Routes = [
  {
    path: '',
    data: { name: 'products_vtex_admin'},
    children: [
      {
        path: '',
        component: IndexComponent,
        data: {
          name: 'index-product-vtex',
          isEdit: false,
          permissions: {
            only: ['super-admin', 'product-admin.vtex.product-vtex.index'],
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'create-product-vtex',
        component: CreateOrEditComponent,
        data: {
          name: 'create-product-vtex',
          isEdit: false,
          permissions: {
            only: ['super-admin', 'product-admin.vtex.product-vtex.create'],
          },
        },
        canActivate: [NgxPermissionsGuard],
      },

      {
        path: 'edit-product-vtex/:id',
        component: CreateOrEditComponent,
        data: {
          name: 'edit-product-vtex',
          isEdit: true,
          permissions: {
            only: ['super-admin', 'product-admin.vtex.product-vtex.edit'],
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      // {
      //   path: 'vtex-price-create/:id',
      //   component:VtexPricesComponent,
      //   data: {
      //     name:'vtex-price-create',
      //     isEdit: false,
      //     permissions: {
      //       only: ["super-admin", "products-admin.vtex-price-create"],
      //     },
      //   },
      //   canActivate: [NgxPermissionsGuard],
      //   resolve:{data:VtexPriceGuard},
      // },
      // {
      //   path: 'vtex-price-edit/:id',
      //   component:VtexPricesComponent,
      //   data: {
      //     name:'vtex-price-edit',
      //     isEdit: true,
      //     permissions: {
      //       only: ["super-admin", "products-admin.vtex-price-edit"],
      //     },
      //   },
      //   canActivate: [NgxPermissionsGuard],
      // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class AdminVtexProductRoutingModule {}
