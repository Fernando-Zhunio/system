import { Component, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { NgxPermissionsGuard } from "ngx-permissions";
import { IndexComponent } from "./index/index.component";
import { CreateOrEditAppointmentComponent } from "./create-or-edit-appointment/create-or-edit-appointment.component";

@Component({
  selector: 'app-rrhh-appointment',
  template: '<router-outlet></router-outlet>',
})
export class RrhhAppointmentMainComponents  {
}
const routes: Routes = [
  {
    path: '',
    component: RrhhAppointmentMainComponents,
    children: [
      {
        path: '',
        component: IndexComponent,
        data: {
          permissions: {
            only: ['super-admin', 'rrhh.index'],
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'request/:request_id/edit/:appointment_id',
        component: CreateOrEditAppointmentComponent,
        data: {
          isEdit: true,
          permissions: {
            only: ['super-admin', 'rrhh.appointment.edit'],
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'request/:id/create',
        component: CreateOrEditAppointmentComponent,
        data: {
          isEdit: false,
          permissions: {
            only: ['super-admin', 'rrhh.appointment.create'],
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
export class RrhhAppointmentRoutingModule {}
