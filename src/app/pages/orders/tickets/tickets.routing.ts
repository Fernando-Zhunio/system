import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { ResponseTicketComponent } from './response-ticket/response-ticket.component';
import { TicketsIndexComponent } from './tickets-index/tickets-index.component';

const routes: Routes = [
  {
    path: '',
    component: TicketsIndexComponent,
  },
  {
    path: 'create/order/:order_id',
    component: CreateTicketComponent,
  },
  {
    path: ':id',
    component: ResponseTicketComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
