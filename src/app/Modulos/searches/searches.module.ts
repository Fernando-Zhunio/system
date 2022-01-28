import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../components/search/search.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [SearchComponent],
  imports: [
  CommonModule,
    FormsModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    SearchComponent
  ]

})
export class SearchesModule { }
