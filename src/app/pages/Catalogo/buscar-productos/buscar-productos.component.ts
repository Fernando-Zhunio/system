import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MercadoLibreService } from '../../../services/mercado-libre.service';
import { ProductsService } from '../../../services/products.service';
import { StandartSearchService } from '../../../services/standart-search.service';

@Component({
  selector: 'app-buscar-productos',
  templateUrl: './buscar-productos.component.html',
  styleUrls: ['./buscar-productos.component.css']
})
export class BuscarProductosComponent implements OnInit {

  constructor(private s_standartSearch:StandartSearchService, private s_product: ProductsService,private s_mercado_libre:MercadoLibreService) { }
  @ViewChild("paginator") paginator: MatPaginator;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 15, 25, 100];
  pageEvent: PageEvent;
  products=[];
  isColumns:boolean=true;
  search_name:string = "";
  productSearch:string=null;
  pageCurrent: number = 1;
  hasData:boolean =true;
  selected_state:string = 'all';
  price_min:number = null;
  price_max:number = null;
  aux_page_next = 0;

  // wordSearch:string="";
  ngOnInit(): void {
    this.s_product.searchProduct(this.search_name).subscribe(
      res=>{
        if(res.success){
          console.log(res);
          this.products = res.data.data;
          this.products = res.data.data;
          this.length = res.data.total;
          this.pageSize = res.data.per_page;
          this.pageCurrent = res.data.current_page;
          if(this.products.length < 1){
            this.hasData = false;
          }
        }
      }
    )
  }

  selectEvent(event):void{
    console.log(event.target);
  }

  searchAutocomplete(){
    if(this.search_name.length > 3)
    {
      this.s_product.searchProduct(this.search_name).subscribe(
        res=>{
          console.log(res);
          this.products = res.products.data;
        }
      )
    }
  }


  searchBar():void{
    const pageSize = this.paginator.pageSize;
    console.log(this.pageEvent);
    this.gotoTop();
    this.s_standartSearch
      .search(this.productSearch, pageSize, this.selected_state,this.price_min,this.price_max,'catalogs/products')
      .subscribe((response: any) => {
        console.log(response);
        this.products = response.data.data;
        this.length = response.data.total;
        this.pageSize = response.data.per_page;
        this.pageCurrent = response.data.current_page;
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
    this.s_standartSearch
      .nextPageSearch(
        $event.pageIndex + 1,
        this.productSearch,
        $event.pageSize,
        this.selected_state,
        this.price_min,
        this.price_max,
        'catalogs/products'
      )
      .subscribe((response: any) => {
        console.log(response);
        this.products = response.data.data;
        this.length = response.data.total;
        this.pageSize = response.data.per_page;
        this.pageCurrent = response.data.current_page;
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
  EditPublication(id){

  }
  deletePublication(id,i){

  }
  openDescription(i){
    
  }
}
