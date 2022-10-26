import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { SwiperOptions } from 'swiper';
import { MatSelect } from '@angular/material/select';
import { animation_conditional } from '../../../../../../animations/animate_leave_enter';
import { ProductsService } from '../../../../../../services/products.service';
import { MethodsHttpService } from '../../../../../../services/methods-http.service';
import { HeaderSearchComponent } from '../../../../../../components/header-search/header-search.component';
import { IproductWithVtex } from '../../../../../../interfaces/iproducts';
import { Iwarehouse } from '../../../../../../interfaces/iwarehouse';
import { Iprefix } from '../../../../../../interfaces/iprefix';
import { Ipagination } from '../../../../../../interfaces/ipagination';
import { Permission_catalog_products } from '../../../../../../class/permissions-modules';
import { StockBodegasComponent } from '../../../../../../components/modals/stock-bodegas/stock-bodegas.component';
import { InfoViewComponent } from '../../../../components/info-view/info-view.component';
import { DialogHistoryPricesProductComponent } from '../../components/dialog-history-prices-product/dialog-history-prices-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: animation_conditional
})
export class ProductsComponent implements OnInit {
  constructor(
    private clipboard: Clipboard,
    private snack_bar: MatSnackBar,
    private dialog: MatDialog,
    private s_product: ProductsService,
    private methodsHttp: MethodsHttpService,
  ) {}

  @ViewChild('select_warehouse') select_warehouse: MatSelect;
  @ViewChild(HeaderSearchComponent) headerComponent: HeaderSearchComponent;

  pageSizeOptions: number[] = [10, 15, 25, 100];
  pageEvent: PageEvent;

  products: IproductWithVtex[] = [];
  selected_state: string = 'all';
  aux_page_next = 0;

  suscrition_api: Subscription;
  isLoading: boolean = false;
  prefixes: Iprefix[] = [];
  warehouses: Iwarehouse[] = [];
  paginator: Ipagination<IproductWithVtex>;
  search: string;
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
  permission = Permission_catalog_products;
  filter: any = {
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
    const index = this.filter['warehouse_ids[]']?.findIndex((x) => x == id);
    if (index != -1) {
      this.filter['warehouse_ids[]'].splice(index, 1);
      this.select_warehouse.writeValue(this.filter["warehouse_ids[]"]);
    }
  }

  copyCodigo(code) {
    this.clipboard.copy(code);
    this.snack_bar.open('Codigo ' + code + ' copiado', 'OK', {
      duration: 2000,
    });
    return code;
  }

  loadData($event): void {
    this.products = $event;
  }

  openDescription(i) {
    const name = this.products[i].name;
    const info = this.products[i].description;
    this.dialog.open(InfoViewComponent, {
      data: { name, title:'Descripción', info, isHtml:false },
    });
  }


  viewWareHouse(index) {
    let warehouse = {};
    if ((this.filter["warehouse_ids[]"] as any)?.length > 0) {
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

  changePaginator(event): void {
    this.headerComponent.searchBar(event);
  }

  openDialogHistoryPrices(id: number): void {
    const product = this.products.find((x) => x.id == id);
    if (product) {
      this.dialog.open(DialogHistoryPricesProductComponent, {
        data: { product },
      });
    }
  }

}
