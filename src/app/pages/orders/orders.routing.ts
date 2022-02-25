import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateOrEditOrderComponent } from './create-or-edit-order/create-or-edit-order.component';
import { OrdersIndexComponent } from './orders-index/orders-index.component';

const routes = [
  {
    path: '',
    component: OrdersIndexComponent,
  },
  {
    path: 'create',
    component: CreateOrEditOrderComponent
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
