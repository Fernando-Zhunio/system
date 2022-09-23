import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PermissionIndexComponent } from './permission-index/permission-index.component';
import { NgxPermissionsGuard } from 'ngx-permissions';

const permissionModule = {
  index: ['super-admin', 'admin.permissions.index'],
  show: ['super-admin', 'admin.permissions.show'],
  create: ['super-admin', 'admin.permissions.create'],
  edit: ['super-admin', 'admin.permissions.edit'],
  delete: ['super-admin', 'admin.permissions.destroy'],
};

const routes = [
  {
    path: '',
    component: PermissionIndexComponent,
      data: {
        permissions: {
          only: permissionModule.index,
        },
      },
      canActivate: [NgxPermissionsGuard],
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PermissionsRoutingModule { }
