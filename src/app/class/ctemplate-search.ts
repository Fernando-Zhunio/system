import { Ipagination } from '../interfaces/ipagination';
import { HeaderSearchComponent } from '../components/header-search/header-search.component';
import { PageEvent } from '@angular/material/paginator';


export abstract class CTemplateSearch<T> {
  paginator: Ipagination<T>;
  isLoading: boolean;
  headerComponent: HeaderSearchComponent;
  
  pageSizeOptions: number[] = [10, 15, 25, 50];
  products: T[] = [];

  loadData($event: any): void {
    this.paginator = $event.data;
    this.products = this.paginator.data;
  }

  changePaginator(event: PageEvent): void {
    this.headerComponent.searchBar(event);
  }

}
