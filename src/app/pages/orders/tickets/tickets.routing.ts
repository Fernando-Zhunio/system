import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { environment } from '../../../../environments/environment';
import { PermissionOrdersTickets } from '../../../class/permissions-modules';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { ResponseTicketComponent } from './response-ticket/response-ticket.component';
import { TicketsIndexComponent } from './tickets-index/tickets-index.component';

const permission_module = PermissionOrdersTickets;
const routes: Routes = [
  {
    path: '',
    component: TicketsIndexComponent,
    data: {
      permissions: {
        only:  permission_module.index,
        redirectTo: environment.ERROR_403_REDIRECT_URL
      },
    },
    canActivate: [NgxPermissionsGuard],
  },
  {
    path: 'create',
    component: CreateTicketComponent,
    data: {
      permissions: {
        only:  permission_module.create,
        redirectTo: environment.ERROR_403_REDIRECT_URL
      },
    },
    canActivate: [NgxPermissionsGuard],
  },
  {
    path: ':id',
    component: ResponseTicketComponent,
    data: {
      permissions: {
        only:  permission_module.edit,
        redirectTo: environment.ERROR_403_REDIRECT_URL
      },
    },
    canActivate: [NgxPermissionsGuard],
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
