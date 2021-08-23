import { Component, NgModule } from '@angular/core';
// import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { NgxPermissionsGuard } from "ngx-permissions";
import { CreateOrEditWorkComponent } from './create-or-edit-work/create-or-edit-work.component';
import { IndexComponent } from './index/index.component';

@Component({
  selector: 'app-rrhh-works',
  template: '<router-outlet></router-outlet>',
})
export class RrhhWorksMainComponents  {
}
const routes: Routes = [
  {
    path: '',
    component: RrhhWorksMainComponents,
    children: [
      {
        path: '',
        component: IndexComponent,
        data: {
          permissions: {
            only: ['super-admin', 'rrhh.works.index'],
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'edit/:id',
        component: CreateOrEditWorkComponent,
        data: {
          isEdit: true,
          permissions: {
            only: ['super-admin', 'rrhh.work.edit'],
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
export class RrhhWorksRoutingModule {}
