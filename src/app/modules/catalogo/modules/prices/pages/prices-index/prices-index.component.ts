import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
import { SimpleSearchSelectorService } from '../../../../../../shared/standalone-components/simple-search/simple-search-selector.service';
import { Import } from '../../../imports/interfaces/imports';
import { CreateOrEditPricesButtonSheetComponent } from '../../components/create-or-edit-prices-button-sheet/create-or-edit-prices-button-sheet.component';
// import { SearchImportDialogComponent } from '../../components/search-import-dialog/search-import-dialog.component';
import { PriceGroup } from '../../interfaces/price-group';
import { PRICE_ROUTE_API_EDIT, PRICE_ROUTE_API_EXPORT, PRICE_ROUTE_API_GROUP_PRICE, PRICE_ROUTE_API_IMPORT, PRICE_ROUTE_API_INDEX } from '../../routes-api/prices-routes-api';
import { ModalListPricesComponent } from '../../tools/modal-list-prices/modal-list-prices.component';
import { Token } from '../../../../../../class/fast-data';
import { SwalService } from '../../../../../../services/swal.service';
import { CreateOrEditImportModalComponent } from '../../../imports/components/create-or-edit-import-modal/create-or-edit-import-modal.component';
import { NgxPermissionsService } from 'ngx-permissions';
// import { SearchTemplateTableComponent } from '../../../../../../Modulos/search-template/search-template-table/search-template-table.component';
import { Clipboard } from '@angular/cdk/clipboard';
import { PERMISSION_PRODUCT_INDEX } from '../../../buscar-productos/class/permissions-products';

@Component({
  selector: 'app-prices-index',
  templateUrl: './prices-index.component.html',
  styleUrls: ['./prices-index.component.scss'],
  animations: [
    trigger('fadeInDown', [
      state('show', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(-100%)'
      })),
      transition('hidden <=> show', [
        animate('.3s')
      ])
    ])
  ],

})
export class PricesIndexComponent
  extends MatTableHelper<IProductPrice>
  implements OnInit, OnDestroy {

  protected columnsToDisplay: string[] = ['image', 'name', 'price', 'available', 'code', 'created_at', 'actions'];
  @ViewChild(MatTable) table: MatTable<IProductPrice>;
  @ViewChild('searchImportTemplate') searchImportTemplate: TemplateRef<any>;

  constructor(
    private clipboard: Clipboard,
    protected mhs: MethodsHttpService, 
    protected snackBar: MatSnackBar,
    public act_router: ActivatedRoute,
    private dialog: MatDialog,
    private btnSheet: MatBottomSheet,
    private chs: SimpleSearchSelectorService,
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
  permissionProductIndex = PERMISSION_PRODUCT_INDEX;
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
          console.error({ response });
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
    this.chs.openDialogSelector({
      path: 'catalogs/imports',
      isMultiSelection: false,
      itemTemplateRef: this.searchImportTemplate,
    })
      .beforeClose().subscribe((res) => {
        if (res?.data) {
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


  getParams(key: string): any {
    return this.act_router.snapshot.params[key];
  }

  openCreateOrEditPrice(id: number | null): void {
    const product = this.dataSource.find(x => x.id === id);
    this.btnSheet.open(CreateOrEditPricesButtonSheetComponent, {
      data: {
        product,
        pricesGroups: this.pricesGroups,
      },
      disableClose: true,
    }).afterDismissed().subscribe({
      next: (res) => {
        if (res?.success) {
          this.updateItemInTable(id, res.data);
        }
      }
    });
  }

  copy(text: string): void {
    this.clipboard.copy(text);
    this.snackBar.open('Copiado', 'Cerrar', {
      duration: 2000,
    });
  }

}
