import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsIndexComponent } from './pages/products-index/products-index.component';
import { ProductosRoutingModule } from './productos.routing';

import {NgxPaginationModule} from 'ngx-pagination';
import { ProductCreateOrEditComponent } from './product-create-or-edit/product-create-or-edit.component'; // <-- import the module
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// material angular
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MatCardModule } from '@angular/material/card';
import { NgxSearchBarModule } from 'ngx-search-bar-fz';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { NgxSearchBarPaginatorComponent } from '../../../shared/standalone-components/ngx-search-bar-paginator/ngx-search-bar-paginator.component';
import { MatTableModule } from '@angular/material/table';


@NgModule({
  declarations: [
    ProductsIndexComponent,
    ProductCreateOrEditComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    NgxPermissionsModule,
    MatCardModule,
    NgxSearchBarModule,
    MatPaginatorModule,
    MatChipsModule,
    NgxSearchBarPaginatorComponent,
    MatTableModule
  ],
  exports: [ MatFormFieldModule, MatInputModule ]

})
export class ProductModule { }
