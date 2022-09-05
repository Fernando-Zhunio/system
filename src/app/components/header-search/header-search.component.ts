
import { Location } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { empty } from '../../class/tools';
import { MethodsHttpService } from '../../services/methods-http.service';
import { SwalService } from '../../services/swal.service';

@Component({
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.css'],
})
export class HeaderSearchComponent implements OnInit, OnDestroy {
  @Output() isLoading: EventEmitter<boolean> = new EventEmitter(false);
  @Output() products: EventEmitter<any> = new EventEmitter();
  @Input() url = '';
  @Input() placeholder = 'Escriba el nombre del producto';
  @Input() filter_data = {};
  @Input() active_filters_menu: boolean = false;
  @Input() isSticky: boolean = true;
  @Input() init: boolean = true;
  @Input() spinner_name = null;
  @Input() canModifyBarSearch: boolean = true;
  @Input() title = 'Pagina Novisolutions';
  pageEvent: PageEvent = {
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
    private methodsHttp: MethodsHttpService,
    private _location: Location
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

  buscarInterval(event: Event): void {
   clearTimeout(this.intervalSearch);
   if (event['keyCode'] === 13) {this.searchBarReset(); return; }
   this.intervalSearch = setTimeout(() => {
      this.searchBarReset();
    }, 1000);
  }

  searchBar( params: any = null) {
    this.isLoading.emit(true);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    const $event = params || this.pageEvent;
    this.pageEvent = $event;
    // this.gotoTop();
    window.scrollTo(0, 0);
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
        () => {
          this.isLoading.emit(false);
        }
      );
  }

  ngOnDestroy(): void {
    if (this.subscription) {this.subscription.unsubscribe();}
  }

  // gotoTop() {
  //   const main = document.getElementsByClassName('app-body');
  //   if (main && main?.length > 0) {
  //     // main[0].scrollTo(0, 0);
  //     main[0].scrollTop = 0;
  //   }
  // }

  filterWithNotNull(): object {
    this.countFilter = null;
    const filter_data = {};
    Object.keys(this.filter_data).forEach((key) => {
      if (!empty(this.filter_data[key]) || this.filter_data[key] === '0') {
      // if (this.filter_data[key] && this.filter_data[key] !== '' && this.filter_data[key] !== 0) {
        if (this.filter_data[key]?.length < 1) {
          return;
        }
        filter_data[key] = this.filter_data[key];
        console.log(key);
        if (this.countFilter) {
          this.countFilter++;
        }
      }
    });
    return filter_data;
  }

  paste() {
    if (navigator.clipboard) {
      navigator.clipboard.readText().then((res) => {
        this.productSearch = res;
      });
    } else {
      SwalService.swalToast(
        'Necesitas proporcionar permisos de portapapeles a esta pagina',
        'warning'
      );
    }
  }

  searchBarReset() {
    this.pageEvent = {
      length: 0,
      pageIndex: 0,
      pageSize: this.pageEvent.pageSize,
    };
    this.searchBar(this.pageEvent);
  }

  refrescated(): void {
    const dataLocalStorage = localStorage.getItem('data_refresh');
    if (dataLocalStorage) {
      const local_storage_data_refresh = JSON.parse(
        dataLocalStorage
      );
      if (
        local_storage_data_refresh.now &&
        this.activeRoute.paramMap['name'] === local_storage_data_refresh.name
      ) {
        this.searchBar();
      }
    }
  }

  goBack(): void {
    this._location.back();
  }


}
