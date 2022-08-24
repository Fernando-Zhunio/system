import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { HeaderSearchComponent } from '../../../components/header-search/header-search.component';
import { Ipagination } from '../../../interfaces/ipagination';

@Component({
  selector: 'app-search-template-table',
  templateUrl: './search-template-table.component.html',
  styleUrls: ['./search-template-table.component.scss']
})
export class SearchTemplateTableComponent implements OnInit {

  @Input() filter_data: object = {};
  @Input() placeholder: string = 'Buscador';
  @Input() url$: string;
  @Input() title = 'Pagina Novisolutions';
  @Input() init: boolean = true;
  @Input() active_filters_menu: boolean = false;
  @Input() key_paginator: string = null;
  @Output() isLoading = new EventEmitter<boolean>(false);
  @Output() data = new EventEmitter<any[]>();
  @ViewChild(HeaderSearchComponent) headerComponent: HeaderSearchComponent;

  paginator: Ipagination<any>;
  __isLoading: boolean;
  pageSizeOptions: number[] = [10, 15, 25, 50];
  products: any[] = [];
  constructor() { }

  ngOnInit() {
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

  hasIsLoading(event): void {
    console.log(event);
    this.__isLoading = event;
    this.isLoading.emit(this.__isLoading);
  }

  isLoadingNow(event): void {
    console.log(event);
    this.__isLoading = event;
    this.isLoading.emit(this.__isLoading);
  }

  changePaginator(event: PageEvent): void {
    this.headerComponent.searchBar(event);
  }

  searchNow(event = null): void {
    this.headerComponent.searchBar(event);
  }

}