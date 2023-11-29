import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarcasRoutingModule } from './brands.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MatCardModule } from '@angular/material/card';
import { BrandsIndexComponent } from './pages/brands-index/brands-index.component';
import { CreateOrEditBrandComponent } from './pages/create-or-edit-brand/create-or-edit-brand.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxSearchBarModule } from 'ngx-search-bar-fz';

@NgModule({
  declarations: [BrandsIndexComponent, CreateOrEditBrandComponent],
  imports: [
    CommonModule,
    MarcasRoutingModule,
    // NgxPaginationModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    NgxPermissionsModule,
    MatCardModule,
    MatChipsModule,
    MatTableModule,
    MatDialogModule,
    // NgxSearchBarPaginatorComponent,
    NgxSearchBarModule,
  ]
})
export class BrandsModule { }
