import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { CategoriasMainComponent } from './categorias-main.component';
// import { Component } from '@angular/core';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { BrandsIndexComponent } from './pages/brands-index/brands-index.component';
import { CreateOrEditBrandComponent } from './pages/create-or-edit-brand/create-or-edit-brand.component';

const routes: Routes = [
      {
        path: '',
        component: BrandsIndexComponent,
        data: {
          name: 'marcas',
          permissions: {
            only: ['super-admin', 'products-admin.brands.index'],
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'create',
        component: CreateOrEditBrandComponent,
        data: {
          isEdit: false,
          permissions: {
            only: ['super-admin', 'products-admin.brands.create'],
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'edit/:id',
        component: CreateOrEditBrandComponent,
        canActivate: [NgxPermissionsGuard],
        data: {
          isEdit: true,
          permissions: {
            only: ['super-admin', 'products-admin.brands.edit'],
          },
        },
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarcasRoutingModule {}
