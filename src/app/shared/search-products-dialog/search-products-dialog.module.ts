import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchesModule } from '../../Modulos/searches/searches.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { SearchProductsDialogComponent } from './search-products-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    SearchesModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  exports: [SearchProductsDialogComponent],
  declarations: [SearchProductsDialogComponent]
})
export class SearchProductsDialogModule { }
