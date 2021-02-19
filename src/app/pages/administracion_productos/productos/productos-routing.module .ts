import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { ProductCreateOrEditComponent } from './product-create-or-edit/product-create-or-edit.component';
import { ProductosMainComponent } from './productos-main.component';


import { ProductosComponent } from './productos.component';

const routes: Routes = [
  {
    path: '',
    component:ProductosMainComponent,
    children: [
      {
        path: '',
        component: ProductosComponent,
      },
      {
        path: 'create',
        component: ProductCreateOrEditComponent,
        // data:{isEdit:false}
        data: {
          isEdit: false,
          permissions: {
            only: ["super-admin", "products-admin.product.create"],
          },
        },
        canActivate: [NgxPermissionsGuard],

      },
      {
        path: 'edit/:id',
        component: ProductCreateOrEditComponent,
        // data:{isEdit:true}
        data: {
          isEdit: true,
          permissions: {
            only: ["super-admin", "products-admin.product.edit"],
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
