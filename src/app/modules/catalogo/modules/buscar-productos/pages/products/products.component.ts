import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { SwiperOptions } from 'swiper';
import { MatSelect } from '@angular/material/select';
import { animation_conditional } from '../../../../../../animations/animate_leave_enter';
import { ProductsService } from '../../../../../../services/products.service';
import { MethodsHttpService } from '../../../../../../services/methods-http.service';
import { HeaderSearchComponent } from '../../../../../../components/header-search/header-search.component';
import { Product } from '../../../../../../interfaces/iproducts';
import { Iwarehouse } from '../../../../../../interfaces/iwarehouse';
import { Iprefix } from '../../../../../../interfaces/iprefix';
import { StockBodegasComponent } from '../../../../../../components/modals/stock-bodegas/stock-bodegas.component';
import { InfoViewComponent } from '../../../../components/info-view/info-view.component';
import { DialogHistoryPricesProductComponent } from '../../components/dialog-history-prices-product/dialog-history-prices-product.component';
import { PERMISSIONS_CATALOG_PRODUCTS } from '../../class/permissions-products';
import { PRODUCT_ROUTE_API_INDEX } from '../../routes-api/products-routes-api';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
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

  pathProductIndex = PRODUCT_ROUTE_API_INDEX;

  products: Product[] = [];

  subscription_api: Subscription;
  isLoading: boolean = false;
  prefixes: Iprefix[] = [];
  warehouses: Iwarehouse[] = [];
  search: string;
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
  permission = PERMISSIONS_CATALOG_PRODUCTS;
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
        if (res?.success) {
          this.prefixes = res.data.prefixes;
          this.warehouses = res.data.warehouses;
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
  }

  getData($event): void {
    this.products = $event;
  }

  openDescription(id: number): void {
    const product = this.products.find((x) => x.id == id);
    if (product) {
      this.dialog.open(InfoViewComponent, {
        data: { name: product.name, title:'Descripción', info: product.description , isHtml:false },
      });
    }
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
