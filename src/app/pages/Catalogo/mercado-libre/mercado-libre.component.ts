import { Component, OnInit, ViewChild } from "@angular/core";
import { MercadoLibreService } from "../../../services/mercado-libre.service";
import { MatPaginator, PageEvent } from "@angular/material/paginator";

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
  price_min:number = null;
  price_max:number = null;
  aux_page_next = 0;
  hasData:boolean =true;
  
  constructor(private s_mercado_libre: MercadoLibreService) {}

  products = [];
  ngOnInit(): void {
    this.s_mercado_libre.index(1, 10).subscribe((res) => {
      console.log(res);
      // this.products = res.products.data;
      this.products = res.products.data;
      this.length = res.products.total;
      this.pageSize = res.products.per_page;
      this.pageCurrent = res.products.current_page;
      if(this.products.length < 1){
        this.hasData = false;
      }
      // this.pageEvent.length = 10;
      // this.pageEvent.pageIndex = 0;
      // this.pageEvent.pageSize = 10;
    });
    // this.pageEvent. = length;
  }

  searchBar() {
    const pageSize = this.paginator.pageSize;
    console.log(this.pageEvent);
    // if($event.pageIndex != this.aux_page_next){
      // window.scrollTo(0,0);
      this.gotoTop();
      console.log('scroll');
      // scrollTo(0,0);
      // this.aux_page_next = $event.pageIndex;
    // }
    this.s_mercado_libre
      .search(this.productSearch, pageSize, this.selected_state,this.price_min,this.price_max)
      .subscribe((response: any) => {
        console.log(response);
        this.products = response.products.data;
        this.length = response.products.total;
        this.pageSize = response.products.per_page;
        this.pageCurrent = response.products.current_page;
        if(this.products.length < 1){
          this.hasData = false;
        }
        else this.hasData =true;
      });
  }

  changedPaginator($event) {
    this.pageSize = $event;
    console.log($event);
    if($event.pageIndex != this.aux_page_next){
      // window.scrollTo(0,0);
      this.gotoTop();
      console.log('scroll');
      // scrollTo(0,0);
      this.aux_page_next = $event.pageIndex;
    }
    this.s_mercado_libre
      .nextPageSearch(
        $event.pageIndex + 1,
        this.productSearch,
        $event.pageSize,
        this.selected_state,
        this.price_min,
        this.price_max
      )
      .subscribe((response: any) => {
        console.log(response);
        this.products = response.products.data;
        this.length = response.products.total;
        this.pageSize = response.products.per_page;
        this.pageCurrent = response.products.current_page;
        if(this.products.length < 1){
          this.hasData = false;
        } else this.hasData = true;
      });
  }
  gotoTop() {
    const main =document.getElementsByClassName("app-body")
    main[0].scrollTop = 0;
  }
  executeMenu(event ): void {
    console.log(event);
    
    // active,paused,closed,deleted,relist_forever_on,relist_forever_off
    // switch (type) {
    //   case "active":
    //     break;
    //   case "paused":
    //     break;
    //   case "closed":
    //     break;
    //   case "deleted":
    //     break;
    //   case "relist_forever_on":
    //     break;
    //   case "relist_forever_off":
    //     break;

    //   default:
    //     break;
    // }
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
