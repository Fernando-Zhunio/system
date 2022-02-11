import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriasComponent } from './categorias.component';
import { CategoriasCreateOrEditComponent } from './categorias-create-or-edit/categorias-create-or-edit.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { permission_admin_products } from '../../../class/permissions-modules';

const permission_categories = permission_admin_products.categories;


const routes: Routes = [
  {
    path: '',
    data: {
      name: 'categories_main',
      isEdit: false,
      permissions: {
        only: ['super-admin', permission_categories.index],
      },
    },
    canActivate: [NgxPermissionsGuard],
    children: [
      {
        path: '',
        component: CategoriasComponent,
        data: {name: 'categories', reuse: true,}
      },
      {
        path: 'create',
        component: CategoriasCreateOrEditComponent,
        data: {
          isEdit: false,
          permissions: {
            only: ['super-admin', 'products-admin.categories.create'],
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
            only: ['super-admin', 'products-admin.categories.edit'],
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
