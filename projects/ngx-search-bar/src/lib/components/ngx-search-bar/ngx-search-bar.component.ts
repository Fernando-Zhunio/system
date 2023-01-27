import { Component, ContentChild, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { NgxSearchBarService } from '../../ngx-search-bar.service';
import { NgxSearchBarFilterValue } from '../../interfaces/structures';
import { FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { NgxSearchBarFormFilterComponent } from '../ngx-search-bar-form-filter/ngx-search-bar-form-filter.component';

@Component({
  selector: 'ngx-search-bar',
  templateUrl: './ngx-search-bar.component.html',
  styleUrls: ['./ngx-search-bar.component.scss'],
})
export class NgxSearchBarComponent implements OnInit, OnDestroy {
  constructor(
    private searchBarService: NgxSearchBarService,
    protected location: Location,
  ) {
  }

  @ContentChild(NgxSearchBarFormFilterComponent) ngxFormFilter: NgxSearchBarFormFilterComponent;

  //#region Variables
  @Input() placeholder: string = 'Search here';
  @Input() title: string = 'Search';
  @Input() path: string = 'posts';
  @Input() isChangeUrl: boolean = false;
  @Input() autoInit: boolean = true;
  @Input() nameInputSearch: string = 'search';

  @Output() data = new EventEmitter<any>();
  @Output() loading = new EventEmitter<boolean>();

  formSearch: FormControl = new FormControl('');
  isLoading: boolean = false;
  filters: { [key: string]: any } = {};
  destroy$: Subject<boolean> = new Subject<boolean>();
  //#endregion Variables



  ngOnInit(): void {
    this.initWithModifyUrl();
    this.autoInit ? this.search() : this.getParamsSend();
    this.subscripbeForSearch();
  }

  initWithModifyUrl(): void {
    if (!this.isChangeUrl) return;
    const params = this.getQueryParamsFromUrl();
    if (!params) return;
    if (params.hasOwnProperty(this.nameInputSearch)) {
      this.formSearch.setValue(params[this.nameInputSearch]);
    }

    try {
      Object.keys(params).forEach(key => {
        if (key === this.nameInputSearch) return;
        this.filters[key] = params[key];
      });
    } catch (error) {

    }
        
    setTimeout(() => {
      this.ngxFormFilter.filters.patchValue(params);
    }, 0);
  }

  subscripbeForSearch(): void {
    this.formSearch.valueChanges
      .pipe(
        debounceTime(300),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        this.search()
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  search(params: { [key: string]: number } = {}) {
    this.isLoading = true;
    this.loading.emit(this.isLoading);
    const queryParams = this.getParamsSend(params);
    this.searchBarService.search(this.path, queryParams).subscribe(
      {
        next: (res) => {
          this.isLoading = false;
          this.loading.emit(this.isLoading);
          if (this.isChangeUrl) {
            this.setQueryParamsForUrl(queryParams);
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

  setQueryParamsForUrl(params: { [key: string]: NgxSearchBarFilterValue } = {}): void {
    let searchParams = new URLSearchParams();
    searchParams.set('params', JSON.stringify(params) || '');
    this.location.replaceState(this.location.path().split('?')[0], searchParams.toString())
  }

  getQueryParamsFromUrl(): object | null {
    try {
      const segmentUrl = window.location.href.split('?');
      if (segmentUrl.length === 1) return null;
      const params = Object.fromEntries(new URLSearchParams(segmentUrl[1]) as any);
      if (!params || !params.hasOwnProperty('params')) return null;
      return JSON.parse(params['params']);
    }
    catch (e) {
      return null;
    }
  }



  getParamsSend(params: { [key: string]: NgxSearchBarFilterValue } = {}): { [key: string]: NgxSearchBarFilterValue } {
    return {
      [this.nameInputSearch]: this.formSearch.value,
      ...params,
      ...this.filters,
    };
  }

}
