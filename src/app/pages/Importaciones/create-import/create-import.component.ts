import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { InvoiceItemModalComponent } from '../../../components/modals/invoice-item-modal/invoice-item-modal.component';
import { EProviderActions } from '../../../enums/eprovider-actions.enum';
import { Iimportation } from '../../../interfaces/Imports/invoice-item';
import { StandartSearchService } from '../../../services/standart-search.service';


// export function RequireMatch(control: AbstractControl) {
//   const selection: any = control.value;
//   if (typeof selection === 'string') {
//       return { incorrect: true };
//   }
//   return null;
// }
// interface TableItemInvoice{
//   new:boolean
//   id:number
//   code:string,
//   description:string,
//   note:string,
//   quantity:number,
//   price:number,
//   tariff:number
//   images:string
// }
@Component({
  selector: 'app-create-import',
  templateUrl: './create-import.component.html',
  styleUrls: ['./create-import.component.css']
})
export class CreateImportComponent implements OnInit {

  isLoadingProvider: boolean = false;
  providers = [];
  state_import: 'edit'|'create' = 'create';
  constructor(private snack_bar: MatSnackBar, private active_route: ActivatedRoute, private spinner: NgxSpinnerService, private s_standart: StandartSearchService, private bottomSheet: MatBottomSheet, private dialog: MatDialog) { }
  products = [];
  form_import: FormGroup = new FormGroup({
    origin: new FormControl('', [Validators.required]),
    sequence: new FormControl('', ),
  });

  form_publish: FormGroup = new FormGroup({
    estimated_date_first: new FormControl(null, [Validators.required]),
    estimated_date_last: new FormControl(null, [Validators.required]),
  });

  forms_invoices = [];
  import: Iimportation = null;
  origins = [];
  origen_current: string;
  files: NgxFileDropEntry[] = [];
  isLoadGenerate: boolean = false;
  isLoadPublish;
  state: 'create'|'edit'|'store' = 'create';
  suscribe_status: Subscription;


  ngOnInit(): void {
    this.s_standart.create('purchase-department/imports/create').subscribe(res => {

      ({origins: this.origins, providers: this.providers} = res.data);
      localStorage.setItem('countries', JSON.stringify(res.data.countries));
    });
     this.suscribe_status = this.active_route.data.subscribe(res => {
      this.state_import = res.state;
      this.state = this.state_import;

      if (res.state == 'edit') {
        this.spinner.show();
        const id = this.active_route.params.subscribe(res => {

          this.s_standart.show('purchase-department/imports/' + res.id + '/edit').subscribe((res: {success: boolean, data: Iimportation}) => {
            this.spinner.hide();
            this.import = res.data;
            this.forms_invoices = this.import.invoices;
          }, err => {this.spinner.hide();});
        });
      }
    });
  }

  createimport() {
    if (this.form_import.valid) {
      this.isLoadGenerate = true;
      this.s_standart.store('purchase-department/imports', this.form_import.value).subscribe((res: {success: boolean, data: Iimportation}) => {
        if (res.success) {
          this.import = res.data;
          this.state_import = 'edit';
        }
        this.isLoadGenerate = false;
      }, err => {this.isLoadGenerate = false;});
    }
  }

  ngOnDestroy(): void {
    if (this.suscribe_status) {
      this.suscribe_status.unsubscribe();
    }
  }


  newInvoice() {
    this.forms_invoices.push('add');
  }

