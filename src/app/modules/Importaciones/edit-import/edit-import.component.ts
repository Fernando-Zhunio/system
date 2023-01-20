import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { InvoiceItemModalComponent } from '../../../components/modals/invoice-item-modal/invoice-item-modal.component';
import { EProviderActions } from '../../../enums/eprovider-actions.enum';
import { Iimportation, invoice, Iprovider } from '../../../interfaces/Imports/invoice-item';
import { StandartSearchService } from '../../../services/standart-search.service';



@Component({
  selector: 'app-edit-import',
  templateUrl: './edit-import.component.html',
  styleUrls: ['./edit-import.component.css']
})
export class EditImportComponent implements OnInit {

  isLoadingProvider: boolean = false;
  providers: Iprovider[] = [];
  constructor(private active_route: ActivatedRoute, private spinner: NgxSpinnerService, private s_standart: StandartSearchService, private dialog: MatDialog, private snack_bar: MatSnackBar) { }
  products: any[] = [];


  form_publish: FormGroup = new FormGroup({
    estimated_date_first: new FormControl(null, [Validators.required]),
    estimated_date_last: new FormControl(null, [Validators.required]),
  })

  forms_invoices?: invoice [] = [];
  import: Iimportation | null = null;
  origins = [];
  origen_current: string;
  isLoadGenerate: boolean = false;
  isLoadPublish
  state: 'create' | 'edit' | 'store' = 'create';
  suscribe_status: Subscription

  ngOnInit(): void {

    this.s_standart.create('purchase-department/imports/create').subscribe((res: any) => {
      ({ origins: this.origins, providers: this.providers } = res.data);
    });
    this.suscribe_status = this.active_route.data.subscribe(() => {
      this.spinner.show();
      this.active_route.params.subscribe((res: any) => {
        this.s_standart.show('purchase-department/imports/' + res.id + '/edit').subscribe((response: { success: boolean, data: Iimportation }) => {
          this.spinner.hide();
          this.import = response.data;
          this.forms_invoices = this.import.invoices;
        }, () => { this.spinner.hide() });
      });
    });
  }

  changeProviders(event): void {
    let snack;
    switch (event.action) {
      case EProviderActions.create_provider:
        snack = this.snack_bar.open('Creando proveedor espere...')
        this.s_standart.store('purchase-department/providers', event.data).subscribe(res => {
          if (res.success) {
            snack.dismiss();
            this.snack_bar.open('Proveedor creado con éxito', 'OK', { duration: 2000 })
            this.providers = res.data;
          }
        }, err => {
          console.error(err);
          snack.dismiss();
        })
        break;
      case EProviderActions.create_contact:
        snack = this.snack_bar.open('Creando contacto espere...');
        this.s_standart.store(`purchase-department/providers/${event.id}/contacts`, event.data).subscribe(res => {
          if (res.success) {
            snack.dismiss();
            this.providers = res.data;
            this.snack_bar.open('Contacto creado con éxito', 'OK', { duration: 2000 })
          }
        }, err => {
          console.error(err);
          snack.dismiss();
        })
        break;
      case EProviderActions.edit_provider:
        snack = this.snack_bar.open('Editando proveedor espere...');
        this.s_standart.updatePut(`purchase-department/providers/${event.id}`, event.data).subscribe(res => {
          if (res.success) {
            snack.dismiss();
            this.providers = res.data;
            this.snack_bar.open('Proveedor editado con éxito', 'OK', { duration: 2000 })
          }
        }, err => {
          console.error(err);
          snack.dismiss();
        })
        break;
      case EProviderActions.delete_provider:
        snack = this.snack_bar.open('Eliminando proveedor espere...');
        this.s_standart.destory(`purchase-department/providers/${event.id}`).subscribe(res => {
          if (res.success) {
            snack.dismiss();
            this.providers = res.data;
            this.snack_bar.open('Proveedor eliminado con éxito', 'OK', { duration: 2000 })
          }
        }, err => {
          console.error(err);
          snack.dismiss();
        })
        break;
      case EProviderActions.edit_contact:
        snack = this.snack_bar.open('Editando contacto espere...');
        this.s_standart.updatePut(`purchase-department/providers/${event.id}/contacts/${event.data.id}`, event.data).subscribe(res => {
          if (res.success) {
            snack.dismiss();
            this.providers = res.data;
            this.snack_bar.open('Contacto editado con éxito', 'OK', { duration: 2000 })
          }
        }, err => {
          console.error(err);
          snack.dismiss();
        })
        break;
      case EProviderActions.delete_contact:
        snack = this.snack_bar.open('Eliminando contacto espere...');
        this.s_standart.destory(`purchase-department/providers/${event.id}/contacts/${event.data.id}`).subscribe(res => {
          if (res.success) {
            snack.dismiss();
            this.providers = res.data;
            this.snack_bar.open('Contacto eliminado con éxito', 'OK', { duration: 2000 })
          }
        }, err => {
          console.error(err);
          snack.dismiss();
        })
        break
      default:
        break;
    }
  }

  ngOnDestroy(): void {
    if (this.suscribe_status) {
      this.suscribe_status.unsubscribe();
    }
  }


  newInvoice() {
    let invoiceNew: any  = null;
    this.forms_invoices?.push(invoiceNew);
  }

  removeInvoice(index) {
    this.forms_invoices?.splice(index, 1);
  }

  deleteInvoice(i) {
    this.forms_invoices?.splice(i, 1);
  }

  captureImagenProduct(i): string | boolean {
    if (this.products[i].prestashop_products.length > 0) {
      return this.products[i].prestashop_product[0].image
    }
    if (this.products[i].ml_infos.length > 0) {
      return this.products[i].ml_infos[0].image
    }

    return 'assets/img/img_default_null.jpg';
  }

  addRowTableItem() {
    this.dialog.open(InvoiceItemModalComponent, { data: { id_import: 100, id_invoice: 100 }, disableClose: true })
  }

  getProduct(event) {
    this.products = event.data.data
  }

  publishNow() {
    if (this.form_publish.valid) {
      this.spinner.show();
      const data_req = this.form_publish.value;
      data_req.estimated_date_first = formatDate(new Date(data_req.estimated_date_first), 'yyyy/MM/dd', 'en');
      data_req.estimated_date_last = formatDate(new Date(data_req.estimated_date_last), 'yyyy/MM/dd', 'en');

      this.s_standart.updatePut('purchase-department/imports/' + this.import?.id + '/publish', this.form_publish.value).subscribe(() => {
        this.spinner.hide();
      }, err => {
        console.error(err);
        this.spinner.hide();
      });
    }
  }
}
