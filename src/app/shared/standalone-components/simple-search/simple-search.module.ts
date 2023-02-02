import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchesModule } from '../../../Modulos/searches/searches.module';
import { MatButtonModule } from '@angular/material/button';
// import { SearchProductsDialogComponent } from './simple-search.component';

@NgModule({
  imports: [
    CommonModule,
    SearchesModule,
    MatButtonModule,
  ],
  // exports: [SearchProductsDialogComponent],
  // declarations: [SearchProductsDialogComponent]
})
export class SearchProductsDialogModule { }
