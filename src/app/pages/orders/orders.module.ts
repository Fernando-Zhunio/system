import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersIndexComponent } from './orders-index/orders-index.component';
import { OrdersRoutingModule } from './orders.routing';
import { SearchTemplateModule } from '../../Modulos/search-template/search-template.module';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { CreateOrEditOrderComponent } from './create-or-edit-order/create-or-edit-order.component';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { TranslatefzModule } from '../../Modulos/translatefz/translatefz.module';



@NgModule({
  declarations: [OrdersIndexComponent, CreateOrEditOrderComponent],
  imports: [
    CommonModule,
    RouterModule,
    OrdersRoutingModule,
    SearchTemplateModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    TranslatefzModule
  ]
})
export class OrdersModule { }
