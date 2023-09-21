import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NgxPermissionsGuard } from "ngx-permissions";
import { IndexAppointmentsComponent } from "./pages/index-appointments/index-appointments.component";
import { CreateOrEditAppointmentComponent } from "../../appointments/create-or-edit-appointment/create-or-edit-appointment.component";

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
        component: IndexAppointmentsComponent,
        data: {
          permissions: {
            only: ['super-admin', 'rrhh-appointments'],
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
            only: ['super-admin', 'rrhh-appointments'],
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
            only: ['super-admin', 'rrhh-appointments'],
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
