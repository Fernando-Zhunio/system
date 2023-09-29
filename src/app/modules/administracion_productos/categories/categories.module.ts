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
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
// import { NgxSearchBarPaginatorComponent } from '../../../shared/standalone-components/ngx-search-bar-paginator/ngx-search-bar-paginator.component';
import { MatCardModule } from '@angular/material/card';
import { NgxSearchBarModule } from '../../../../../project/ngx-search-bar/src/public-api';


@NgModule({
  declarations: [CategoriesIndexComponent, CategoriesCreateOrEditComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    NgxSearchBarModule,
    NgxPermissionsModule,

    // Material Modules
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatChipsModule,
    // NgxSearchBarPaginatorComponent,
    MatCardModule
  ]
})
export class CategoriasModule { }
