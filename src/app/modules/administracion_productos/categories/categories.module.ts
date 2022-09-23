import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesCreateOrEditComponent } from './pages/categories-create-or-edit/categories-create-or-edit.component';
import { CategoriesRoutingModule } from './categories.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgxPermissionsModule } from 'ngx-permissions';
import { CategoriesIndexComponent } from './pages/categories-index/categories-index.component';
import { SearchTemplateTableComponent } from '../../../Modulos/search-template/search-template-table/search-template-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';


@NgModule({
  declarations: [CategoriesIndexComponent, CategoriesCreateOrEditComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgxPermissionsModule,
    MatTableModule,
    SearchTemplateTableComponent,
    MatDialogModule,
    MatChipsModule,
  ]
})
export class CategoriasModule { }
