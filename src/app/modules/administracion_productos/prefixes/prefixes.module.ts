import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { PrefijoComponent } from './prefijo.component';
// import { NgxPaginationModule } from 'ngx-pagination';
import { PrefixesRoutingModule } from './prefixes.routing';
// import { PrefijosCreateOrEditComponent } from './prefijos-create-or-edit/prefijos-create-or-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgxPermissionsModule } from 'ngx-permissions';
// import { MatCardModule } from '@angular/material/card';
import { PrefixesIndexComponent } from './pages/prefixes-index/prefixes-index.component';
import { CreateOrEditPrefixComponent } from './pages/create-or-edit-prefix/create-or-edit-prefix.component';
import { SearchTemplateTableComponent } from '../../../Modulos/search-template/search-template-table/search-template-table.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';



@NgModule({
  declarations: [PrefixesIndexComponent, CreateOrEditPrefixComponent],
  imports: [
    CommonModule,
    // NgxPaginationModule,
    PrefixesRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    NgxPermissionsModule,
    SearchTemplateTableComponent,
    MatDialogModule,
    MatTableModule,
    MatChipsModule,
    // MatCardModule,
  ]
})
export class PrefixesModule { }
