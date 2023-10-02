import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsIndexComponent } from './pages/products-index/products-index.component';
import { ProductosRoutingModule } from './productos.routing';

import { CreateOrEditProductComponent } from './pages/create-or-edit-product/create-or-edit-product.component'; // <-- import the module
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { NgxSearchBarPaginatorComponent } from '../../../shared/standalone-components/ngx-search-bar-paginator/ngx-search-bar-paginator.component';
import { MatTableModule } from '@angular/material/table';
import { NgxSearchBarModule } from '../../../../../project/ngx-search-bar/src/public-api';


@NgModule({
  declarations: [
    ProductsIndexComponent,
    CreateOrEditProductComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NgxSearchBarPaginatorComponent,
    NgxSearchBarModule,
    NgxPermissionsModule,

    // Material Modules
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    MatChipsModule,
    MatTableModule
  ],
  exports: [ MatFormFieldModule, MatInputModule ]

})
export class ProductModule { }
