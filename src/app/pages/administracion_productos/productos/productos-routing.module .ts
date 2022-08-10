import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { ProductCreateOrEditComponent } from './product-create-or-edit/product-create-or-edit.component';
import { ProductosComponent } from './productos.component';

const routes: Routes = [
  {
    path: '',
    data: {name: 'productosMain'},
    children: [
      {
        path: '',
        component: ProductosComponent,
        data: { name: 'productos'}
      },
      {
        path: 'create',
        component: ProductCreateOrEditComponent,
        data: {
          isEdit: false,
          permissions: {
            only: ['super-admin', 'products-admin.products.create'],
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'edit/:id',
        component: ProductCreateOrEditComponent,
        data: {
          isEdit: true,
          permissions: {
            only: ['super-admin', 'products-admin.products.edit'],
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
export class ProductosRoutingModule {}
