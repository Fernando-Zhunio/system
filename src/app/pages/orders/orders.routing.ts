import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { permissionsModuleOrders } from '../../class/permissions-modules';
import { CreateOrEditOrderComponent } from './create-or-edit-order/create-or-edit-order.component';
import { EditOrderComponent } from './edit-order/edit-order.component';
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
  },
  {
    path: ':order_id/edit',
    component: EditOrderComponent,
    data: {
      permissions: permissionsModuleRoutes.edit
    },
    canActivate: [NgxPermissionsGuard],
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
