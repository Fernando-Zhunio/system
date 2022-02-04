import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersIndexComponent } from './orders-index/orders-index.component';
import { OrdersRoutingModule } from './orders.routing';
import { SearchTemplateModule } from '../../Modulos/search-template/search-template.module';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [OrdersIndexComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    SearchTemplateModule,
    MatCardModule,
  ]
})
export class OrdersModule { }
