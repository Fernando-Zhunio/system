import { Clipboard } from '@angular/cdk/clipboard';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

// import { SwiperOptions } from 'swiper';
import { MatSelect } from '@angular/material/select';
import { animation_conditional } from '../../../../../../animations/animate_leave_enter';
// import { ProductsService } from '../../../../../../services/products.service';
import { MethodsHttpService } from '../../../../../../services/methods-http.service';
// import { HeaderSearchComponent } from '../../../../../../components/header-search/header-search.component';
import { Product } from '../../../../../../interfaces/iproducts';
import { Iwarehouse } from '../../../../../../interfaces/iwarehouse';
import { Iprefix } from '../../../../../../interfaces/iprefix';
import { StockBodegasComponent } from '../../../../../../components/modals/stock-bodegas/stock-bodegas.component';
import { InfoViewComponent } from '../../../../components/info-view/info-view.component';
import { DialogHistoryPricesProductComponent } from '../../components/dialog-history-prices-product/dialog-history-prices-product.component';
import { PERMISSIONS_CATALOG_PRODUCTS } from '../../class/permissions-products';
import { PRODUCT_ROUTE_API_INDEX } from '../../routes-api/products-routes-api';
// import { NgxSearchBarFilter } from 'ngx-search-bar-fz';
import { FormControl, FormGroup } from '@angular/forms';
import { SimpleSearchSelectorService } from '../../../../../../shared/standalone-components/simple-search/simple-search-selector.service';

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
    // private s_product: ProductsService,
    private methodsHttp: MethodsHttpService,
    private dialogSelector: SimpleSearchSelectorService,
  ) {}

  @ViewChild('select_warehouse') select_warehouse: MatSelect;
  // @ViewChild(HeaderSearchComponent) headerComponent: HeaderSearchComponent;

  pathProductIndex = PRODUCT_ROUTE_API_INDEX;

  products: Product[] = [];

  subscription_api: Subscription;
  isLoading: boolean = false;
  prefixes: Iprefix[] = [];
  warehouses: Iwarehouse[] = [];
  search: string;
  permission = PERMISSIONS_CATALOG_PRODUCTS;
  form: FormGroup = new FormGroup({
    min: new FormControl(null),
    max: new FormControl(null),
    prefix_id: new FormControl(null),
    'warehouse_ids[]': new FormControl([]),
  });
  // filter: NgxSearchBarFilter = {
  //   min: {
  //     friendlyName: 'Precio mínimo',
  //     value: null,
  //   },
  //   max: {
  //     friendlyName: 'Precio máximo',
  //     value: null,
  //   },
  //   prefix_id: {
  //     friendlyName: 'Prefijo',
  //     value: null,
  //   },
  //   'warehouse_ids[]': {
  //     friendlyName: 'Bodegas',
  //     value: [],
  //   },
  // }

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

  // getNameWareHouse(id) {
  //   const warehouse = this.warehouses.find((x) => x.id == id);
  //   return warehouse ? warehouse.name : 'Todas las bodegas';
  // }

  // removeWarehouse(id) {
  //   const warehouse = this.filter['warehouse_ids[]'].value as any[];
  //   const index = warehouse.findIndex((x) => x == id);
  //   if (index != -1) {
  //     warehouse.splice(index, 1);
  //     this.select_warehouse.writeValue(this.filter["warehouse_ids[]"]);
  //   }
  // }

  copyCodigo(code) {
    this.clipboard.copy(code);
    this.snack_bar.open('Código ' + code + ' copiado', 'OK', {
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
    if (this.form.get("warehouse_ids[]")?.value?.length > 0) {
      warehouse = {'warehouse_ids[]': this.form.get("warehouse_ids[]")?.value};
    }
    this.methodsHttp.methodGet(`catalogs/products/${this.products[index].id}/stock/ajax`, warehouse)
    .subscribe({
      next: (res) => {
        this.dialog.open(StockBodegasComponent, {
          data: {
            titleOne: 'Bodegas Ventas',
            titleTwo: 'Otras Bodegas',
            data: res,
            warehouse
          },
        });
      },
    })
    // this.s_product.viewWareHouse(, warehouse).subscribe((res) => {
    //   this.dialog.open(StockBodegasComponent, {
    //     data: {
    //       titleOne: 'Bodegas Ventas',
    //       titleTwo: 'Otras Bodegas',
    //       data: res,
    //       warehouse
    //     },
    //   });
    // });
  }

  // changePaginator(event): void {
  //   this.headerComponent.searchBar(event);
  // }

  openDialogHistoryPrices(id: number): void {
    const product = this.products.find((x) => x.id == id);
    if (product) {
      this.dialog.open(DialogHistoryPricesProductComponent, {
        data: { product },
      });
    }
  }

  openDialogWarehouse(): void {
    this.dialogSelector.openDialogSelector({
      isMultiSelection: true,
      path: 'catalogs/warehouses/search',
    })
  }

}
