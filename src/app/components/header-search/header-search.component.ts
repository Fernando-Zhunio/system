import { Clipboard } from "@angular/cdk/clipboard";
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { async } from "@angular/core/testing";
import { MatPaginator } from "@angular/material/paginator";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from "rxjs";
import { StandartSearchService } from "../../services/standart-search.service";
import { SwalService } from "../../services/swal.service";

@Component({
  selector: "app-header-search",
  templateUrl: "./header-search.component.html",
  styleUrls: ["./header-search.component.css"],
})
export class HeaderSearchComponent implements OnInit {
  @Output() isload: EventEmitter<boolean> = new EventEmitter();
  @Output() products: EventEmitter<any> = new EventEmitter();
  @Input() url = "";
  @Input() placeholder = "Escriba el nombre del producto";
  @Input() filter_data = {};
  @Input() isSticky: boolean = true;
  @Input() init: boolean = true;
  @Input() spinner_name = null;
  productSearch: string = "";
  suscription: Subscription;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private s_standart: StandartSearchService,
    private active_route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.init) {
      const params = this.getQueryParams();
      params ? this.searchBar(params) : this.searchBar();
    }
  }

  getQueryParams() {
    let params = {};
    params = JSON.parse(
      JSON.stringify(this.activeRoute.snapshot.queryParamMap["params"])
    );
    try {
      let $event = { pageIndex: 0, pageSize: 15, previousPageIndex: 0 };
      if (params.hasOwnProperty("search"))
        this.productSearch = params["search"];
      if (params.hasOwnProperty("pageSize"))
        $event.pageSize = Number.parseInt(params["pageSize"]);
      if (params.hasOwnProperty("page"))
        $event.pageIndex = Number.parseInt(params["page"]) - 1;
      return $event;
    } catch (error) {
      console.exception(error);
      return null;
    }
  }
 intervalSearch:any;
  buscarInterval(event:Event):void{
    clearTimeout(this.intervalSearch);
    // console.log(event.keyCode);

   if(event['keyCode'] == 13){this.searchBar(); return }
   this.intervalSearch = setTimeout(() => {
      this.searchBar()
    }, 1000);
  }
  searchBar($event = { pageIndex: 0, pageSize: 15, previousPageIndex: 0 }) {
    this.isload.emit(true);
    if (this.suscription) {
      this.suscription.unsubscribe();
    }
    this.gotoTop();
    this.suscription = this.s_standart
      .search2(this.url, {
        pageSize: $event.pageSize,
        search: this.productSearch,
        page: $event.pageIndex + 1,
        ...this.filter_data,
      })
      .subscribe(
        (response: any) => {
          // console.log(response);
          this.isload.emit(false);
          this.products.emit(response);
          const queryParams: Params = {
            page: $event.pageIndex + 1,
            pageSize: $event.pageSize,
            search: this.productSearch,
          };
          console.log(queryParams);
          this.router.navigate([], {
            relativeTo: this.activeRoute,
            queryParams: queryParams,
            replaceUrl: true,
          });
        },
        (err) => {
          this.isload.emit(false);
        }
      );
  }

  ngOnDestroy(): void {
    if (this.suscription) this.suscription.unsubscribe();
  }

  gotoTop() {
    const main = document.getElementsByClassName("app-body");
    main[0].scrollTop = 0;
  }

  paste() {
    if (navigator.clipboard) {
      navigator.clipboard.readText().then((res) => {
        this.productSearch = res;
      });
    } else {
      SwalService.swalToast(
        "Necesitas proporcionar permisos de portapapeles a esta pagina",
        "warning"
      );
    }
  }

  refrescated(): void {
    const local_storage_data_refresh = JSON.parse(
      localStorage.getItem("data_refresh")
    );
    if (
      local_storage_data_refresh.now &&
      this.active_route.paramMap["name"] == local_storage_data_refresh.name
    ) {
      this.searchBar();
    }
  }
}
