import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { PermissionAdminLocations } from '../../../class/permissions-modules';
import { CreateOrEditLocationComponent } from './create-or-edit-location/create-or-edit-location.component';
import { LocacionesComponent } from './locaciones.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: LocacionesComponent,
        data: {
          permissions: {
            only: PermissionAdminLocations.location.index,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'create',
        component: CreateOrEditLocationComponent,
        data: {
          isEdit: false,
          permissions: {
            only: PermissionAdminLocations.location.create,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
      {
        path: 'edit/:id',
        component: CreateOrEditLocationComponent,
        data: {
          isEdit: true,
          permissions: {
            only: PermissionAdminLocations.location.edit,
          },
        },
        canActivate: [NgxPermissionsGuard],
      },
    ],
    data: {
      permissions: {
        only: PermissionAdminLocations.location.index,
      },
    },
    canActivate: [NgxPermissionsGuard],
  },
];

export const LocationRouting = RouterModule.forChild(routes);
