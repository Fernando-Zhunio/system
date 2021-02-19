import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportComponent } from '../../components/import/import.component';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [ImportComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatMenuModule,
    MatIconModule,
    NgxPermissionsModule.forChild(),
    MatButtonModule,
  ],
  exports:[ImportComponent]
})
export class ImportModule { }
