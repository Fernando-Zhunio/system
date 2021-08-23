import { Ipagination } from "../interfaces/ipagination";
import { MatSnackBar } from "@angular/material/snack-bar";
import { StandartSearchService } from "../services/standart-search.service";
import { HeaderSearchComponent } from "../components/header-search/header-search.component";
import { Injectable, ViewChild } from "@angular/core";

@Injectable()
export abstract class CTemplateSearch<T> {
  paginator: Ipagination<T>;
  isload: boolean;
  // snack_bar: MatSnackBar;
  // s_standart: StandartSearchService;
  // headerComponent: HeaderSearchComponent;
  @ViewChild(HeaderSearchComponent) headerComponent: HeaderSearchComponent;

  // ngx_spinner:any;
  pageSizeOptions: number[] = [10, 15, 25, 100];
  products: T[] = [];

  loadData($event): void {
    this.paginator = $event.data;
    this.products = this.paginator.data;
  }

  changePaginator(event): void {
    this.headerComponent.searchBar(event);
    console.log(event);
  }
}
