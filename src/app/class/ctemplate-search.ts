import { Ipagination } from '../interfaces/ipagination';
import { HeaderSearchComponent } from '../components/header-search/header-search.component';
import { Injectable, ViewChild } from '@angular/core';
import { SwalService } from '../services/swal.service';

@Injectable()
export abstract class CTemplateSearch<T> {
  paginator: Ipagination<T>;
  isload: boolean;
  @ViewChild(HeaderSearchComponent) headerComponent: HeaderSearchComponent;

  pageSizeOptions: number[] = [10, 15, 25, 100];
  products: T[] = [];

  loadData($event): void {
    this.paginator = $event.data;
    this.products = this.paginator.data;
  }

  changePaginator(event): void {
    this.headerComponent.searchBar(event);
  }

}
