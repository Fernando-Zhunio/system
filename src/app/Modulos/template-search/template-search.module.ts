import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateForSearchColumnsComponent } from './../../components/template-for-search-columns/template-for-search-columns.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { HeaderSearchModule } from './../header-search/header-search.module';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [TemplateForSearchColumnsComponent],
  imports: [
CommonModule,
  NgxSkeletonLoaderModule,
  HeaderSearchModule,
  MatPaginatorModule
  ],
  exports:[
    TemplateForSearchColumnsComponent
  ]

})
export class TemplateSearchModule { }
