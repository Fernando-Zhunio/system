import { AfterContentInit, Component, ContentChild, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { catchError, debounceTime, of, Subject, switchMap, takeUntil } from 'rxjs';
import { NgxSearchBarService } from '../../ngx-search-bar.service';
import { empty } from '../../utils/empty';
import { NgxSearchBarFormFilterComponent } from '../ngx-search-bar-form-filter/ngx-search-bar-form-filter.component';
import { NgxSearchBarPageEvent } from '../../utils/ngx-search-bar-page-event';
import { NgxSearchBarPaginatorComponent } from '../ngx-search-bar-paginator/ngx-search-bar-paginator.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ngx-search-bar',
  templateUrl: './ngx-search-bar.component.html',
  styleUrls: ['./ngx-search-bar.component.scss'],
})
export class NgxSearchBarComponent implements OnInit, AfterContentInit, OnDestroy {
  constructor(
    private searchBarService: NgxSearchBarService,
  ) { }

  @ContentChild(NgxSearchBarFormFilterComponent) ngxFormFilter: NgxSearchBarFormFilterComponent;
  @ContentChild(NgxSearchBarPaginatorComponent) ngxPaginator: NgxSearchBarPaginatorComponent;

  @Input() placeholder: string = 'Search here';
  @Input() title: string | null = null;
  @Input() path: string = 'posts';
  @Input() isChangeUrl: boolean = false;
  @Input() autoInit: boolean = true;
  @Input() nameInputSearch: string = 'search';
  @Input() isBarExpand: boolean = false;
  @Input() size: number = 4;
  @Input() maxWidth: string = '100%';
  @Input() scroll: {
    querySelect?: string,
    isWindow: boolean
  } | null = null;
  @Input() scrollSelected: string | null = null;
  @Input() pageClass: NgxSearchBarPageEvent | null = null;

  @Output() data = new EventEmitter<any>();
  @Output() loading = new EventEmitter<boolean>();

  isLoading: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  searchText: string = '';
  subject: Subject<{ [key: string]: any }> = new Subject();
  currentParams: { [key: string]: any } = {};
  numberFilter = 0;
  isOpenFilter = false;

  ngOnInit(): void {
    this.subscribeForSearch();
  }
  
  ngAfterContentInit(): void {
    this.initWithModifyUrl();
    this.autoInit ? this.search() : this.getParamsSend();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  scrollTop() {
    try {
      if (this.scroll) {
        if (this.scroll.isWindow) {
          window.scrollTo(0, 0);
        } else if (this.scroll.querySelect) {
          document.querySelector(this.scroll.querySelect)?.scrollTo(0, 0);
        }
      }
    } catch (error) {

    }
    // window.scrollTo(0, 0);
  }

  initWithModifyUrl(): void {
    if (!this.ngxFormFilter) return;
    let params = {};
    if (this.isChangeUrl) {
      params = this.searchBarService.getQueryParams() || {};
      if (!params) return;
      if (params.hasOwnProperty(this.nameInputSearch)) {
        this.searchText = params[this.nameInputSearch];
      }
    }

    try {
      const params2 = this.ngxFormFilter.getFormFilters();
      const plusParams = {...params2.value, ...params,}
      const paramsSend = {}
      Object.keys(plusParams).filter(x => x !== this.nameInputSearch).forEach(key => {
        if (empty(plusParams[key])) return;
        paramsSend[key] = plusParams[key];
      });
      this.search(paramsSend);
      setTimeout(() => {
        this.ngxFormFilter.setFormFiltersValue(paramsSend);
      }, 0);
    } catch (error) {
      console.error('error', error);
    }
  }

  subscribeForSearch(): void {
    this.subject.pipe(
      debounceTime(300),
      takeUntil(this.destroy$),
      switchMap((value) => this.searchObservable(value))
    )
      .subscribe(
        {
          next: (res) => {
            this.isLoading = false;
            this.loading.emit(this.isLoading);
            if (this.ngxPaginator) {
              this.ngxPaginator.setLength(res);
            }
            if (this.isChangeUrl) {
              this.searchBarService.setQueryParams(this.currentParams);
            }
            this.data.emit(res);
          },
          error: () => {
            this.isLoading = false;
            this.loading.emit(this.isLoading);
          }
        }
      );
  }

  searchObservable(params: { [key: string]: number } = {}) {
    this.isLoading = true;
    this.scrollTop();
    this.loading.emit(this.isLoading);
    this.currentParams = this.getParamsSend(params);
    return this.searchBarService.search(this.path, this.currentParams)
    .pipe(
      catchError(() => {
        this.isLoading = false;
        this.loading.emit(this.isLoading);
        return of(null);
      })
    );
  }

  search(params: { [key: string]: number } = {}) {
    console.log('params', params);
    this.subject.next(params);
  }

  getParamsSend(params: { [key: string]: any } = {}): { [key: string]: any } {
    let paramsSend = {};
    if (this.ngxPaginator) {
      paramsSend = this.ngxPaginator.getPaginator();
    }
    return {
      [this.nameInputSearch]: this.searchText,
      ...this.ngxFormFilter?.getFilter() || {},
      ...params,
      ...paramsSend
    };
  }

  

}
