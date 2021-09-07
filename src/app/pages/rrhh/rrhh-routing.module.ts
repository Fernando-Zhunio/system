import { Component, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { GroupProductsComponent } from "../reportes/group-products/group-products.component";
import { NgxPermissionsGuard } from "ngx-permissions";
import { CreateOrEditGroupProductsComponent } from "../reportes/group-products/create-or-edit-group-products/create-or-edit-group-products.component";
import { IndexComponent } from "./index/index.component";

@Component({
  selector: 'app-rrhh',
  template: '<router-outlet></router-outlet>',
})
export class RrhhMainComponents  {
}
const routes: Routes = [
  {
    path: '',
    component: RrhhMainComponents,
    children: [
      {
        path: 'dashboard',
        component: IndexComponent,
        data: {
          permissions: {
            only: ['super-admin', 'rrhh.index'],
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'works',
        loadChildren: () => import('./works/works.module').then(m => m.WorksModule),
      },
      {
        path: 'appointments',
        loadChildren: () => import('./appointments/appointments.module').then(m => m.AppointmentsModule),
      },
      {
        path: 'requests',
        loadChildren: () => import('./requests/requests.module').then(m => m.RequestsModule),
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RrhhRoutingModule {}
