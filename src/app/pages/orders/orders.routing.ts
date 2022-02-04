import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrdersIndexComponent } from './orders-index/orders-index.component';

const routes = [
  {
    path: '',
    component: OrdersIndexComponent,
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
