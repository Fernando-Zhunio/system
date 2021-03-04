import { Clipboard } from "@angular/cdk/clipboard";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatDrawer, MatSidenav } from "@angular/material/sidenav";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Subscription } from "rxjs";
// import { NgxPermissionsService } from 'ngx-permissions';
// import { InfoViewComponent } from '../../../components/modals/info-view/info-view.component';
import { StockBodegasComponent } from "../../../components/modals/stock-bodegas/stock-bodegas.component";
import { IpostProduct } from "../../../interfaces/ipost-product";
import { Iprefix } from "../../../interfaces/iprefix";
import { Iproduct2 } from "../../../interfaces/iproducts";
import { Iwarehouse } from "../../../interfaces/iwarehouse";
// import { MercadoLibreService } from '../../../services/mercado-libre.service';
import { PrefijoService } from "../../../services/prefijo.service";
import { ProductsService } from "../../../services/products.service";
import { StandartSearchService } from "../../../services/standart-search.service";
import { SwalService } from "../../../services/swal.service";

@Component({
  selector: "app-buscar-productos",
  templateUrl: "./buscar-productos.component.html",
  styleUrls: ["./buscar-productos.component.css"],
})
export class BuscarProductosComponent implements OnInit {
  constructor(
    private clipboard: Clipboard,
    private snack_bar: MatSnackBar,
    private s_standartSearch: StandartSearchService,
    private dialog: MatDialog,
    private s_product: ProductsService
  ) {}
  @ViewChild("paginator") paginator: MatPaginator;
  permission_edit = ["super-admin", "products-admin.products.edit"];
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 15, 25, 100];
  pageEvent: PageEvent;
  products: Iproduct2[] = [];
  isColumns: boolean = true;
  search_name: string = "";
  productSearch: string = null;
  pageCurrent: number = 1;
  hasData: boolean = true;
  selected_state: string = "all";
  min: number = null;
  max: number = null;
  aux_page_next = 0;

  post_current:IpostProduct;

  suscrition_api: Subscription;
  isload: boolean = false;
  prefixes: Iprefix[] = [];
  warehouses: Iwarehouse[] = [];
  form_filter: FormGroup = new FormGroup({
    prefix_id: new FormControl('all'),
    min: new FormControl(''),
    max: new FormControl(''),
    warehouse_ids: new FormControl(['all']),
    search: new FormControl(''),
  });
  // wordSearch:string="";

  breakpoints = {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 5
    },
    // when window width is >= 480px
    480: {
      slidesPerView: 1,
      spaceBetween: 5
    },
    // when window width is >= 640px
    600: {
      slidesPerView: 3,
      spaceBetween: 10
    },
    800: {
      slidesPerView: 4,
      spaceBetween: 10
    }
  }
  ngOnInit(): void {
    this.gotoTop();
    this.isload = true;
    if (this.suscrition_api) {
      this.suscrition_api.unsubscribe();
    }
    this.suscrition_api = this.s_product
      .searchProduct(this.search_name)
      .subscribe(
        (res) => {
          this.isload = false;
          if (res.success) {
            console.log(res);
            // this.products = res.data.data;
            this.products = res.data.data;
            this.length = res.data.total;
            this.pageSize = res.data.per_page;
            this.pageCurrent = res.data.current_page;
            if (this.products.length < 1) {
              this.hasData = false;
            } else this.hasData = true;
          }
        },
        (err) => {
          this.isload = false;
        }
      );

    this.s_standartSearch
      .show("catalogs/products/get-data-filter")
      .subscribe((res) => {
        console.log(res);
        if (res.success) {
          this.prefixes = res.data.prefixes;
          this.warehouses = res.data.warehouses;
        }
      });
    // this.s_prefijos.getAll().subscribe((response: any) => {
    //   console.log(response);
    //   this.prefixes = response.prefixes;
    // });
  }

  getNameWareHouse(id) {
    const warehouse = this.warehouses.find((x) => x.id == id);
    // if(warehouse == undefined){
    //   this.form_filter.get('warehouse_ids').setValue(["all"]);
    // }
    return warehouse?warehouse.name:"Todas las bodegas"
  }
  
  removeWarehouse(id) {
    let warehouses = this.form_filter.get("warehouse_ids").value;
    // console.log(accounts, id);
    const index = warehouses.findIndex((x) => x == id);
    if (index != -1) {
      warehouses.splice(index, 1);
      this.form_filter.get("warehouse_ids").setValue(warehouses);
    }
  }

  selectAllWarehouse($event){
    const index = $event.value.findIndex(x =>x =="all");
    if(index != -1 ){
      this.form_filter.get("warehouse_ids").setValue(['all']);
    }
    if(index != -1 && $event.value.length > 1){
      let warehouses = this.form_filter.get("warehouse_ids").value;
      warehouses.splice(index, 1);
      this.form_filter.get("warehouse_ids").setValue(warehouses);
      return;
    }
    console.log($event,index);
    // this.form_filter.get('warehouse_ids').setValue(["all"]);
  }
  searchBar($event = { pageSize: 15, pageIndex: 0 }) {
    this.pageSize = $event.pageSize;
    this.isload = true;
    console.log($event);
    this.gotoTop();
    if (this.suscrition_api) {
      this.suscrition_api.unsubscribe();
      console.log("cancelado llamado");
    }
    this.suscrition_api = this.s_standartSearch
      // .search(this.productSearch, pageSize, this.selected_state,this.min,this.max,'catalogs/products')
      .search2("catalogs/products", {
        page: $event.pageIndex + 1,
        pageSize: this.pageSize,
        ...this.form_filter.value,
      })
      .subscribe(
        (response: any) => {
          this.isload = false;
          // console.log(response);
          this.products = response.data.data;
          this.length = response.data.total;
          this.pageSize = response.data.per_page;
          this.pageCurrent = response.data.current_page;
          if (this.products.length < 1) {
            this.hasData = false;
          } else this.hasData = true;
        },
        (err) => {
          this.isload = false;
        }
      );
  }

  // changedPaginator($event = { pageSize: 15, pageIndex: 0 }) {
  //   this.pageSize = $event.pageSize;
  //   this.isload = true;
  //   console.log($event);
  //   return;
  //   if ($event.pageIndex != this.aux_page_next) {
  //     this.gotoTop();
  //     console.log("scroll");
  //     this.aux_page_next = $event.pageIndex;
  //   }
  //   this.s_standartSearch
  //     .nextPageSearch(
  //       $event.pageIndex + 1,
  //       this.productSearch,
  //       $event.pageSize,
  //       this.selected_state,
  //       this.min,
  //       this.max,
  //       "catalogs/products"
  //     )
  //     .subscribe(
  //       (response: any) => {
  //         console.log(response);
  //         this.products = response.data.data;
  //         this.length = response.data.total;
  //         this.pageSize = response.data.per_page;
  //         this.pageCurrent = response.data.current_page;
  //         if (this.products.length < 1) {
  //           this.hasData = false;
  //         } else this.hasData = true;
  //         this.isload = false;
  //       },
  //       (err) => {
  //         this.isload = false;
  //       }
  //     );
  // }
  gotoTop() {
    const main = document.getElementsByClassName("app-body");
    main[0].scrollTop = 0;
  }

  copyCodigo(code) {
    this.clipboard.copy(code);
    // SwalService.swalToast("Codigo: "+code+" copiado","success")
    this.snack_bar.open("Codigo " + code + " copiado", "OK", {
      duration: 2000,
    });
    return code;
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

  EditPublication(id) {}
  deletePublication(id, i) {}
  openDescription(i) {
    const name = this.products[i].name;
    const info = this.products[i].description;
    // console.log(description);
    this.s_standartSearch.openDescription(name, "Descripcion", info, false);
  }

  viewWareHouse(index) {
    this.s_product.viewWareHouse(this.products[index].id).subscribe((res) => {
      console.log(res);
      this.dialog.open(StockBodegasComponent, {
        data: {
          titleOne: "Bodegas Ventas",
          titleTwo: "Otras Bodegas",
          data: res,
        },
      });
    });
  }

  @ViewChild(MatDrawer) drawer:MatDrawer
  messagePost:string = "Cargando post espere por favor..."
  isLoadPost:boolean = false;
  viewPost(id=null):void{
    this.isLoadPost = false;
    this.messagePost = "Cargando post espere por favor..."

    this.drawer.toggle().then(res=>{
      console.log(res);
      if(res == "open"){
        this.s_standartSearch.show("catalogs/products/"+id+"/social-post").subscribe((res2:{success:boolean,data:IpostProduct})=>{
          this.post_current = res2.data;
          console.log(this.post_current);
          this.isLoadPost = true;
        })
      }
      
    },err=>{
      this.messagePost = "Ups! ocurrio un problema al cargar el post intentalo otra vez"
    });
  }

  verMas():void{
    
  }
}
