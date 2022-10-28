// import { HttpEventType } from '@angular/common/http';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
// import { MatDialog } from '@angular/material/dialog';
// import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
// import { Store } from '@ngrx/store';
import { FilePondOptions } from 'filepond';
import {  Subscription } from 'rxjs';
import { environment } from '../../../../../../../environments/environment';
import { animation_conditional } from '../../../../../../animations/animate_leave_enter';
// import { Crud } from '../../../../../class/crud';
import { Permission_products_prices } from '../../../../../../class/permissions-modules';
// import { prices_permission_module } from '../../../../class/permissions-modules/prices-permissions';
// import { INotificationData } from '../../../../../interfaces/inotification';
import { IProductPrice } from '../../../../../../interfaces/iprice';
// import { downloadPrice, generatingPrice, idlePrice } from '../../../../../redux/actions/price.action';
// import { EPriceState } from '../../../../../redux/reducers/price.reducer';
// import { selectPrice } from '../../../../../redux/state/state.selectors';
import { MethodsHttpService } from '../../../../../../services/methods-http.service';
// import { SharedService } from '../../../../../services/shared/shared.service';
import { StorageService } from '../../../../../../services/storage.service';
import { SwalService } from '../../../../../../services/swal.service';
import { MatTableHelper } from '../../../../../../shared/class/mat-table-helper';
import { CreateOrEditPricesButtonSheetComponent } from '../../components/create-or-edit-prices-button-sheet/create-or-edit-prices-button-sheet.component';
import { PriceGroup } from '../../interfaces/price-group';
import { PRICE_ROUTE_API_GROUP_PRICE, PRICE_ROUTE_API_INDEX } from '../../routes-api/prices-routes-api';
import { ModalListPricesComponent } from '../../tools/modal-list-prices/modal-list-prices.component';
// import { ModalListPricesComponent } from '../tools/modal-list-prices/modal-list-prices.component';

