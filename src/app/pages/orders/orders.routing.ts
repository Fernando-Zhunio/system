import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { permissionsModuleOrders } from '../../class/permissions-modules';
import { CreateOrEditClientOrderComponent } from './clients/create-or-edit-client-order/create-or-edit-client-order.component';
import { CreateOrEditOrderComponent } from './create-or-edit-order/create-or-edit-order.component';
import { OrdersIndexComponent } from './orders-index/orders-index.component';

const permissionsModuleRoutes = permissionsModuleOrders;
const routes = [
  {
    path: '',
    component: OrdersIndexComponent,
    data: {
      permissions: permissionsModuleRoutes.index
    },
    canActivate: [NgxPermissionsGuard],
  },
  {
    path: 'create',
    component: CreateOrEditOrderComponent,
    data: {
      permissions: permissionsModuleRoutes.create
    },
    canActivate: [NgxPermissionsGuard],
  },
  {
    path: 'clients',
    loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule),

  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class OrdersRoutingModule { }
