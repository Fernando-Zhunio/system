import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportsIndexComponent } from './pages/imports-index/imports-index.component';
import { ImportsRoutingModule } from './imports.routing';
import { SearchTemplateTableComponent } from '../../../../Modulos/search-template/search-template-table/search-template-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    ImportsRoutingModule,
    SearchTemplateTableComponent,
    MatTableModule,
    MatButtonModule
  ],
  declarations: [ImportsIndexComponent]
})
export class ImportsModule { }
