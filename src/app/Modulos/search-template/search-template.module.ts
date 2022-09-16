import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { HeaderSearchComponent } from '../../components/header-search/header-search.component';
import { SearchTemplateComponent } from '../../components/search-template/search-template.component';
import { HeaderSearchModule } from '../header-search/header-search.module';
import { MatChipsModule } from '@angular/material/chips';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatPaginatorModule } from '@angular/material/paginator';
// import { SearchTemplateTableComponent } from './search-template-table/search-template-table.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [SearchTemplateComponent],
  imports: [
    CommonModule,
    HeaderSearchModule,
    MatChipsModule,
    MatPaginatorModule,
    NgxSkeletonLoaderModule,
    MatProgressSpinnerModule,
  ],
  exports: [SearchTemplateComponent]
})
export class SearchTemplateModule { }
