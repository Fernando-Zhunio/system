import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClientsIndexComponent } from './clients-index/clients-index.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { PermissionOrdersClients } from '../../../class/permissions-modules';
import { CreateOrEditClientOrderComponent } from './create-or-edit-client-order/create-or-edit-client-order.component';
import { ClientAddressesIndexComponent } from './client-addresses-index/client-addresses-index.component';
import { environment } from '../../../../environments/environment';

const permissionsModulesRoutes = PermissionOrdersClients;

const routes: Routes = [
  {
    path: '',
    component: ClientsIndexComponent,
    data: {
      permissions: permissionsModulesRoutes.index,
      redirectTo: environment.ERROR_403_REDIRECT_URL

    },
    canActivate: [NgxPermissionsGuard],
  },
  {
    path: 'create',
    component: CreateOrEditClientOrderComponent,
    data: {
      isEdit: false,
      permissions: permissionsModulesRoutes.create
    },
    canActivate: [NgxPermissionsGuard],
  },
  {
    path: ':client_id/edit',
    component: CreateOrEditClientOrderComponent,
    data: {
      isEdit: true,
      permissions: permissionsModulesRoutes.edit
    },
    canActivate: [NgxPermissionsGuard],
  },
  {
    path: ':client_id/addresses',
    component: ClientAddressesIndexComponent,
    data: {
      // permissions: permissionsModulesRoutes.edit
    },
    // canActivate: [NgxPermissionsGuard],
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class ClientsRoutingModule { }