  removeInvoice(index) {
    this.forms_invoices.splice(index, 1);
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {

      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        const reader = new FileReader();
        fileEntry.file((file: File) => {
        });
      } else {
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }

  deleteInvoice(i) {
    this.forms_invoices.splice(i, 1);
  }

  captureImagenProduct(i): string | boolean {
   if (this.products[i].prestashop_products.length > 0) {
     return this.products[i].prestashop_product[0].image;
   }
   if (this.products[i].ml_infos.length > 0) {
    return this.products[i].ml_infos[0].image;
   }

   return 'assets/img/img_default_null.jpg';
  }


  addRowTableItem() {
    this.dialog.open(InvoiceItemModalComponent, {data: {id_import: 100, id_invoice: 100}, disableClose: true});
  }

  editItem(i) {

  }

  getProduct(event) {
    this.products = event.data.data;
  }

  publishNow() {
    if (this.form_publish.valid) {
      this.spinner.show();
      const data_req = this.form_publish.value;
      data_req.estimated_date_first = formatDate(new Date(data_req.estimated_date_first), 'yyyy/MM/dd', 'en');
      data_req.estimated_date_last = formatDate(new Date(data_req.estimated_date_last), 'yyyy/MM/dd', 'en');

      this.s_standart.updatePut('purchase-department/imports/' + this.import.id + '/publish', this.form_publish.value).subscribe(res => {
        this.spinner.hide();
      }, err => {
        // this.spinner.hide();
        console.log(err);
        this.spinner.hide();
      });
    }
  }


  newAction(event: {action: EProviderActions, data: any, id?: number}): void {
    let snack;
    switch (event.action) {
      case EProviderActions.create_provider:
         snack = this.snack_bar.open('Creando proveedor espere...');
        this.s_standart.store('purchase-department/providers', event.data).subscribe(res => {
          if (res.success) {
            snack.dismiss();
            this.snack_bar.open('Proveedor creado con exito', 'OK', {duration: 2000});
            this.providers = res.data;
          }
        }, err => {
          console.log(err);
          snack.dismiss();
        });
        break;
      case EProviderActions.create_contact:
        snack = this.snack_bar.open('Creando contacto espere...');
        this.s_standart.store(`purchase-department/providers/${event.id}/contacts`, event.data).subscribe(res => {
          if (res.success) {
            snack.dismiss();
            this.providers = res.data;
            this.snack_bar.open('Contacto creado con exito', 'OK', {duration: 2000});
          }
        }, err => {
          console.log(err);
          snack.dismiss();
        });
      break;
      case EProviderActions.edit_provider:
        snack = this.snack_bar.open('Editando proveedor espere...');
        this.s_standart.updatePut(`purchase-department/providers/${event.id}`, event.data).subscribe(res => {
          if (res.success) {
            snack.dismiss();
            this.providers = res.data;
            this.snack_bar.open('Proveedor editado con exito', 'OK', {duration: 2000});
          }
        }, err => {
          console.log(err);
          snack.dismiss();
        });
      break;
      case EProviderActions.delete_provider:
        snack = this.snack_bar.open('Eliminando proveedor espere...');
        this.s_standart.destory(`purchase-department/providers/${event.id}`).subscribe(res => {
          if (res.success) {
            snack.dismiss();
            this.providers = res.data;
            this.snack_bar.open('Proveedor eliminado con exito', 'OK', {duration: 2000});
          }
        }, err => {
          console.log(err);
          snack.dismiss();
        });
        break;
        case EProviderActions.edit_contact:
        snack = this.snack_bar.open('Editando contacto espere...');
        this.s_standart.updatePut(`purchase-department/providers/${event.id}/contacts/${event.data.id}`, event.data).subscribe(res => {
          if (res.success) {
            snack.dismiss();
            this.providers = res.data;
            this.snack_bar.open('Contacto editado con exito', 'OK', {duration: 2000});
          }
        }, err => {
          console.log(err);
          snack.dismiss();
        });
        break;
        case EProviderActions.delete_contact:
          snack = this.snack_bar.open('Eliminando contacto espere...');
          this.s_standart.destory(`purchase-department/providers/${event.id}/contacts/${event.data.id}`).subscribe(res => {
            if (res.success) {
              snack.dismiss();
              this.providers = res.data;
              this.snack_bar.open('Contacto eliminado con exito', 'OK', {duration: 2000});
            }
          }, err => {
            console.log(err);
            snack.dismiss();
          });
          break;
      default:
        break;
    }
  }
}
