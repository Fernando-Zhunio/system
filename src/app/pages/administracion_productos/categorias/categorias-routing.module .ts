import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriasComponent } from './categorias.component';
import { CategoriasCreateOrEditComponent } from './categorias-create-or-edit/categorias-create-or-edit.component';
// import { CategoriasMainComponent } from './categorias-main.component';
import { Component } from '@angular/core';
import { NgxPermissionsGuard } from 'ngx-permissions';

@Component({
  selector: 'app-productos',
  template: '<router-outlet></router-outlet>',

})
export class CategoriasMainComponents  {
}


const routes: Routes = [
  {
    path: '',
    component:CategoriasMainComponents,
    data: {
      name: 'categorias_main',
      isEdit: false,
      permissions: {
        only: ["super-admin", "products-admin.categories.index"],
      },
    },
    canActivate: [NgxPermissionsGuard],
    children: [
      {
        path: '',
        component: CategoriasComponent,
        data: {name: 'categorias', reuse: true,}
      },
      {
        path: 'create',
        component: CategoriasCreateOrEditComponent,
        data: {
          isEdit: false,
          permissions: {
            only: ["super-admin", "products-admin.categories.create"],
          },
        },
        canActivate: [NgxPermissionsGuard],
        // data:{isEdit:false}
      },
      {
        path: 'edit/:id',
        component: CategoriasCreateOrEditComponent,
        // data:{isEdit:true}
        data: {
          isEdit: true,
          permissions: {
            only: ["super-admin", "products-admin.categories.edit"],
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
export class CategoriasRoutingModule {}
