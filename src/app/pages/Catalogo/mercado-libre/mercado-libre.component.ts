import { Component, OnInit, ViewChild } from "@angular/core";
import { MercadoLibreService } from "../../../services/mercado-libre.service";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { StandartSearchService } from "../../../services/standart-search.service";
import { ImlInfo } from "../../../interfaces/iml-info";

@Component({
  selector: "app-mercado-libre",
  templateUrl: "./mercado-libre.component.html",
  styleUrls: ["./mercado-libre.component.css"],
})
export class MercadoLibreComponent implements OnInit {
  search_name: string = "";
  isColumns: boolean = true;
  pageCurrent: number = 1;
  perPage: number = 10;
  totalItem: number = 0;
  productSearch: string = null;

  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 15, 25, 100];
  pageEvent: PageEvent;
  selected_state: string = "all";
  @ViewChild("paginator") paginator: MatPaginator;
  price_min: number = null;
  price_max: number = null;
  aux_page_next = 0;
  hasData: boolean = true;
  isload: boolean = false;

  constructor(
    private s_mercado_libre: MercadoLibreService,
    private s_standart: StandartSearchService
  ) {}

  mlInfos:ImlInfo[] = [];
  ngOnInit(): void {
    this.gotoTop();
    this.isload = true;
    this.s_mercado_libre.index(1, 10).subscribe((res) => {
      console.log(res);
      this.isload = false;
      // this.products = res.products.data;
      this.mlInfos = res.products.data;
      this.length = res.products.total;
      this.pageSize = res.products.per_page;
      this.pageCurrent = res.products.current_page;
      if (this.mlInfos.length < 1) {
        this.hasData = false;
      } else this.hasData = true;
      // this.pageEvent.length = 10;
      // this.pageEvent.pageIndex = 0;
      // this.pageEvent.pageSize = 10;
    },err => {
      this.isload = false;
    })
      
  }

  searchBar() {
    // const pageSize = this.paginator.pageSize;
    console.log(this.pageEvent);
    this.isload =true;
    // if($event.pageIndex != this.aux_page_next){
    // window.scrollTo(0,0);
    this.gotoTop();
    console.log("scroll");
    // scrollTo(0,0);
    // this.aux_page_next = $event.pageIndex;
    // }
    this.s_standart
      .search(
        this.productSearch,
        this.pageSize,
        this.selected_state,
        this.price_min,
        this.price_max,
        'catalogs/ml-products'
      )
      .subscribe((response: any) => {
        console.log(response);
        this.isload = false;
        this.products = response.products.data;
        this.length = response.products.total;
        this.pageSize = response.products.per_page;
        this.pageCurrent = response.products.current_page;
        if (this.products.length < 1) {
          this.hasData = false;
        } else this.hasData = true;
      },err=>{
        this.isload = false;
      });
  }

  changedPaginator($event) {
    this.pageSize = $event.pageSize;
    this.isload = true;
    console.log($event);
    if ($event.pageIndex != this.aux_page_next) {
      // window.scrollTo(0,0);
      this.gotoTop();
      console.log("scroll");
      // scrollTo(0,0);
      this.aux_page_next = $event.pageIndex;
    }
    this.s_standart
      .nextPageSearch(
        $event.pageIndex + 1,
        this.productSearch,
        $event.pageSize,
        this.selected_state,
        this.price_min,
        this.price_max,
        'catalogs/ml-products'
      )
      .subscribe((response: any) => {
        console.log(response);
        this.isload = false;
        this.products = response.products.data;
        this.length = response.products.total;
        this.pageSize = response.products.per_page;
        this.pageCurrent = response.products.current_page;
        if (this.products.length < 1) {
          this.hasData = false;
        } else this.hasData = true;
        
      },err=>{
        this.isload = false;
      });
  }
  gotoTop() {
    const main = document.getElementsByClassName("app-body");
    main[0].scrollTop = 0;
  }
  executeMenu(event): void {
    console.log(event);
    this.s_mercado_libre.updateStatus(event.id, event.type).subscribe((res) => {
      console.log(res);
      if (res.success) {
        const indice = this.products.findIndex((x) => x.id == event.id);
        this.products[indice] = res.ml;
      }
    });
  }

  assingProduct(mlId): void {
    // var mlId = $(this).attr('id-ml-product');
    // var productMlCont = $(this).parent('.col-lg-12');
    // var assignModal = modal({
    //     id: 'assign',
    //     title: 'Asignar información a otro producto',
    //     ajax: {
    //         url: '/catalogs/ml-products/' + mlId + '/assign/',
    //         type: 'GET',
    //         callback: function() {
    //             searchProducts();
    //             setTimeout(function() {
    //                 $('input.search-product').select();
    //             }, 600);
    //         }
    //     }
    // });
    // $('body').off('click', '#select-assign');
    // $('body').on('click', '#select-assign', function(e) {
    //     var product_id = $(this).attr('product-id');
    //     ajax.xhr({
    //             url: '/catalogs/ml-products/' + mlId + '/assign',
    //             params: { product_id: product_id, _method: 'PUT', _token: token },
    //             method: 'POST',
    //         },
    //         function(data) {
    //             if (data.id) {
    //                 assignModal.close();
    //                 $('[name="search"]').val(data.name);
    //                 //searchExtended(data.name);
    //             }
    //         });
    //     e.preventDefault();
    // });
    // assignModal.show();
  }
}
