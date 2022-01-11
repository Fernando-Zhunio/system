import { MatChipsModule } from '@angular/material/chips';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexWithMatTableComponent } from './index-with-mat-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { HeaderSearchModule } from '../header-search/header-search.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { NgxPermissionsModule } from 'ngx-permissions';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [IndexWithMatTableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    HeaderSearchModule,
    MatChipsModule,
    MatPaginatorModule,
    MatButtonModule,
    NgxPermissionsModule,
    FormsModule
  ],
  exports: [IndexWithMatTableComponent]
})
export class IndexWithMatTableModule { }
