import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { CreateOrEditProductComponent } from './pages/create-or-edit-product/create-or-edit-product.component';
import { ProductsIndexComponent } from './pages/products-index/products-index.component';

const routes: Routes = [
  {
    path: '',
    data: {name: 'productosMain'},
    children: [
      {
        path: '',
        component: ProductsIndexComponent,
        data: { name: 'productos'}
      },
      {
        path: 'create',
        component: CreateOrEditProductComponent,
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
        component: CreateOrEditProductComponent,
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
