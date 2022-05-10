import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TicketsIndexComponent } from './tickets-index/tickets-index.component';

const routes: Routes = [
  {
    path: '',
    component: TicketsIndexComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
