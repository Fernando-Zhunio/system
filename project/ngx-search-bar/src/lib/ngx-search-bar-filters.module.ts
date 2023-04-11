import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSearchBarSelectComponent } from './components/ngx-search-bar-select/ngx-search-bar-select.component'; 
import { NgxSearchBarOptionComponent } from './components/ngx-search-bar-option/ngx-search-bar-option.component';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NgxSearchBarSelectComponent, NgxSearchBarOptionComponent],
  exports: [NgxSearchBarSelectComponent, NgxSearchBarOptionComponent]
})
export class NgxSearchBarFiltersModule { }