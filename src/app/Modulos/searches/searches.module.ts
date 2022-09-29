import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../../components/search/search.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';
// import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [SearchComponent],
  imports: [
  CommonModule,
    FormsModule,
    MatPaginatorModule,
    MatProgressBarModule,
  ],
  exports: [
    SearchComponent
  ]
})
export class SearchesModule { }
