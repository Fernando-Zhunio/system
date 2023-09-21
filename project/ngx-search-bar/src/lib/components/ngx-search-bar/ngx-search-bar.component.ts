import { AfterContentInit, Component, ContentChild, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, switchMap, takeUntil } from 'rxjs';
import { NgxSearchBarService } from '../../ngx-search-bar.service';
import { empty } from '../../utils/empty';
import { NgxSearchBarFormFilterComponent } from '../ngx-search-bar-form-filter/ngx-search-bar-form-filter.component';

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

  //#region Variables
  @Input() placeholder: string = 'Search here';
  @Input() title: string | null = null;
  @Input() path: string = 'posts';
  @Input() isChangeUrl: boolean = false;
  @Input() autoInit: boolean = true;
  @Input() nameInputSearch: string = 'search';
  @Input() isBarExpand: boolean = false;
  @Input() size: number = 4;
  @Input() maxWidth: string = '100%';

  @Output() data = new EventEmitter<any>();
  @Output() loading = new EventEmitter<boolean>();

  isLoading: boolean = false;
  // formFilters: FormGroup | null = null;
  destroy$: Subject<boolean> = new Subject<boolean>();
  searchText: string = '';
  subject: Subject<{ [key: string]: any }> = new Subject();
  currentParams: { [key: string]: any } = {};
  numberFilter = 0;
  isOpenFilter = false;
  //#endregion Variables



  ngOnInit(): void {
    this.subscribeForSearch();
  }
  
  ngAfterContentInit(): void {

    this.initWithModifyUrl();
    this.autoInit ? this.search() : this.getParamsSend();
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
      // this.formFilters = new FormGroup({});
      const params2 = this.ngxFormFilter.getFormFilters();
      console.log('paramns', params);
      const plusParams = {...params2.value, ...params,}
      const paramsSend = {}
      Object.keys(plusParams).filter(x => x !== this.nameInputSearch).forEach(key => {
        if (empty(plusParams[key])) return;
        paramsSend[key] = plusParams[key];
        // this.formFilters?.addControl(key, new FormControl(plusParams[key]));
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

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  searchObservable(params: { [key: string]: number } = {}) {
    this.isLoading = true;
    this.loading.emit(this.isLoading);
    this.currentParams = this.getParamsSend(params);
    return this.searchBarService.search(this.path, this.currentParams);
  }

  search(params: { [key: string]: number } = {}) {
    console.log('params', params);
    this.subject.next(params);
  }

  getParamsSend(params: { [key: string]: any } = {}): { [key: string]: any } {
    console.log('params3', params);
    return {
      [this.nameInputSearch]: this.searchText,
      ...this.ngxFormFilter?.getFilter() || {},
      ...params,
    };
  }

  

}
