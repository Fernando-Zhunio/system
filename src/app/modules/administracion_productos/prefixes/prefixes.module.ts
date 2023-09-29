import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrefixesRoutingModule } from './prefixes.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxPermissionsModule } from 'ngx-permissions';
import { PrefixesIndexComponent } from './pages/prefixes-index/prefixes-index.component';
import { CreateOrEditPrefixComponent } from './pages/create-or-edit-prefix/create-or-edit-prefix.component';
import { SearchTemplateTableComponent } from '../../../Modulos/search-template/search-template-table/search-template-table.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
// import { NgxSearchBarPaginatorComponent } from '../../../shared/standalone-components/ngx-search-bar-paginator/ngx-search-bar-paginator.component';
import { MatCardModule } from '@angular/material/card';
import { NgxSearchBarModule } from '../../../../../project/ngx-search-bar/src/public-api';



@NgModule({
  declarations: [PrefixesIndexComponent, CreateOrEditPrefixComponent],
  imports: [
    CommonModule,
    PrefixesRoutingModule,
    NgxPermissionsModule,
    SearchTemplateTableComponent,
    ReactiveFormsModule,
    NgxSearchBarModule,

    // Material Modules
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatChipsModule,
    // NgxSearchBarPaginatorComponent,
    MatCardModule
  ]
})
export class PrefixesModule { }
