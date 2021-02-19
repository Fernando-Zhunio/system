import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxPermissionsService } from 'ngx-permissions';
import { InfoViewComponent } from '../../../components/modals/info-view/info-view.component';
import { StockBodegasComponent } from '../../../components/modals/stock-bodegas/stock-bodegas.component';
import { MercadoLibreService } from '../../../services/mercado-libre.service';
import { PrefijoService } from '../../../services/prefijo.service';
import { ProductsService } from '../../../services/products.service';
import { StandartSearchService } from '../../../services/standart-search.service';

@Component({
  selector: 'app-buscar-productos',
  templateUrl: './buscar-productos.component.html',
  styleUrls: ['./buscar-productos.component.css']
})
export class BuscarProductosComponent implements OnInit {

  constructor(private s_prefijos:PrefijoService,private s_permissionsService: NgxPermissionsService, private snack_bar:MatSnackBar, private s_standartSearch:StandartSearchService,private dialog:MatDialog, private s_product: ProductsService,private s_mercado_libre:MercadoLibreService) { }
  @ViewChild("paginator") paginator: MatPaginator;
  permission_edit = ['super-admin','products-admin.products.edit'];
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
  min:number = null;
  max:number = null;
  aux_page_next = 0;
  isload:boolean = false;
  prefixes = [];
  // wordSearch:string="";
  ngOnInit(): void {
    this.gotoTop();
   this.isload = true;
    this.s_product.searchProduct(this.search_name).subscribe(
      res=>{
        this.isload =false;
        // const perm = ["ADMIN","catalogs.publications.edit","catalogs.products.ml.relist"];
        // this.s_permissionsService.loadPermissions(perm);
        if(res.success){
          console.log(res);
          this.products = res.data.data;
          this.products = res.data.data;
          this.length = res.data.total;
          this.pageSize = res.data.per_page;
          this.pageCurrent = res.data.current_page;
          if(this.products.length < 1){
            this.hasData = false;
          }else this.hasData = true;
        }
      },
      err=>{
        this.isload =false;
      }
    )
    this.s_prefijos.getAll().subscribe((response: any) => {
      console.log(response);
      this.prefixes = response.prefixes;
      
    });
  }

  // selectEvent(event):void{
  //   console.log(event.target);
  // }

  // searchAutocomplete(){
  //   if(this.search_name.length > 3)
  //   {

  //     this.s_product.searchProduct(this.search_name).subscribe(
  //       res=>{
  //         console.log(res);
  //         this.products = res.products.data;
  //       }
  //     )
  //   }
  // }


  searchBar():void{
    const pageSize = (this.pageSize)?this.pageSize:10;
    this.isload = true
    // console.log(this.pageEvent);
    this.gotoTop();
    this.s_standartSearch
      .search(this.productSearch, pageSize, this.selected_state,this.min,this.max,'catalogs/products')
      .subscribe((response: any) => {
        this.isload =false;
        console.log(response);
        this.products = response.data.data;
        this.length = response.data.total;
        this.pageSize = response.data.per_page;
        this.pageCurrent = response.data.current_page;
        if(this.products.length < 1){
          this.hasData = false;
        }
        else this.hasData =true;
      },err=>{
        this.isload =false;
      });
  }

  changedPaginator($event) {
    this.pageSize = $event.pageSize;
    this.isload =true;
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
        this.min,
        this.max,
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
        this.isload =false
      },
      err=>{
        this.isload =false;
      });
  }
  gotoTop() {
    const main =document.getElementsByClassName("app-body")
    main[0].scrollTop = 0;
  }

  // executeMenu(event ): void {
  //   console.log(event);
    
  //   // active,paused,closed,deleted,relist_forever_on,relist_forever_off
  //   // switch (type) {
  //   //   case "active":
  //   //     break;
  //   //   case "paused":
  //   //     break;
  //   //   case "closed":
  //   //     break;
  //   //   case "deleted":
  //   //     break;
  //   //   case "relist_forever_on":
  //   //     break;
  //   //   case "relist_forever_off":
  //   //     break;

  //   //   default:
  //   //     break;
  //   // }

  //   const snack = this.snack_bar.open("Cambiando estado espere...")
  //   this.s_mercado_libre.updateStatus(event.id, event.type).subscribe((res) => {
  //     console.log(res);
  //     if (res.success) {
  //       snack.dismiss();
  //       this.snack_bar.open("Estado cambiado con exito","Exito",{duration :2000})
  //       const indice = this.products.findIndex((x) => x.id == event.id);
  //       this.products[indice] = res.ml;
  //       console.log(this.products[indice]);
        
  //     }
  //   },err=>{
  //     snack.dismiss();
  //     this.snack_bar.open("Ups! Ocurrio un error","Error",{duration :2000})
  //   });
  // }

  EditPublication(id){

  }
  deletePublication(id,i){

  }
  openDescription(i){
    const name = this.products[i].name;
    const info = this.products[i].description;
    // console.log(description);
    this.s_standartSearch.openDescription(name,'Descripcion',info,false)
  }

  viewWareHouse(index){
    this.s_product.viewWareHouse(this.products[index].id).subscribe(res=>{
      console.log(res);
      this.dialog.open(StockBodegasComponent,{
        data:{titleOne:"Bodegas Ventas",titleTwo:"Otras Bodegas",data:res}
      })
    })
  }
}
