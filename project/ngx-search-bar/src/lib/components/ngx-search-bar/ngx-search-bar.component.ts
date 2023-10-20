import {
  AfterContentInit,
  Component,
  ContentChild,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core"
import { catchError, debounceTime, of, Subject, switchMap, takeUntil } from "rxjs"
import { NgxSearchBarService } from "../../ngx-search-bar.service"
// import { empty } from "../../utils/empty"
import { NgxSearchBarFormFilterComponent } from "../ngx-search-bar-form-filter/ngx-search-bar-form-filter.component"
import { NgxSearchBarPaginatorComponent } from "../ngx-search-bar-paginator/ngx-search-bar-paginator.component"
import { NGX_SEARCH_BAR_DATA, NgxSearchBarProvider } from "../../utils/DATA_FOR_SEARCH_BAR"

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: "ngx-search-bar",
  templateUrl: "./ngx-search-bar.component.html",
  styleUrls: ["./ngx-search-bar.component.scss"],
})
export class NgxSearchBarComponent implements OnInit, AfterContentInit, OnDestroy {
  

  @ContentChild(NgxSearchBarFormFilterComponent) ngxFormFilter: NgxSearchBarFormFilterComponent
  @ContentChild(NgxSearchBarPaginatorComponent) ngxPaginator: NgxSearchBarPaginatorComponent

  @Input() baseUrl: string | null = null 
  @Input() placeholder: string = "Search here"
  @Input() title: string | null = null
  @Input() path: string = "posts"
  @Input() isChangeUrl: boolean = false
  @Input() autoInit: boolean = true
  @Input() nameInputSearch: string = "search"
  @Input() isBarExpand: boolean = false
  @Input() size: number = 1
  @Input() maxWidth: string = "100%";
  @Input() isSticky: boolean  = true;
  @Input() stickyTop: string  = "0px";
  @Input() fnScrollTop: (() => void)| null = null;
  @Input() notScroll: boolean = false;

  @Output() data = new EventEmitter<any>()
  @Output() loading = new EventEmitter<boolean>()

  isLoading: boolean = false
  destroy$: Subject<boolean> = new Subject<boolean>()
  searchText: string = ""
  subject: Subject<{ [key: string]: any }> = new Subject()

  private id = Symbol();

  constructor(
    private service: NgxSearchBarService,
    @Inject(NGX_SEARCH_BAR_DATA) private dataProvider: NgxSearchBarProvider
  ) {
    if (!this.fnScrollTop) {
      this.fnScrollTop = this.dataProvider?.OPTIONS?.fnScrollTop || null
    }

    if (this.stickyTop === "0px" && this.dataProvider?.OPTIONS?.stickyTop) {
      this.stickyTop = this.dataProvider?.OPTIONS?.stickyTop
    }
  }

  ngOnInit(): void {
    this.service.addBarSearch(this.id, this)
    this.subscribeForSearch();
  }

  ngAfterContentInit(): void {
    if (this.ngxFormFilter) {
      this.ngxFormFilter.setId(this.id);
      this.isChangeUrl && this.ngxFormFilter.loadFilters();
    }

    if (this.ngxPaginator) {
      this.ngxPaginator.setId(this.id);
      this.isChangeUrl && this.ngxPaginator.loadPaginator();
    }
    if (this.isChangeUrl) {
      this.searchText = this.service.queryParams.search || ""
    }
    this.autoInit ? this.search() : this.getParamsSend()
  }

  ngOnDestroy() {
    this.service.removeBarSearch(this.id);
    this.destroy$.next(true);
    this.destroy$.unsubscribe()
  }

  scrollTop() {
    try {
      if (this.fnScrollTop && !this.notScroll) {
        this.fnScrollTop()
      }
    } catch (error) {}
  }

  subscribeForSearch(): void {
    this.subject
      .pipe(
        debounceTime(300),
        takeUntil(this.destroy$),
        switchMap((value) => this.searchObservable(value))
      )
      .subscribe({
        next: (res) => {
          this.isLoading = false;
          this.loading.emit(this.isLoading);
          if (this.ngxPaginator) {
            this.ngxPaginator.setLength(res);
          }
          if (this.isChangeUrl) {
            this.service.setParamsSearch(this.id, this.searchText);
            this.service.changeQueryParams(this.id);
          }
          this.data.emit(res);
        },
        error: () => {
          this.isLoading = false;
          this.loading.emit(this.isLoading);
        },
      })
  }

  searchObservable(params: { [key: string]: number } = {}) {
    this.isLoading = true
    this.scrollTop();
    this.loading.emit(this.isLoading)
    const p = this.getParamsSend(params)
    return this.service.search(this.path, p, this.baseUrl).pipe(
      catchError(() => {
        this.isLoading = false
        this.loading.emit(this.isLoading)
        return of(null) as any
      } )
    )
  }

  search(params: { [key: string]: number } = {}) {
    this.subject.next(params)
  }

  getParamsSend(params: { [key: string]: any } = {}): { [key: string]: any } {
    // let paramsSend = {}
    // if (this.ngxPaginator) {
    //   paramsSend = this.ngxPaginator.getPaginator()
    // }
    const p = this.service.getBarSearch(this.id)?.params;
    const paginate = {};
    if (p?.paginate) {
      paginate[p.paginate.page.field] = p.paginate.page.value;
      paginate[p.paginate.pageSize.field] = p.paginate.pageSize.value;
    }
    return {
      [this.nameInputSearch]: this.searchText,
      ...(p?.form || {}),
      ...(paginate),
      ...params,
    }
  }
}
