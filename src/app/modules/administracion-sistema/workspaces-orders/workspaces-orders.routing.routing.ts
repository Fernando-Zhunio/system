import { Routes, RouterModule } from '@angular/router';
import { CreateOrEditWorkspaceOrderComponent } from './pages/create-or-edit-workspace-order/create-or-edit-workspace-order.component';
import { IndexWorkspacesOrdersComponent } from './pages/index-workspaces-orders/index-workspaces-orders.component';

const routes: Routes = [
  {
    path: '',
    component: IndexWorkspacesOrdersComponent,
   },
   {
    path: 'create',
    component: CreateOrEditWorkspaceOrderComponent,
    data: {
      isEdit: false
    }
   },
   {
    path: ':id/edit',
    component: CreateOrEditWorkspaceOrderComponent,
    data: {
      isEdit: true
    }
   }
];

export const WorkspacesOrdersRoutingRoutes = RouterModule.forChild(routes);
