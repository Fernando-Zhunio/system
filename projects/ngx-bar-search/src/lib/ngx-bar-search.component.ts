import { Location } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Optional, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgxBarSearchService } from './ngx-bar-search.service';

@Component({
  selector: 'ngx-bar-search',
  templateUrl: './ngx-bar-search.component.html',
  styleUrls: ['./ngx-bar-search.component.scss'],
})
export class NgxBarSearchComponent implements OnInit {

  @Output() isLoading: EventEmitter<boolean> = new EventEmitter();
  @Output() products: EventEmitter<any> = new EventEmitter();
  @Input() url = '';
  @Input() placeholder = 'What are you looking for?';
  @Input() filter_data = {};
  @Input() active_filters_menu: boolean = false;
  @Input() isSticky: boolean = true;
  @Input() init: boolean = true;
  @Input() spinner_name = null;
  @Input() canModifyBarSearch: boolean = true;
  @Input() title = 'Page';
  @Input() queryScrollTop = 'body'
  pageEvent = {
    length: 0,
    pageIndex: 0,
    pageSize: 15,
  };
  productSearch: string = '';
  subscription: Subscription;
  intervalSearch: any;
  countFilter = null;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private methodsHttp: NgxBarSearchService,
    private _location: Location,
  ) {}

  ngOnInit(): void {
    if (this.init) {
      const params = this.getQueryParams();
      params ? this.searchBar(params) : this.searchBar();
    }
  }

  getQueryParams() {
    const params = JSON.parse(
      JSON.stringify(this.activeRoute.snapshot.queryParamMap['params'])
    );
    try {
      // const $event = { pageIndex: 0, pageSize: 15, previousPageIndex: 0 };
      if (params.hasOwnProperty('search')) { this.productSearch = params.search; }
      if (params.hasOwnProperty('pageSize')) {this.pageEvent.pageSize = params.pageSize; }
      if (params.hasOwnProperty('page')) { this.pageEvent.pageIndex = parseInt(params.page, 10) - 1; }
    } catch (error) {
      console.log(error);
      // return null;
    }
    return this.pageEvent;
  }

  searchBar( params = null) {
    this.isLoading.emit(true);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    const $event = params || this.pageEvent;
    this.pageEvent = $event;
    if (this.queryScrollTop) this.gotoTop();
    this.subscription = this.methodsHttp
      .methodGet(this.url, {
        pageSize: $event.pageSize,
        search: this.productSearch,
        page: $event.pageIndex + 1,
        ...this.filterWithNotNull(),
      })
      .subscribe(
        (response: any) => {
          this.isLoading.emit(false);
          this.products.emit(response);
          if (this.canModifyBarSearch) {
            const queryParams: Params = {
              page: $event.pageIndex + 1,
              pageSize: $event.pageSize,
              search: this.productSearch,
            };
            this.router.navigate([], {
              relativeTo: this.activeRoute,
              queryParams: queryParams,
              replaceUrl: true,
            });
          }
        },
        (err) => {
          this.isLoading.emit(false);
        }
      );
  }

  gotoTop() {
    const main = document.querySelector(this.queryScrollTop);
    main.scrollTop = 0;
  }

  filterWithNotNull(): object {
    this.countFilter = null;
    const filter_data = {};
    Object.keys(this.filter_data).forEach((key) => {
      if (this.filter_data[key] !== null && this.filter_data[key] !== '' && this.filter_data[key] !== 0) {
        if (this.filter_data[key]?.length < 1) {
          return;
        }
        filter_data[key] = this.filter_data[key];
        console.log(key);
        this.countFilter++;
      }
    });
    return filter_data;
  }

  searchBarReset() {
    this.pageEvent = {
      length: 0,
      pageIndex: 0,
      pageSize: this.pageEvent.pageSize,
    };
    this.searchBar(this.pageEvent);
  }

  goBack(): void {
    this._location.back();
  }

  buscarInterval(event: Event): void {
    clearTimeout(this.intervalSearch);
    if (event['keyCode'] === 13) {this.searchBarReset(); return; }
    this.intervalSearch = setTimeout(() => {
       this.searchBarReset();
     }, 1000);
   }

   paste() {
    if (navigator.clipboard) {
      navigator.clipboard.readText().then((res) => {
        this.productSearch = res;
      });
    }
    // else {
    //   SwalService.swalToast(
    //     'Necesitas proporcionar permisos de portapapeles a esta pagina',
    //     'warning'
    //   );
    // }
  }
}
