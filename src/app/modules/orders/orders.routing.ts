import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { environment } from '../../../environments/environment';
import { PermissionOrders } from '../../class/permissions-modules';
import { DashboardOrdersComponent } from './dashboard-orders/dashboard-orders.component';
import { CreateOrEditOrderComponent } from './pages/orders/pages/create-or-edit-order/create-or-edit-order.component';
import { EditOrderComponent } from './pages/orders/pages/edit-order/edit-order.component';
import { OrdersIndexComponent } from './pages/orders/pages/orders-index/orders-index.component';

const permissionsModuleRoutes = PermissionOrders;
const routes = [
  {
    path: 'dashboard-orders',
    component: DashboardOrdersComponent,
    data: {
      permissions:{
        only: permissionsModuleRoutes.index,
        redirectTo: environment.ERROR_403_REDIRECT_URL
      }
    },
    canActivate: [NgxPermissionsGuard],
  },
  {
    path: 'orders',
    component: OrdersIndexComponent,
    data: {
      permissions: {
        only: permissionsModuleRoutes.index,
        redirectTo: environment.ERROR_403_REDIRECT_URL
      },
      reuse: true
    },
    canActivate: [NgxPermissionsGuard],
  },
  {
    path: 'orders/create',
    component: CreateOrEditOrderComponent,
    data: {
      permissions: permissionsModuleRoutes.create
    },
    canActivate: [NgxPermissionsGuard],
  },
  {
    path: 'orders/:order_id/edit',
    component: EditOrderComponent,
    data: {
      permissions: permissionsModuleRoutes.edit
    },
    canActivate: [NgxPermissionsGuard],
  },
  {
    path: 'clients',
    loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule),
  },
  {
    path: 'tickets',
    loadChildren: () => import('./tickets/tickets.module').then(m => m.TicketsModule),
  },
  {
    path: 'servientrega',
    loadChildren: () => import('./servientrega/servientrega.module').then(m => m.ServientregaModule),
  },
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
