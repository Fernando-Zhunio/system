import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { CategoriasComponent } from './categorias/categorias.component';
// import { CategoriasCreateOrEditComponent } from './categorias/categorias-create-or-edit/categorias-create-or-edit.component';
// import { CategoriasMainComponent } from './categorias-main.component';
import { Component } from '@angular/core';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { IndexComponent } from './index/index.component';

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
        path: 'vtex-products',
        component:IndexComponent,
        data: {
          name:'prefijos',
          isEdit: false,
          permissions: {
            only: ["super-admin", "products-admin.vtex-product.index"],
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
