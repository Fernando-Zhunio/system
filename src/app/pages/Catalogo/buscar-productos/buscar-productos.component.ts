import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { StockBodegasComponent } from '../../../components/modals/stock-bodegas/stock-bodegas.component';
import { IpostProduct } from '../../../interfaces/ipost-product';
import { Iprefix } from '../../../interfaces/iprefix';
import { IproductWithVtex } from '../../../interfaces/iproducts';
import { Iwarehouse } from '../../../interfaces/iwarehouse';
import { ProductsService } from '../../../services/products.service';
import { StandartSearchService } from '../../../services/standart-search.service';

// import Swiper from 'swiper';
import { SwiperOptions } from 'swiper';
import { MatSelect } from '@angular/material/select';
import { Ipagination } from '../../../interfaces/ipagination';
import { HeaderSearchComponent } from '../../../components/header-search/header-search.component';
import { IpermissionStandart } from '../../../interfaces/ipermission-standart';
import { ActivatedRoute } from '@angular/router';
import { NgxMasonryOptions } from 'ngx-masonry';
import { animation_conditional } from '../../../animations/animate_leave_enter';

@Component({
  selector: 'app-buscar-productos',
  templateUrl: './buscar-productos.component.html',
  styleUrls: ['./buscar-productos.component.css'],
  animations: animation_conditional
})
export class BuscarProductosComponent implements OnInit {
  constructor(
    private clipboard: Clipboard,
    private snack_bar: MatSnackBar,
    private s_standartSearch: StandartSearchService,
    private dialog: MatDialog,
    private s_product: ProductsService,
    private actived_router: ActivatedRoute,
  ) {}

  @ViewChild('select_warehouse') select_warehouse: MatSelect;
  @ViewChild(HeaderSearchComponent) headerComponent: HeaderSearchComponent;

  permission_edit = ['super-admin', 'products-admin.products.edit'];
  pageSizeOptions: number[] = [10, 15, 25, 100];
  pageEvent: PageEvent;

  products: IproductWithVtex[] = [];
  selected_state: string = 'all';
  min: string = '';
  max: string = '';
  aux_page_next = 0;

  masonryOptions: NgxMasonryOptions = {
    // columnWidth: 300,
    gutter: 10,
    // percentPosition: true,
    // stamp: string;
    // fitWidth: true,
    // originLeft: boolean;
    // originTop: boolean;
    // containerStyle: string;
    // resize: true,
    // initLayout: boolean;
    // horizontalOrder: boolean;
    // animations: NgxMasonryAnimations;
  };

  post_current: IpostProduct;
  suscrition_api: Subscription;
  isLoading: boolean = false;
  prefixes: Iprefix[] = [];
  warehouses: Iwarehouse[] = [];
  paginator: Ipagination<IproductWithVtex>;
  prefix_id: string = 'all';
  warehouse_ids = [];
  search: string;
  @ViewChild(MatDrawer) drawer: MatDrawer;
  messagePost: string = 'Cargando post espere por favor...';
  isLoadPost: boolean = false;
  current_go: number;
  is_open_go: boolean = false;
  icon_go: 'segment'|'close' = 'segment';
  public config: SwiperOptions = {
    direction: 'horizontal',
    spaceBetween: 10,
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 5,
      },
      480: {
        slidesPerView: 1,
        spaceBetween: 5,
      },
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
    scrollbar: true,
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
        } else {

        }
      });
  }

  getNameWareHouse(id) {
    const warehouse = this.warehouses.find((x) => x.id == id);
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
    let warehouse = {};
    if (this.warehouse_ids.length > 0) {
      warehouse = {'warehouse_ids[]': this.warehouse_ids};
    }
    this.s_product.viewWareHouse(this.products[index].id, warehouse).subscribe((res) => {
      this.dialog.open(StockBodegasComponent, {
        data: {
          titleOne: 'Bodegas Ventas',
          titleTwo: 'Otras Bodegas',
          data: res,
        },
      });
    });
  }

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


  goSpy(id) {
    if (this.current_go == id) return;
    let element = document.getElementById(id);
    element.classList.remove('anim-go');

    this.current_go = id;
    const forScroll = document.getElementsByClassName('app-body')
    const dist = element.getBoundingClientRect().y;
    const current_position = forScroll[0].scrollTop;
    const viewHeigth = window.screen.height;
    const go = dist + current_position - (viewHeigth / 2);
    forScroll[0].scrollTop = go;
    element.classList.add('anim-go');
  }

  openOrCloseGo(){
    this.is_open_go = !this.is_open_go;
    if (this.is_open_go){
      this.icon_go = 'close'
    }
    else{
      this.icon_go = 'segment';
    }
  }

}
