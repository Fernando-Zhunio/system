import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { IndexComponent } from './index/index.component';



const routes: Routes = [
  {
    path: '',
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestsRoutingModule { }
