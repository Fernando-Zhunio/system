import { Component, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Ipagination } from '../../interfaces/ipagination';
import { HeaderSearchComponent } from '../header-search/header-search.component';

/**
 * @selector menu-bar menuBar
 * @selector filter-menu filterMenu
 */
@Component({
  selector: 'app-search-template',
  templateUrl: './search-template.component.html',
  styleUrls: ['./search-template.component.css']
})
export class SearchTemplateComponent implements OnInit {

  constructor() {}
  @Input() filter_data: object = {};
  @Input() placeholder: string = 'Buscador';
  @Input() url$: string;
  @Input() title = 'Pagina Novisolutions';
  @Input() init: boolean = true;
  @Input() active_filters_menu: boolean = false;
  @Input() key_paginator: string = null;
  @Input() columns = 4;
  @Input() withCardColumns: boolean = true;
  @Output() _isLoading = new EventEmitter<boolean>();
  @Output() data = new EventEmitter<any[]>();
  @ViewChild(HeaderSearchComponent) headerComponent: HeaderSearchComponent;

  paginator: Ipagination<any>;
  isLoading: boolean;
  pageSizeOptions: number[] = [10, 15, 25, 50];
  products: any[] = [];
  ngOnInit(): void {
  }

  loadData($event) {
    if (this.key_paginator) {
      this.paginator = $event.data[this.key_paginator];
      this.products = this.paginator.data;
      this.data.emit($event.data);
      return;
    }
    this.paginator = $event.data;
    this.products = this.paginator.data;
    this.data.emit(this.products);
  }

  hasIsLoading(): void {
    this._isLoading.emit(this.isLoading);
  }

  changePaginator(event: PageEvent): void {
    this.headerComponent.searchBar(event);
  }

}
