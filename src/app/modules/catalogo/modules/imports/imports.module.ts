import { MatCardModule } from '@angular/material/card';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportsIndexComponent } from './pages/imports-index/imports-index.component';
import { ImportsRoutingModule } from './imports.routing';
// import { SearchTemplateTableComponent } from '../../../../Modulos/search-template/search-template-table/search-template-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CreateOrEditImportModalComponent } from './components/create-or-edit-import-modal/create-or-edit-import-modal.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MatChipsModule } from '@angular/material/chips';
import { ShowImportDialogComponent } from './components/show-import-dialog/show-import-dialog.component';
import { NgxSearchBarPaginatorComponent } from '../../../../shared/standalone-components/ngx-search-bar-paginator/ngx-search-bar-paginator.component';

@NgModule({
  imports: [
    CommonModule,
    ImportsRoutingModule,
    // SearchTemplateTableComponent,
    MatTableModule,
    MatButtonModule,
    CreateOrEditImportModalComponent,
    NgxPermissionsModule,
    MatChipsModule,
    ShowImportDialogComponent,
    NgxSearchBarPaginatorComponent,
    MatCardModule,
  ],
  declarations: [ImportsIndexComponent]
})
export class ImportsModule { }
