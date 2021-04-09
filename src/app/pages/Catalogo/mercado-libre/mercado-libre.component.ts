import { Component, OnInit, ViewChild } from "@angular/core";
import { MercadoLibreService } from "../../../services/mercado-libre.service";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { StandartSearchService } from "../../../services/standart-search.service";
import { ImlInfo } from "../../../interfaces/iml-info";
import { Subscription } from "rxjs";
import { FormControl, FormGroup } from "@angular/forms";
import { HeaderSearchComponent } from "../../../components/header-search/header-search.component";
import { Ipagination } from "../../../interfaces/ipagination";

@Component({
  selector: "app-mercado-libre",
  templateUrl: "./mercado-libre.component.html",
  styleUrls: ["./mercado-libre.component.css"],
})
export class MercadoLibreComponent implements OnInit {
  @ViewChild(HeaderSearchComponent) headerComponent:HeaderSearchComponent;

  // search_name: string = "";
  // isColumns: boolean = true;
  // pageCurrent: number = 1;
  // perPage: number = 10;
  // totalItem: number = 0;
  // productSearch: string = null;

  // length = 100;
  // pageSize = 10;
  // pageSizeOptions: number[] = [10, 15, 25, 100];
  // pageEvent: PageEvent;
  // selected_state: string = "all";
  // @ViewChild("paginator") paginator: MatPaginator;
  price_min: number = null;
  price_max: number = null;
  aux_page_next = 0;
  hasData: boolean = true;
  isload: boolean = false;
  // suscrition_api: Subscription;
  // form_filter: FormGroup = new FormGroup({
  //   // prefix_id: new FormControl(null),
  //   min: new FormControl(null),
  //   max: new FormControl(null),
  //   state: new FormControl('all'),
  //   // warehouse_ids: new FormControl(['all']),
  //   search: new FormControl(''),
  // });

  min:string = "";
  max:string = "";
  state:string = "all";
  constructor(
    private s_mercado_libre: MercadoLibreService,
    // private s_standart: StandartSearchService
  ) {}

  paginator:Ipagination<ImlInfo>;


  mlInfos:ImlInfo[] = [];

  ngOnInit(): void {
    // this.gotoTop();
    // this.isload = true;
    // this.s_mercado_libre.index(1, 10).subscribe((res) => {
    //   console.log(res);
    //   this.isload = false;
    //   // this.products = res.products.data;
    //   this.mlInfos = res.data.data;
    //   this.length = res.data.total;
    //   this.pageSize = res.data.per_page;
    //   this.pageCurrent = res.data.current_page;
    //   if (this.mlInfos.length < 1) {
    //     this.hasData = false;
    //   } else this.hasData = true;
    //   // this.pageEvent.length = 10;
    //   // this.pageEvent.pageIndex = 0;
    //   // this.pageEvent.pageSize = 10;
    // },err => {
    //   this.isload = false;
    // })

  }

  // searchBar($event = { pageSize: 15, pageIndex: 0 }) {
  //   this.pageSize = $event.pageSize;
  //   console.log($event);
  //   this.isload =true;
  //   this.gotoTop();
  //   if (this.suscrition_api) {
  //     this.suscrition_api.unsubscribe();
  //     console.log("cancelado llamado");
  //   }
  //   this.suscrition_api = this.s_standart
  //     .search2("catalogs/ml-products", {
  //       page: $event.pageIndex + 1,
  //       pageSize: this.pageSize,
  //       ...this.form_filter.value,
  //     })
  //     .subscribe((response: any) => {
  //       console.log(response);
  //       this.isload = false;
  //       this.mlInfos = response.data.data;
  //       this.length = response.data.total;
  //       this.pageSize = response.data.per_page;
  //       this.pageCurrent = response.data.current_page;
  //       if (this.mlInfos.length < 1) {
  //         this.hasData = false;
  //       } else this.hasData = true;
  //     },err=>{
  //       this.isload = false;
  //     });
  // }

  // changedPaginator($event) {
  //   this.pageSize = $event.pageSize;
  //   this.isload = true;
  //   console.log($event);
  //   if ($event.pageIndex != this.aux_page_next) {
  //     // window.scrollTo(0,0);
  //     this.gotoTop();
  //     console.log("scroll");
  //     // scrollTo(0,0);
  //     this.aux_page_next = $event.pageIndex;
  //   }
  //   this.s_standart
  //     .nextPageSearch(
  //       $event.pageIndex + 1,
  //       this.productSearch,
  //       $event.pageSize,
  //       this.selected_state,
  //       this.price_min,
  //       this.price_max,
  //       'catalogs/ml-products'
  //     )
  //     .subscribe((response: any) => {
  //       console.log(response);
  //       this.isload = false;
  //       this.mlInfos = response.products.data;
  //       this.length = response.products.total;
  //       this.pageSize = response.products.per_page;
  //       this.pageCurrent = response.products.current_page;
  //       if (this.mlInfos.length < 1) {
  //         this.hasData = false;
  //       } else this.hasData = true;

  //     },err=>{
  //       this.isload = false;
  //     });
  // }
  // gotoTop() {
  //   const main = document.getElementsByClassName("app-body");
  //   main[0].scrollTop = 0;
  // }
  executeMenu(event): void {
    console.log(event);
    this.s_mercado_libre.updateStatus(event.id, event.type).subscribe((res) => {
      console.log(res);
      if (res.success) {
        const indice = this.mlInfos.findIndex((x) => x.id == event.id);
        this.mlInfos[indice] = res.ml;
      }
    });
  }

  loadData($event):void{
    this.paginator = $event.data;
    this.mlInfos = this.paginator.data;
    console.log(this.paginator);
  }

  changePaginator(event):void{
    this.headerComponent.searchBar(event);
    console.log(event);
  }

  applyFilter(){
    this.headerComponent.searchBar();
  }
}
