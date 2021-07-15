import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { CategoriasComponent } from './categorias/categorias.component';
// import { CategoriasCreateOrEditComponent } from './categorias/categorias-create-or-edit/categorias-create-or-edit.component';
// import { CategoriasMainComponent } from './categorias-main.component';
import { Component } from '@angular/core';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { IndexComponent } from './index/index.component';
import { CreateOrEditComponent } from './create-or-edit/create-or-edit.component';

@Component({
  selector: 'app-vtex-products',
  template: '<router-outlet></router-outlet>',

})
export class AdminVtexProductsMainComponents  {
}


const routes: Routes = [
  {
    path: '',
    component:AdminVtexProductsMainComponents,
    data:{name:'products_vtex_admin'},
    children: [
      {
        path: '',
        component:IndexComponent,
        data: {
          name:'index-product-vtex',
          isEdit: false,
          permissions: {
            only: ["super-admin", "products-admin.vtex-product.index"],
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'create-product-vtex',
        component:CreateOrEditComponent,
        data: {
          name:'create-product-vtex',
          isEdit: false,
          permissions: {
            only: ["super-admin", "products-admin.vtex-create-product"],
          },
        },
        canActivate: [NgxPermissionsGuard],
      },

      {
        path: 'edit-product-vtex/:id',
        component:CreateOrEditComponent,
        data: {
          name:'edit-product-vtex',
          isEdit: true,
          permissions: {
            only: ["super-admin", "products-admin.vtex-edit-product"],
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
export class AdminVtexProductRoutingModule {}
