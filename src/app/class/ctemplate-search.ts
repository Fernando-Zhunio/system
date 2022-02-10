import { Ipagination } from '../interfaces/ipagination';
import { HeaderSearchComponent } from '../components/header-search/header-search.component';
import { Injectable, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Injectable()
export abstract class CTemplateSearch<T> {
  paginator: Ipagination<T>;
  isLoading: boolean;
  @ViewChild(HeaderSearchComponent) headerComponent: HeaderSearchComponent;

  pageSizeOptions: number[] = [10, 15, 25, 50];
  products: T[] = [];

  loadData($event): void {
    this.paginator = $event.data;
    this.products = this.paginator.data;
  }

  changePaginator(event: PageEvent): void {
    this.headerComponent.searchBar(event);
  }

}
