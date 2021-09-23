import { Clipboard } from '@angular/cdk/clipboard';
import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { StockBodegasComponent } from '../../../components/modals/stock-bodegas/stock-bodegas.component';
import { IpostProduct } from '../../../interfaces/ipost-product';
import { Iprefix } from '../../../interfaces/iprefix';
import { Iproduct2, IproductWithVtex } from '../../../interfaces/iproducts';
import { Iwarehouse } from '../../../interfaces/iwarehouse';
import { ProductsService } from '../../../services/products.service';
import { StandartSearchService } from '../../../services/standart-search.service';
import { SwalService } from '../../../services/swal.service';
// import Swiper from 'swiper';
import { SwiperOptions } from 'swiper';
import { MatSelect } from '@angular/material/select';
import { Ipagination } from '../../../interfaces/ipagination';
import { HeaderSearchComponent } from '../../../components/header-search/header-search.component';
import { IpermissionStandart } from '../../../interfaces/ipermission-standart';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-buscar-productos',
  templateUrl: './buscar-productos.component.html',
  styleUrls: ['./buscar-productos.component.css'],
})
export class BuscarProductosComponent implements OnInit {
  constructor(
    private clipboard: Clipboard,
    private snack_bar: MatSnackBar,
    private s_standartSearch: StandartSearchService,
    private dialog: MatDialog,
    private s_product: ProductsService,
    private actived_router: ActivatedRoute,
    private router:Router
  ) {


  }
  @ViewChild('select_warehouse') select_warehouse: MatSelect;
  @ViewChild(HeaderSearchComponent) headerComponent: HeaderSearchComponent;

  permission_edit = ['super-admin', 'products-admin.products.edit'];
  // length = 100;
  // pageSize = 10;
  pageSizeOptions: number[] = [10, 15, 25, 100];
  pageEvent: PageEvent;
  // products: Iproduct2[] = [];
  products: IproductWithVtex[] = [];
  // isColumns: boolean = true;
  // search_name: string = "";
  // productSearch: string = null;
  // pageCurrent: number = 1;
  // hasData: boolean = true;
  selected_state: string = 'all';
  min: string='';
  max: string='';
  aux_page_next = 0;

  post_current: IpostProduct;

  suscrition_api: Subscription;
  isload: boolean = false;
  prefixes: Iprefix[] = [];
  warehouses: Iwarehouse[] = [];

  paginator: Ipagination<IproductWithVtex>;
  prefix_id: string = 'all';
  warehouse_ids = [];
  search: string;

  public config: SwiperOptions = {
    // a11y: { enabled: true },
    direction: 'horizontal',
    spaceBetween: 10,
    // slidesPerView: 4,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 5,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 1,
        spaceBetween: 5,
      },
      // when window width is >= 640px
      601: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      950: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
    },
    // keyboard: true,
    // mousewheel: true,
    scrollbar: true,
    // navigation: true,
    pagination: false,
  };
  permission_page: IpermissionStandart;
  ngOnInit(): void {
    this.actived_router.data.subscribe((res) => {
      this.permission_page = res.permissions.all;
    });

    this.s_standartSearch
      .show('catalogs/products/get-data-filter')
      .subscribe((res) => {
        if (res.success && res.hasOwnProperty('success') && res.success) {
          this.prefixes = res.data.prefixes;
          this.warehouses = res.data.warehouses;
        }
        else {

        }
      });
  }

  getNameWareHouse(id) {
    const warehouse = this.warehouses.find((x) => x.id == id);
    // if(warehouse == undefined){
    //   this.form_filter.get('warehouse_ids').setValue(["all"]);
    // }
    return warehouse ? warehouse.name : 'Todas las bodegas';
  }

  removeWarehouse(id) {

    const index = this.warehouse_ids.findIndex((x) => x == id);
    if (index != -1) {
      this.warehouse_ids.splice(index, 1);
      this.select_warehouse.writeValue(this.warehouse_ids);
    }
  }

  selectAllWarehouse($event) {
    const index = $event.value.findIndex((x) => x == 'all');
  }

  copyCodigo(code) {
    this.clipboard.copy(code);
    // SwalService.swalToast("Codigo: "+code+" copiado","success")
    this.snack_bar.open('Codigo ' + code + ' copiado', 'OK', {
      duration: 2000,
    });
    return code;
  }

  loadData($event): void {
    this.paginator = $event.data;
    this.products = this.paginator.data;
  }

  openDescription(i) {
    const name = this.products[i].name;
    const info = this.products[i].description;
    this.s_standartSearch.openDescription(name, 'Descripcion', info, false);
  }

  viewWareHouse(index) {
    this.s_product.viewWareHouse(this.products[index].id).subscribe((res) => {
      this.dialog.open(StockBodegasComponent, {
        data: {
          titleOne: 'Bodegas Ventas',
          titleTwo: 'Otras Bodegas',
          data: res,
        },
      });
    });
  }

  @ViewChild(MatDrawer) drawer: MatDrawer;
  messagePost: string = 'Cargando post espere por favor...';
  isLoadPost: boolean = false;
  viewPost(id = null): void {
    this.isLoadPost = false;
    this.messagePost = 'Cargando post espere por favor...';

    this.drawer.toggle().then(
      (res) => {
        if (res == 'open') {
          this.s_standartSearch
            .show('catalogs/products/' + id + '/social-post')
            .subscribe((res2: { success: boolean; data: IpostProduct }) => {
              this.post_current = res2.data;
              this.isLoadPost = true;
            });
        }
      },
      (err) => {
        this.messagePost =
          'Ups! ocurrio un problema al cargar el post intentalo otra vez';
      }
    );
  }

  changePaginator(event): void {
    this.headerComponent.searchBar(event);
  }

  applyFilter() {
    this.headerComponent.searchBar();
  }

  current_go:number;
  is_open_go:boolean = false;
  icon_go:'segment'|'close'= 'segment';

  goSpy(id) {
    if(this.current_go == id) return;
    let element = document.getElementById(id);
    element.classList.remove('anim-go');

    this.current_go = id;
    const forScroll =document.getElementsByClassName('app-body')
    const dist = element.getBoundingClientRect().y;
    const current_position = forScroll[0].scrollTop;
    const viewHeigth = window.screen.height;
    const go = dist +current_position-(viewHeigth/2);
    forScroll[0].scrollTop = go;
    element.classList.add('anim-go');
  }

  openOrCloseGo(){
    this.is_open_go = !this.is_open_go;
    if(this.is_open_go){
      this.icon_go = 'close'
    }
    else{
      this.icon_go = 'segment';
    }
  }

}
