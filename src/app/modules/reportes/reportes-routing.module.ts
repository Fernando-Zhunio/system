import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupProductsComponent } from './group-products/group-products.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { CreateOrEditGroupProductsComponent } from './group-products/create-or-edit-group-products/create-or-edit-group-products.component';
import { DownloadStockComponent } from './pages/download-stock/download-stock.component';
import { IndexReportsComponent } from './pages/index-reports/index-reports.component';
import { CreateOrEditReportComponent } from './create-or-edit-report/create-or-edit-report.component';
import { PermissionReportsOrders } from '../../class/permissions-modules';

const permissionsModules = PermissionReportsOrders;

const routes: Routes = [
  {
    path: '',
    component: IndexReportsComponent,
    data: {
      permissions: {
        only: permissionsModules.index,
      },
    }
  },
  {
    path: 'create',
    component: CreateOrEditReportComponent,
    data: {
      isEdit: false,
      permissions: {
        only: permissionsModules.create,
      },
    },
  },
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
        only: ['super-admin', 'reports.general-stock.export'],
      },
    },
    canActivate: [NgxPermissionsGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportesRoutingModule { }
