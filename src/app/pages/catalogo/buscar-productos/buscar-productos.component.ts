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

import { SwiperOptions } from 'swiper';
import { MatSelect } from '@angular/material/select';
import { Ipagination } from '../../../interfaces/ipagination';
import { HeaderSearchComponent } from '../../../components/header-search/header-search.component';

import { animation_conditional } from '../../../animations/animate_leave_enter';
import { search_product_permission_module } from '../../../class/permissions-modules/search-products-permissions';
import { MethodsHttpService } from '../../../services/methods-http.service';
import { InfoViewComponent } from '../../../components/modals/info-view/info-view.component';

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
    // private s_standartSearch: StandartSearchService,
    private dialog: MatDialog,
    private s_product: ProductsService,
    private methodsHttp: MethodsHttpService,
  ) {}

  @ViewChild('select_warehouse') select_warehouse: MatSelect;
  @ViewChild(HeaderSearchComponent) headerComponent: HeaderSearchComponent;
  @ViewChild(MatDrawer) drawer: MatDrawer;

  pageSizeOptions: number[] = [10, 15, 25, 100];
  pageEvent: PageEvent;

  products: IproductWithVtex[] = [];
  selected_state: string = 'all';
  // min: string = '';
  // max: string = '';
  aux_page_next = 0;

  post_current: IpostProduct;
  suscrition_api: Subscription;
  isLoading: boolean = false;
  prefixes: Iprefix[] = [];
  warehouses: Iwarehouse[] = [];
  paginator: Ipagination<IproductWithVtex>;
  // prefix_id: string = 'all';
  // warehouse_ids = [];
  search: string;
  messagePost: string = 'Cargando post espere por favor...';
  isLoadPost: boolean = false;
  current_go: number;
  is_open_go: boolean = false;
  icon_go: 'segment'|'close' = 'segment';
  config: SwiperOptions = {
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
    scrollbar: false,
    pagination: false,
  };
  permission = search_product_permission_module;
  filter = {
    min: null,
    max: null,
    'warehouse_ids[]': null,
    prefix_id: null,
  }

  ngOnInit(): void {
    this.methodsHttp
      .methodGet('catalogs/products/get-data-filter')
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
    const index = this.filter['warehouse_ids[]'].findIndex((x) => x == id);
    if (index != -1) {
      this.filter['warehouse_ids[]'].splice(index, 1);
      this.select_warehouse.writeValue(this.filter["warehouse_ids[]"]);
    }
  }

  selectAllWarehouse($event) {
    const index = $event.value.findIndex((x) => x == 'all');
  }

  copyCodigo(code) {
    this.clipboard.copy(code);
    this.snack_bar.open('Codigo ' + code + ' copiado', 'OK', {
      duration: 2000,
    });
    return code;
  }

  loadData($event): void {
    console.log($event);
    // this.paginator = $event.data;
    // this.products = this.paginator.data;
    this.products = $event;
  }

  openDescription(i) {
    const name = this.products[i].name;
    const info = this.products[i].description;
    this.dialog.open(InfoViewComponent, {
      data: { name, title:'Descripción', info, isHtml:false },
    });
    // this.s_standartSearch.openDescription(name, 'Descripción', info, false);
  }

  viewWareHouse(index) {
    let warehouse = {};
    if (this.filter["warehouse_ids[]"]?.length > 0) {
      warehouse = {'warehouse_ids[]': this.filter["warehouse_ids[]"]};
    }
    this.s_product.viewWareHouse(this.products[index].id, warehouse).subscribe((res) => {
      this.dialog.open(StockBodegasComponent, {
        data: {
          titleOne: 'Bodegas Ventas',
          titleTwo: 'Otras Bodegas',
          data: res,
          warehouse
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
          this.methodsHttp
            .methodGet('catalogs/products/' + id + '/social-post')
            .subscribe((res2: { success: boolean; data: IpostProduct }) => {
              this.post_current = res2.data;
              this.isLoadPost = true;
            });
        }
      },
      (err) => {
        this.messagePost =
          'Ups! ocurrió un problema al cargar el post inténtalo otra vez';
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
    if (this.current_go == id) {return; }
    const element = document.getElementById(id);
    element.classList.remove('anim-go');

    this.current_go = id;
    const forScroll = document.getElementsByClassName('app-body')
    const dist = element.getBoundingClientRect().y;
    const current_position = forScroll[0].scrollTop;
    const viewHeight = window.screen.height;
    const go = dist + current_position - (viewHeight / 2);
    forScroll[0].scrollTop = go;
    element.classList.add('anim-go');
  }

  openOrCloseGo(){
    this.is_open_go = !this.is_open_go;
    if (this.is_open_go) {
      this.icon_go = 'close';
    } else {
      this.icon_go = 'segment';
    }
  }

}
