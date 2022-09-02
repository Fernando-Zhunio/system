import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchProductsComponent } from './search-products.component';
import { SearchesModule } from '../../Modulos/searches/searches.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    SearchesModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [SearchProductsComponent],
  declarations: [SearchProductsComponent]
})
export class SearchProductsModule { }
