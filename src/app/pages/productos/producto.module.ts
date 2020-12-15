import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos.component';
import { ProductosRoutingModule } from './productos-routing.module ';

import {NgxPaginationModule} from 'ngx-pagination';
import { ProductCreateOrEditComponent } from './product-create-or-edit/product-create-or-edit.component'; // <-- import the module
import { ProductosMainComponent } from './productos-main.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductosMainComponent,
    ProductosComponent,
    ProductCreateOrEditComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule

  ]
})
export class ProductoModule { }