@Component({
  selector: 'app-prices-index',
  templateUrl: './prices-index.component.html',
  styleUrls: ['./prices-index.component.scss'],
  animations: animation_conditional

})
export class PricesIndexComponent
  extends MatTableHelper<IProductPrice>
  implements OnInit, OnDestroy {

  protected columnsToDisplay: string[] = ['image', 'name', 'price', 'available', 'code', 'created_at', 'actions'] ;
  @ViewChild(MatTable) table: MatTable<IProductPrice>;
  constructor(
    protected methodsHttp: MethodsHttpService, protected snackBar: MatSnackBar,
    public act_router: ActivatedRoute,
    private dialog: MatDialog,
    private storage: StorageService,
    private btnSheet: MatBottomSheet
    // private s_shared: SharedService,
    // private store: Store,
  ) {
    super();
    // this.stateFilePrices$ = this.store.select(selectPrice);
  }

  // @ViewChild(MatDrawer) sidenavPrice: MatDrawer;
  permissions = Permission_products_prices.prices;
  // EPriceState = EPriceState;
  isLoadingFilePrices: boolean = false;
  url: string = PRICE_ROUTE_API_INDEX;
  isOpenPrice: boolean = false;
  dataPriceModify: any = {
    id: null,
    name: null,
    isLoading: false,
    data: null,
    isEdit: false,
  };
  isLoadingNewPrice: boolean = false;
  pricesGroups: PriceGroup[] = [];
  
  formImport = new FormControl(null, [Validators.required])
  
  isOpenFile: boolean = false;
  subscriptionStateFile: Subscription;

  pondOptions: FilePondOptions = {
    allowMultiple: true,
    labelIdle: 'Arrastre o presione aquí',
    name: 'file',
    maxParallelUploads: 5,
    
    server: {

      url: `${environment.server}`,
      process: {
        url: 'catalogs/products/prices/import-file',

        headers: {
          Authorization: `Bearer ${this.storage.getCurrentToken()}`,
          Accept: 'application/json',
        },
        onload: (response: any) => {
          const data = JSON.parse(response);
          SwalService.swalFire({ title: 'Procesando excel en el servidor', text: 'El excel se esta procesando en el servidor, en unos momento recibirá una notificación describiendo el estado del proceso', icon: 'success' });
          return data.id;
        },

      },
    },

  };


  ngOnInit(): void {

    this.methodsHttp.methodGet(PRICE_ROUTE_API_GROUP_PRICE).subscribe((res: any) => {
      this.pricesGroups = res.data;
    });
    // this.subscriptionStateFile = this.stateFilePrices$.subscribe((state: any) => {
    //   console.log({ state });
    //   this.stateFilePrices = state;
    // });
  }

  initGroupPrice(): void {
    this.methodsHttp.methodGet(PRICE_ROUTE_API_GROUP_PRICE).subscribe((res: any) => {
      this.pricesGroups = res.data;
    });
  }

  ngOnDestroy(): void {
    if (this.subscriptionStateFile) {
      this.subscriptionStateFile.unsubscribe();
    }
  }

  // generateTemplateForm(group): void {
  //   group.forEach((element) => {
  //     const control_input = new FormControl(null);
  //     const control_input_with_tax = new FormControl(null);
  //     this.form.addControl(
  //       `price_group_${element.id}`,
  //       control_input
  //     );
  //     this.form.addControl(
  //       `tax_price_group_${element.id}`,
  //       control_input_with_tax
  //     );
  //   });
  // }

  managerStatesPrices(): void {
    // switch (this.stateFilePrices?.status) {
    //   case EPriceState.Idle:
    //     this.store.dispatch(generatingPrice());
    //     this.methodsHttp.methodPost(`${this.url}/export-file`).subscribe(() => {
    //       SwalService.swalToast('El excel se esta generando en el servidor, espere un momento hasta que reciba una notificación o de click en el boton de cuando diga que puede descargalo');
    //     }, () => {
    //       SwalService.swalToast('Error al generar el excel, intente de nuevo', 'error');
    //       this.store.dispatch(idlePrice());
    //     });
    //     break;
    //   case EPriceState.Generated:
    //     this.store.dispatch(downloadPrice());
    //     console.log(this.stateFilePrices);
    //     this.downloadExcelPrice(this.stateFilePrices.data?.url!);
    //     break;
    // }
  }

 

  openDialogListPrices(key): void {
    const product = this.dataSource.find((item) => item.id === key);
    if (product) {
      this.dialog.open(ModalListPricesComponent, {
        data: {
          id: key,
          product_name: product.name,
        },
      }).afterClosed().subscribe(() => {
        console.log('The dialog was closed');
        this.methodsHttp
          .methodGet(`catalogs/products/${key}/prices/edit?type=full`)
          .subscribe((res: any) => {
            // const data = this.data.get(key)!;
            product.last_prices = res.data.last_prices;
          });
      });
    }

  }

  // addOrRemoveTax(id: number, isTax = false): void {
  //   console.log(this.form.get('price_group_' + id)?.value);
  //   const name = 'price_group_' + id;
  //   if (isTax) {
  //     const price_out_tax = this.form.get('tax_' + name)?.value / 1.12;

  //     this.form.get(name)?.setValue(price_out_tax.toFixed(2));
  //   } else {
  //     const price_with_tax = this.form.get(name)?.value * 1.12;
  //     console.log(price_with_tax);

  //     this.form.get('tax_' + name)?.setValue(price_with_tax.toFixed(2));
  //   }
  // }

  // assignData(prices: IPrice[]): void {
  //   if (prices) {
  //     prices.forEach(element => {
  //       this.form.get('price_group_' + element.price_group_id)?.setValue(element.price.toFixed(2));
  //       this.form.get('tax_price_group_' + element.price_group_id)?.setValue((element.price * 1.12).toFixed(2));
  //     });
  //   }
  // }

  getParams(key: string): any {
    return this.act_router.snapshot.params[key];
  }

  // downloadExcelPrice(url: string): void {
  //   const url_object = new URL(url);
  //   const name_file = url_object.searchParams.get('file_name') || 'file_' + Date.now();
  //   this.s_shared
  //     .download(url, true)
  //     .subscribe((event: any) => {
  //       switch (event.type) {
  //         case HttpEventType.Sent:
  //           break;
  //         case HttpEventType.ResponseHeader:
  //           break;
  //         case HttpEventType.DownloadProgress:
  //           // progress = Math.round(event.loaded / event.total * 100);
  //           break;
  //         case HttpEventType.Response:
  //           const blob = new Blob([event.body], { type: 'application/ms-Excel' });
  //           const urlDownload = window.URL.createObjectURL(blob);
  //           const a = document.createElement('a');
  //           document.body.appendChild(a);
  //           a.setAttribute('style', 'display: none');
  //           a.href = urlDownload;
  //           a.download = name_file;
  //           a.click();
  //           window.URL.revokeObjectURL(urlDownload);
  //           a.remove();
  //           this.store.dispatch(idlePrice());
  //       }
  //     }, () => { this.store.dispatch(idlePrice())});
  // }

  openCreateOrEditPrice(id: number | null): void {
    const product = this.dataSource.find(x => x.id === id);
    console.log({product, dataSource: this.dataSource});
    this.btnSheet.open(CreateOrEditPricesButtonSheetComponent, {
      data: {
        product,
        pricesGroups: this.pricesGroups,
      },
      disableClose: true,
    }).afterDismissed().subscribe({
      next: (res) => {
        console.log({res});
        if (res?.success) {
          this.updateItemInTable(id, res.data);
        }
      }
    });
  }
  
}
