import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos.component';
import { ProductosRoutingModule, ProductosMainComponent } from './productos-routing.module ';

import {NgxPaginationModule} from 'ngx-pagination';
import { ProductCreateOrEditComponent } from './product-create-or-edit/product-create-or-edit.component'; // <-- import the module
// import { ProductosMainComponent } from './productos-main.component';
import { ReactiveFormsModule } from '@angular/forms';

// material angular
// import { MatInputModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MatCardModule } from '@angular/material/card';


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
    NgxPaginationModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    NgxPermissionsModule,
    MatCardModule,
  ],
  exports: [ MatFormFieldModule, MatInputModule ]

})
export class ProductoModule { }
