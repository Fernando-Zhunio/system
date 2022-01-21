import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { FilePondOptions } from 'filepond';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Crud } from '../../../../class/crud';
import { IPrice, IPriceGroup, IProductPrice } from '../../../../interfaces/iprice';
import { downloadPrice, generatingPrice, idlePrice } from '../../../../redux/actions/price.action';
import { EPriceState } from '../../../../redux/reducers/price.reducer';
import { selectPrice } from '../../../../redux/state/state.selectors';
import { SharedService } from '../../../../services/shared/shared.service';
import { StandartSearchService } from '../../../../services/standart-search.service';
import { StorageService } from '../../../../services/storage.service';
import { SwalService } from '../../../../services/swal.service';
import { ModalListPricesComponent } from '../tools/modal-list-prices/modal-list-prices.component';

// enum StateDownloadFilePrices {
//   idle = 'Generar Archivo excel', generating = 'Generando espere ...', load = 'Descargar archivo', loading = 'Descargando espere ...'
// }
@Component({
  selector: 'app-prices-index',
  templateUrl: './prices-index.component.html',
  styleUrls: ['./prices-index.component.css'],
})
export class PricesIndexComponent
  extends Crud<IProductPrice>
  implements OnInit {
  constructor(
    // private _location: Location,
    protected standardService: StandartSearchService,
    protected snackBar: MatSnackBar,
    public act_router: ActivatedRoute,
    private dialog: MatDialog,
    private storage: StorageService,
    private shared_service: SharedService,
    private store: Store,
  ) {
    super(standardService, snackBar);
    this.stateFilePrices$ = this.store.select(selectPrice);
  }

  @ViewChild(MatDrawer) sidenavPrice: MatDrawer;
  EPriceState = EPriceState;
  isLoadingFilePrices: boolean = false;
  url: string = 'catalogs/products/prices';
  isOpenPrice: boolean = false;
  dataPriceModify: any = {
    id: null,
    name: null,
    isLoading: false,
    data: null,
    isEdit: false,
  };
  isLoadingNewPrice: boolean = false;
  pricesGroup: IPriceGroup[] = [];

  stateFilePrices$: Observable<EPriceState>;

  form: FormGroup = new FormGroup({});

  pondOptions: FilePondOptions = {
    allowMultiple: true,
    labelIdle: 'Arrastre o presione aquí',
    name: 'file',
    maxParallelUploads: 5,
    server: {
      url: `${environment.server}`,
      process: {
        url: 'storage/attachments/upload',
        headers: {
          Authorization: `Bearer ${this.storage.getCurrentToken()}`,
          Accept: 'application/json',
        },
        onload: (response: any) => {
          const data = JSON.parse(response);
          // this.sendOneMessage(null, [data.id]);
          return data.id;
        }
      },
    }
  };
  ngOnInit(): void {

    this.standardService.index(`${this.url}/prices-group`).subscribe((res: any) => {
      this.generateTemplateForm(res.data);
      this.pricesGroup = res.data;
    });
  }

  generateTemplateForm(group): void {

    group.forEach((element) => {
      const control_input = new FormControl(null);
      const control_input_with_tax = new FormControl(null);
      this.form.addControl(
        `price_group_${element.id}`,
        control_input
      );
      this.form.addControl(
        `tax_price_group_${element.id}`,
        control_input_with_tax
      );
    });
  }

  downloadExcelPrices(): void {
    this.stateFilePrices$.subscribe((state: EPriceState) => {
      switch (state) {
        case EPriceState.Idle:
          this.store.dispatch(generatingPrice());
          this.standardService.index(`${this.url}/export-file`).subscribe((res) => {
            console.log(res.data.message);
            SwalService.swalToast(res.data.message);
          }, err => {
            this.store.dispatch(idlePrice());
          });
          break;
        case EPriceState.Generated:
          this.store.dispatch(downloadPrice());
          this.standardService.index(`${this.url}/export-file`).subscribe((res) => {
            console.log(res);
            SwalService.swalToast(res.data);
          }, err => {
            this.store.dispatch(idlePrice());
          });
          break;
      }
    }).unsubscribe();
  }

  progressDownloadPercent(event): void {
    console.log(event);
  }

  openSidenavPriceForEdit(id: number): void {
    this.sidenavPrice.open();
    this.dataPriceModify.isLoading = true;
    this.dataPriceModify.id = id;
    this.dataPriceModify.name = this.data.get(id).name;
    this.dataPriceModify.isEdit = true;
    this.form.reset();
    this.standardService
      .show(`catalogs/products/${id}/prices/edit`)
      .subscribe((res: any) => {
        this.dataPriceModify.data = res;
        this.dataPriceModify.isLoading = false;
        this.assignData(res?.data);
      });
  }

  openSidenavPriceForCreate(id: number): void {
    this.sidenavPrice.open();
    this.dataPriceModify.isLoading = true;
    this.dataPriceModify.id = id;
    this.dataPriceModify.name = this.data.get(id).name;
    this.dataPriceModify.isLoading = false;
    this.dataPriceModify.isEdit = false;
    this.form.reset();
    this.dataPriceModify.data = this.data.get(id);
  }

  openDialogListPrices(key): void {
    const dialogRef = this.dialog.open(ModalListPricesComponent, {
      data: {
        id: key,
        product_name: this.data.get(key).name,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.standardService
        .show(`catalogs/products/${key}/prices/edit?type=full`)
        .subscribe((res: any) => {
          this.data.get(key).last_prices = res.data.last_prices;
        });
    });
  }

  // addOrRemoveTax(name: string, isTax = false): void {
  //   console.log(this.form.get(name).value);
  //   if (isTax) {
  //     const price_out_tax = this.form.get("tax_" + name).value / 1.12;

  //     this.form.get(name).setValue(price_out_tax.toFixed(2));
  //   } else {
  //     const price_with_tax = this.form.get(name).value * 1.12;
  //     console.log(price_with_tax);

  //     this.form.get("tax_" + name).setValue(price_with_tax.toFixed(2));
  //   }
  // }

  addOrRemoveTax(id: number, isTax = false): void {
    console.log(this.form.get('price_group_' + id).value);
    const name = 'price_group_' + id;
    if (isTax) {
      const price_out_tax = this.form.get('tax_' + name).value / 1.12;

      this.form.get(name).setValue(price_out_tax.toFixed(2));
    } else {
      const price_with_tax = this.form.get(name).value * 1.12;
      console.log(price_with_tax);

      this.form.get('tax_' + name).setValue(price_with_tax.toFixed(2));
    }
  }

  saveInServer(): void {
    this.isLoadingNewPrice = true;
    this.standardService
      .store(
        `catalogs/products/${this.dataPriceModify.id}/prices`,
        this.form.value
      )
      .subscribe((res: { success: boolean, data: IProductPrice }) => {
        this.data.get(this.dataPriceModify.id).last_prices = res.data.last_prices;
        this.snackBar.open('Se ha guardado el precio', 'Cerrar', {
          duration: 3000,
        });
        console.log({ res, data: this.data.get(this.dataPriceModify.id) });
        this.sidenavPrice.close();
        this.isLoadingNewPrice = false;
      }, error => {
        console.log(error);
        this.isLoadingNewPrice = false;
        this.snackBar.open('No se ha podido guardar el precio', 'Cerrar', {
          duration: 3000,
        });
      });
  }

  assignData(prices: IPrice[]): void {
    prices.forEach(element => {
      this.form.get('price_group_' + element.price_group_id).setValue(element.price.toFixed(2));
      this.form.get('tax_price_group_' + element.price_group_id).setValue((element.price * 1.12).toFixed(2));
    });
  }

  getParams(key: string): any {
    return this.act_router.snapshot.params[key];
  }

  importPrices(): void {

  }

}
