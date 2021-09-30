import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { CreateOrEditRequestComponent } from './create-or-edit-request/create-or-edit-request.component';
import { IndexComponent } from './index/index.component';

@Component({
  selector: 'app-rrhh-requests',
  template: '<router-outlet></router-outlet>',
})
export class RrhhRequestMainComponents  {
}

const routes: Routes = [
  {
    path: '',
    component: RrhhRequestMainComponents,
    children: [
      {
        path: '',
        component: IndexComponent,
        data: {
          permissions: {
            only: ['super-admin', 'rrhh-requests'],
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'create',
        component: CreateOrEditRequestComponent,
        data: {
          permissions: {
            only: ['super-admin', 'rrhh-requests'],
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'edit/:id',
        component: CreateOrEditRequestComponent,
        data: {
          permissions: {
            only: ['super-admin', 'rrhh-requests'],
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
export class RequestsRoutingModule { }
