import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IndexPermissionsComponent } from './pages/index-permissions/index-permissions.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { IndexGroupsPermissionsComponent } from './pages/index-groups-permissions/index-groups-permissions.component';

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
    component: IndexPermissionsComponent,
      data: {
        permissions: {
          only: permissionModule.index,
        },
      },
      canActivate: [NgxPermissionsGuard],
  },
  {
    path: 'groups',
    component: IndexGroupsPermissionsComponent,
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
