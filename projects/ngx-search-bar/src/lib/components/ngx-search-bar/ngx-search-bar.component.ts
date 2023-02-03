import { Component, ContentChild, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { debounceTime, Subject, switchMap, takeUntil } from 'rxjs';
import { NgxSearchBarService } from '../../ngx-search-bar.service';
import { NgxSearchBarFormFilterComponent } from '../ngx-search-bar-form-filter/ngx-search-bar-form-filter.component';

@Component({
  selector: 'ngx-search-bar',
  templateUrl: './ngx-search-bar.component.html',
  styleUrls: ['./ngx-search-bar.component.scss'],
})
export class NgxSearchBarComponent implements OnInit, OnDestroy {
  constructor(
    private searchBarService: NgxSearchBarService,
  ) {}

  @ContentChild(NgxSearchBarFormFilterComponent) ngxFormFilter: NgxSearchBarFormFilterComponent;

  //#region Variables
  @Input() placeholder: string = 'Search here';
  @Input() title: string | null = null;
  @Input() path: string = 'posts';
  @Input() isChangeUrl: boolean = false;
  @Input() autoInit: boolean = true;
  @Input() nameInputSearch: string = 'search';
  @Input() isBarExpand: boolean = false;
  
  @Output() data = new EventEmitter<any>();
  @Output() loading = new EventEmitter<boolean>();

  isLoading: boolean = false;
  @Input() filters: FormGroup | null = null;
  destroy$: Subject<boolean> = new Subject<boolean>();
  searchText: string = '';
  subject: Subject<{ [key: string]: any }> = new Subject();
  currentParams: { [key: string]: any } = {};
  //#endregion Variables



  ngOnInit(): void {
    this.initWithModifyUrl();
    this.subscribeForSearch();
    this.autoInit ? this.search() : this.getParamsSend();
  }

  initWithModifyUrl(): void {
    if (!this.isChangeUrl) return;
    const params = this.searchBarService.getQueryParams();
    if (!params) return;
    if (params.hasOwnProperty(this.nameInputSearch)) {
      this.searchText = params[this.nameInputSearch];
    }
    if(!this.filters) return;

    try {
        this.filters?.patchValue(params);
      // Object.keys(params).forEach(key => {
      //   if (key === this.nameInputSearch ) return;
      //   // this.filters[key] = params[key];
      //   this.filters?.patchValue({[key]: params[key]});
      // });
    } catch (error) {

    }

    setTimeout(() => {
      this.ngxFormFilter.filters.patchValue(params);
    }, 0);
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
            console.log('res', res);
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
    this.subject.next(params);
  }

  getParamsSend(params: { [key: string]: any } = {}): { [key: string]: any } {
    return {
      [this.nameInputSearch]: this.searchText,
      ...this.filters,
      ...params,
    };
  }

}
