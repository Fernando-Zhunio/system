import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { NgxSearchBarService } from '../../../../../project/ngx-search-bar/src/public-api';
import { NgxSearchBarComponent, NgxSearchBarFilter, NgxSearchBarModule } from '../../../../../project/ngx-search-bar/src/public-api';
import { ResponsePaginateApi } from '../../interfaces/response-api';

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
export class NgxSearchBarPaginatorComponent implements OnInit {

  @ViewChild(NgxSearchBarComponent) searchBar: NgxSearchBarComponent

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
  @Input() isCustomPaginator: boolean = false;
  @Input() formFilter: FormGroup;
  @Input() maxWidth: string = '100%';

  @Output() data = new EventEmitter<any[] | any>();
  @Output() isLoading = new EventEmitter<boolean>();
  @Output() filtersChange = new EventEmitter<any>();
  isEmptyData: boolean = false;
  isLoadingData: boolean = false;
  paginator: PageEvent = {
    pageIndex: 0,
    length: 0,
    pageSize: 0
  }

  ngOnInit(): void {
    this.initParamsPaginator();
  }

  initParamsPaginator() {
    const params= NgxSearchBarService.currentQueryParams
    if (!params) return;
    if (params['page']) {
      this.paginator.pageIndex = params['page'] - 1;
    }
    if (params['pageSize']) {
      this.paginator.pageSize = params['pageSize'];
    }
  }

  filtersChangeMethod(event): void {
    this.filtersChange.emit(event);
  }

  getData(event: ResponsePaginateApi<any>) {
    if (this.isCustomPaginator) {
      this.data.emit(event);
      return;
    }
    this.data.emit(event.data.data);
    this.paginator.length = event.data.total;
    this.paginator.pageIndex = event.data.current_page - 1;
    this.isEmptyData = event.data.total === 0;
    this.paginator.pageSize = event.data.per_page;
  }

  setDataPaginator({ length, pageSize }: { length: number, pageSize: number }) {
    this.paginator.length = length;
    this.paginator.pageSize = pageSize;
    this.isEmptyData = length === 0;
  }

  getIsLoading(event) {
    if (event) {
      window.scrollTo(0, 0);
    }
    this.isLoadingData = event;
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
