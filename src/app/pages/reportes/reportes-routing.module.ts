import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupProductsComponent } from './group-products/group-products.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { CreateOrEditGroupProductsComponent } from './group-products/create-or-edit-group-products/create-or-edit-group-products.component';
import { DownloadStockComponent } from './download-stock/download-stock.component';

@Component({
  selector: 'app-reports',
  template: '<router-outlet></router-outlet>',
})
export class ReportsMainComponents  {
}
const routes: Routes = [
  {
    path: '',
    component: ReportsMainComponents,
    children: [
      {
        path: 'group-products',
        component: GroupProductsComponent,
        data: {
          permissions: {
            only: ['super-admin', 'purchase-department.imports.index'],
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'group-products/create',
        component: CreateOrEditGroupProductsComponent,
        data: {
          isEdit: false,
          permissions: {
            only: ['super-admin', 'purchase-department.imports.create'],
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'group-products/edit',
        component: CreateOrEditGroupProductsComponent,
        data: {
          isEdit: true,
          permissions: {
            only: ['super-admin', 'purchase-department.imports.edit'],
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'general-stock',
        component: DownloadStockComponent,
        data: {
          isEdit: true,
          permissions: {
            only: ['super-admin', 'report.general-stock'],
          },
        },
        canActivate: [NgxPermissionsGuard],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule {}
