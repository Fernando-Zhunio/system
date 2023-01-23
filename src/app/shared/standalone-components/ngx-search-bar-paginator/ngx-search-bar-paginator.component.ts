import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { NgxSearchBarComponent, NgxSearchBarFilter, NgxSearchBarModule } from 'ngx-search-bar-fz';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    NgxSearchBarModule,
    MatPaginatorModule,
  ],
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ngx-search-bar-paginator',
  templateUrl: './ngx-search-bar-paginator.component.html',
  styleUrls: ['./ngx-search-bar-paginator.component.scss']
})
export class NgxSearchBarPaginatorComponent  {

  @ViewChild(NgxSearchBarComponent) searchBar: NgxSearchBarComponent

  constructor() { }
  @Input() placeholder: string = 'Buscador';
  @Input() title = 'Pagina Novisolutions';
  @Input() path: string;
  @Input() isChangeUrl: boolean = false;
  @Input() filters: NgxSearchBarFilter
  @Input() withFilter: boolean = false;
  @Input() autoInit: boolean = true;
  @Input() nameInputSearch: string = "search";
  @Input() withParamsClean: boolean = false;
  @Input() pageSizeOption: number[] = [10, 15, 25, 50];
  @Input() customBtnApplyFilter: any = { text: 'Aplicar Filtros', class: '', color: 'accent', icon: 'done' };
  
  @Output() data = new EventEmitter<any[]>();
  @Output() isLoading = new EventEmitter<boolean>();
  @Output() filtersChange = new EventEmitter<any>();

  paginator: PageEvent = {
    pageIndex: 0,
    length: 0,
    pageSize: 0
  }

  // ngOnInit() {
  // }

  getData(event) {
    this.data.emit(event);
    this.paginator.length = event.data.total;
    this.paginator.pageSize = event.data.pageSize;
  }

  getIsLoading(event) {
    this.isLoading.emit(event);
  }

  changePaginator(event: PageEvent): void {
    this.paginator = event
    const params = {
      pageSize: this.paginator.pageSize,
      page: this.paginator.pageIndex + 1
    }
    this.searchBar.search(params)
  }

}
