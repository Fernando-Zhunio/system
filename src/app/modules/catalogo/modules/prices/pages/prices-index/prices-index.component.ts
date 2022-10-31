// import { HttpEventType } from '@angular/common/http';
import { transition, trigger, useAnimation } from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { FilePondOptions } from 'filepond';
import { Subscription } from 'rxjs';
import { environment } from '../../../../../../../environments/environment';
import { Permission_products_prices } from '../../../../../../class/permissions-modules';
import { IProductPrice } from '../../../../../../interfaces/iprice';
import { MethodsHttpService } from '../../../../../../services/methods-http.service';
import { MatTableHelper } from '../../../../../../shared/class/mat-table-helper';
import { CreateHostService } from '../../../../../../shared/services/create-host.service';
import { Import } from '../../../imports/interfaces/imports';
import { CreateOrEditPricesButtonSheetComponent } from '../../components/create-or-edit-prices-button-sheet/create-or-edit-prices-button-sheet.component';
import { SearchImportDialogComponent } from '../../components/search-import-dialog/search-import-dialog.component';
import { PriceGroup } from '../../interfaces/price-group';
import { PRICE_ROUTE_API_EDIT, PRICE_ROUTE_API_EXPORT, PRICE_ROUTE_API_GROUP_PRICE, PRICE_ROUTE_API_IMPORT, PRICE_ROUTE_API_INDEX } from '../../routes-api/prices-routes-api';
import { ModalListPricesComponent } from '../../tools/modal-list-prices/modal-list-prices.component';
import { fadeInDown } from 'ngx-animate/lib/fading';
import { Token } from '../../../../../../class/fast-data';
import { SwalService } from '../../../../../../services/swal.service';
import { CreateOrEditImportModalComponent } from '../../../imports/components/create-or-edit-import-modal/create-or-edit-import-modal.component';
import { NgxPermissionsService } from 'ngx-permissions';
import { SearchTemplateTableComponent } from '../../../../../../Modulos/search-template/search-template-table/search-template-table.component';

@Component({
  selector: 'app-prices-index',
  templateUrl: './prices-index.component.html',
  styleUrls: ['./prices-index.component.scss'],
  animations: [
    trigger('fadeInDown', [
      transition('show => hidden', useAnimation(fadeInDown, {
        params: { timing: 0.5, delay: 0 }
      }))
    ])
  ],

})
export class PricesIndexComponent
  extends MatTableHelper<IProductPrice>
  implements OnInit, OnDestroy {

  protected columnsToDisplay: string[] = ['image', 'name', 'price', 'available', 'code', 'created_at', 'actions'];
  @ViewChild(MatTable) table: MatTable<IProductPrice>;
  @ViewChild(SearchTemplateTableComponent) searchTemplateTable: SearchTemplateTableComponent;
  constructor(
    protected mhs: MethodsHttpService, protected snackBar: MatSnackBar,
    public act_router: ActivatedRoute,
    private dialog: MatDialog,
    private btnSheet: MatBottomSheet,
    private chs: CreateHostService,
    private nps: NgxPermissionsService,
  ) {
    super();
  }

  permissions = Permission_products_prices.prices;
  isLoadingFilePrices: boolean = false;
  url: string = PRICE_ROUTE_API_INDEX;
  isOpenPrice: boolean = false;
  isCanEdit: boolean = false;
  dataPriceModify: any = {
    id: null,
    name: null,
    isLoading: false,
    data: null,
    isEdit: false,
  };
  isLoadingNewPrice: boolean = false;
  pricesGroups: PriceGroup[] = [];
  isOpenSendFile: boolean = false;

  formImport: FormGroup = new FormGroup({
    import_id: new FormControl(null, [Validators.required]),
    import_code: new FormControl({ disabled: true, value: null })
  })

  isOpenFile: boolean = false;
  subscriptionStateFile: Subscription;

  pondOptions: FilePondOptions = {
    allowMultiple: true,
    labelIdle: 'Arrastre o presione aquí',
    name: 'file',
    maxParallelUploads: 5,
    server: {
      url: `${environment.server}`,
      load: (_source: any, _load: any, error: any, _progress: any, _abort: any, _headers: any) => {
        error('Not implemented.');
      },

      process: {
        url: PRICE_ROUTE_API_IMPORT,
        headers: {
          Authorization: `Bearer ${Token.getInstance().getToken()}`,
          Accept: 'application/json',
        },
        onerror: (response: any) => {
          console.log({ response });
          const res = JSON.parse(response);
          SwalService.swalToast(res?.message || 'Error al subir el archivo', 'error');
        },
        ondata: (formData) => {
          formData.append('import_id', this.formImport.get('import_id')?.value || '');
          return formData;
        },
      },
    },

  };


  ngOnInit(): void {
    this.initGroupPrice();
  }

  initGroupPrice(): void {
    this.nps.hasPermission(this.permissions.edit).then((res: boolean) => {
      if (res) {
        this.isCanEdit = res;
        this.mhs.methodGet(PRICE_ROUTE_API_GROUP_PRICE).subscribe((res: any) => {
          this.pricesGroups = res.data;
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptionStateFile?.unsubscribe();
  }

  openSearchImportDialog(): void {
    this.chs.injectComponent(SearchImportDialogComponent)
      .beforeClose().subscribe((res: { data: Import }) => {
        if (res?.data) {
          console.log(res.data);
          this.setFormImport(res.data)
        }
      });
  }

  setFormImport(importation: Import): void {
    this.formImport.get('import_id')?.setValue(importation.id);
    this.formImport.get('import_code')?.setValue(importation.code);
  }

  downloadTemplatePrices(): void {
    this.mhs.methodPost(PRICE_ROUTE_API_EXPORT).subscribe(() => {
      SwalService.swalToast('El excel se esta generando en el servidor, espere un momento hasta que reciba una notificación o de click en el botón de cuando diga que puede descargarlo');
    }, () => {
      SwalService.swalToast('Error al generar el excel, intente de nuevo', 'error');
    });
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
        if (this.isCanEdit) {
          this.mhs
            .methodGet(PRICE_ROUTE_API_EDIT(key), {type: 'full'})
            .subscribe((res: any) => {
              if (res?.success) {
                this.updateItemInTable(key, res.data)
              }
            });
        }
      });
    }
  }

  createImport(): void {
    this.dialog.open(CreateOrEditImportModalComponent).beforeClosed().subscribe((response) => {
      if (response?.success) {
        this.setFormImport(response.data);
      }
    });
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
    console.log({ product, dataSource: this.dataSource });
    this.btnSheet.open(CreateOrEditPricesButtonSheetComponent, {
      data: {
        product,
        pricesGroups: this.pricesGroups,
      },
      disableClose: true,
    }).afterDismissed().subscribe({
      next: (res) => {
        console.log({ res });
        if (res?.success) {
          this.updateItemInTable(id, res.data);
        }
      }
    });
  }

}
