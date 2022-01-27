import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../components/search/search.component';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    MatPaginatorModule,
  ],
  exports: [
    SearchComponent
  ]

})
export class SearchesModule { }
