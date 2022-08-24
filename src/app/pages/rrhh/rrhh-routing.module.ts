import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { IndexComponent } from './index/index.component';
import { UsersWebRrhhComponent } from './users-web-rrhh/users-web-rrhh.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: IndexComponent,
        data: {
          permissions: {
            only: ['super-admin', 'rrhh-dashboard'],
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'works',
        loadChildren: () => import('./works/works.module').then(m => m.WorksModule),
        data: {
          permissions: {
            only: ['super-admin', 'rrhh-works'],
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'appointments',
        loadChildren: () => import('./appointments/appointments.module').then(m => m.AppointmentsModule),
        data: {
          permissions: {
            only: ['super-admin', 'rrhh-appointments'],
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'requests',
        loadChildren: () => import('./requests/requests.module').then(m => m.RequestsModule),
        data: {
          permissions: {
            only: ['super-admin', 'rrhh-requests'],
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'users-web',
        component: UsersWebRrhhComponent,
        data: {
          permissions: {
            only: ['super-admin', 'rrhh-users-web'],
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
