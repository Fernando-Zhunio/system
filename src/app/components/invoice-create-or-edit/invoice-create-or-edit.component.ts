import { formatDate } from "@angular/common";
import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { EProviderActions } from "../../enums/eprovider-actions.enum";
import {
  Iimportation,
  invoice,
  invoiceItem,
  InvoiceItemFull,
  Iprovider,
  Iresponse,
} from "../../interfaces/Imports/invoice-item";
// import { EventEmitter } from 'events';
// import { TableItemInvoice } from "../../interfaces/table-item-invoice";
import { StandartSearchService } from "../../services/standart-search.service";
import { SwalService } from "../../services/swal.service";
import { CreateProviderOrContactComponent } from "../modals/create-provider-or-contact/create-provider-or-contact.component";
import { InvoiceItemModalComponent } from "../modals/invoice-item-modal/invoice-item-modal.component";
import { ActionProviderComponent } from "../Sheet/action-provider/action-provider.component";


@Component({
  selector: "app-invoice-create-or-edit",
  templateUrl: "./invoice-create-or-edit.component.html",
  styleUrls: ["./invoice-create-or-edit.component.css"],
})
export class InvoiceCreateOrEditComponent implements OnInit {
  constructor(
    private snack: MatSnackBar,
    private s_standart: StandartSearchService,
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog
  ) {}

  @Input() providers=[];
  @Input() id_import;
  @Input() product_relationship = null;
  @Output() close: EventEmitter<object> = new EventEmitter();
  @Output() new_action:EventEmitter<{action:EProviderActions,data:any,id?:number}> = new EventEmitter();
  // @Output() openSide:EventEmitter<object> = new EventEmitter();

  isLoadInvoice: boolean = false;
  // ELEMENT_DATA : TableItemInvoice[] = [];
  @Input() ELEMENT_DATA: invoiceItem[] = [];
  displayedColumns: string[] = [
    "new",
    "code",
    "description",
    "note",
    "quantity",
    "price",
    "tariff",
    "id",
  ];
  // dataSource = new MatTableDataSource<TableItemInvoice>(this.ELEMENT_DATA);
  dataSource = new MatTableDataSource<invoiceItem>(this.ELEMENT_DATA);
  // @Output() click_menu:EventEmitter<object> = new EventEmitter();
  ngOnInit(): void {
    console.log(this.providers);
    
    console.log(this.state);
    if (this.invoice) {
      const {
        date_purchase,
        id,
        identifier,
        notes,
        provider_id,
      } = this.invoice;
      this.formInvoice.setValue({
        date_purchase,
        id,
        identifier,
        notes,
        provider_id,
      });
      this.refreshDataTable(this.ELEMENT_DATA);
      // setTimeout(() => {
      //   console.log(this.ELEMENT_DATA);

      //   console.log(this.dataSource.data);

      // }, 3000);
    }
  }

  @Input() state: "edit" | "create" | "formMore" = "create";
  @Input() invoice: invoice = null;
  formInvoice: FormGroup = new FormGroup({
    identifier: new FormControl(null, [Validators.required]),
    notes: new FormControl(null),
    date_purchase: new FormControl(null, [Validators.required]),
    provider_id: new FormControl("", [Validators.required]),
    id: new FormControl(null),
    // state:new FormControl('create'),
  });
  saveInvoice(): void {
    if (this.formInvoice.valid) {
      this.isLoadInvoice = true;
      // console.log(this.formInvoice.value);
      if (this.formInvoice.controls["date_purchase"].value != null) {
        let data_req = this.formInvoice.value;
        data_req.date_purchase = formatDate(
          new Date(data_req.date_purchase),
          "yyyy/MM/dd",
          "en"
        );
      }
      if (this.state == "edit") {
        this.s_standart
          .updatePut(
            "purchase-department/imports/" +
              this.id_import +
              "/invoices/" +
              this.formInvoice.controls["id"].value,
            this.formInvoice.value
          )
          .subscribe(
            (res) => {
              if (res.success) {
                console.log(res);
                this.invoice = res.data;
                this.formInvoice.controls["id"].setValue(res.data.id);
                this.formInvoice.disable({ emitEvent: true });
                this.state = "formMore";
              }
              this.isLoadInvoice = false;
              // console.log(this.formInvoice.value);
            },
            (err) => {
              this.isLoadInvoice = false;
            }
          );
      } else {
        this.s_standart
          .store(
            "purchase-department/imports/" + this.id_import + "/invoices",
            this.formInvoice.value
          )
          .subscribe(
            (res) => {
              if (res.success) {
                console.log(res);
                this.invoice = res.data;
                this.formInvoice.controls["id"].setValue(res.data.id);
                this.formInvoice.disable({ emitEvent: true });
                this.state = "formMore";
              }
              this.isLoadInvoice = false;
              console.log(this.formInvoice.value);
            },
            (err) => {
              this.isLoadInvoice = false;
            }
          );
      }
    }
  }

  cancelEditInvoice() {
    this.state = "formMore";
  }

  editInvoice() {
    this.formInvoice.enable({ emitEvent: true });
    this.state = "edit";
  }

  // action_provider:'create_provider'|'create_contact'
  openActionProvider() {
    let id = this.formInvoice.controls["provider_id"].value;
    const indexProvider = this.providers.findIndex((x) => x.id == id);
    let data:Iprovider = null;
    if (indexProvider != -1) {
      data = this.providers[indexProvider] ;
    }
    this.bottomSheet.open(ActionProviderComponent, {
      data,
    }).afterDismissed().subscribe((res:EProviderActions)=>{
      switch (res) {
        case EProviderActions.create_provider:
          this.dialog.open(CreateProviderOrContactComponent,{data:{title:"Crear Proveedor",isProvider:true}}).beforeClosed().subscribe(res=>{
            if(res && res.success){
                  this.new_action.emit({action:EProviderActions.create_provider,data:res.data});
                }
              })
          break;

          case EProviderActions.create_contact:
          this.dialog.open(CreateProviderOrContactComponent,{data:{title:"Crear Contacto",isProvider:false,state:EProviderActions.create_contact}}).beforeClosed().subscribe(res=>{
            if(res && res.success){
                  this.new_action.emit({action:EProviderActions.create_contact,data: res.data,id:data.id});
                }
              })
          break;
          case EProviderActions.view_contact:
            console.log(data.contacts);
            this.dialog.open(CreateProviderOrContactComponent,{data:{title:"Contactos",isProvider:false,state:EProviderActions.view_contact,form_data:{name_provider:data.name,contacts: data.contacts}}}).beforeClosed().subscribe(res=>{
              console.log(res);
              if(res && res.success){
                    this.new_action.emit({action:res.action,data: res.data,id:data.id});
                  }
                })
          break;
          case EProviderActions.delete_provider:
            this.new_action.emit({action:EProviderActions.delete_provider,data: null,id:data.id});
          break;
          case EProviderActions.edit_provider:
            this.dialog.open(CreateProviderOrContactComponent,{data:{title:"Editar Proveedor",isProvider:true,form_data:data,state:EProviderActions.edit_provider}}).beforeClosed().subscribe(res=>{
              if(res && res.success){
                    this.new_action.emit({action:EProviderActions.edit_provider,data: res.data,id:data.id});
                  }
                }) 
          break;
        default:
          break;
      }
    });
  }

  addRowTableItem() {
    this.dialog
      .open(InvoiceItemModalComponent, {
        data: {
          id_import: this.id_import,
          id_invoice: this.formInvoice.controls["id"].value,
          state: "create",
        },
        disableClose: true,
      })
      .beforeClosed()
      .subscribe((res: { success: boolean; data: InvoiceItemFull }) => {
        if (res.hasOwnProperty("success") && res.success) {
          this.refreshDataTable(res.data);
        } else console.log("no tiene data");
      });
  }
  deleteItem(i) {
    let snack1 = this.snack.open("Eliminando Item espera...");
    this.isLoadInvoice = true;
    const item_num = this.ELEMENT_DATA[i].id;
    // "purchase-department/imports/167/invoices/142/items/1784"
    this.s_standart
      .destory(
        "purchase-department/imports/" +
          this.id_import +
          "/invoices/" +
          this.formInvoice.controls["id"].value +
          "/items/" +
          item_num
      )
      .subscribe(
        (res) => {
          console.log(res);
          snack1.dismiss();

          if (res.hasOwnProperty("success") && res.success) {
            this.snack.open("Eliminado con exito", "Ok", { duration: 2500 });
            this.refreshDataTable(res.data.invoice.items);
          } else {
            this.snack.open("Error intentalo de nuevo", "Error", {
              duration: 2500,
            });
          }

          this.isLoadInvoice = false;
        },
        (err) => {
          this.isLoadInvoice = false;
          console.log(err);
          snack1.dismiss();
          this.snack.open("Error intentalo de nuevo", "Error", {
            duration: 2500,
          });
        }
      );
  }

  refreshDataTable(data) {
    let row: invoiceItem[] = data as invoiceItem[];
    console.log(row);
    this.ELEMENT_DATA = row;
    this.dataSource = new MatTableDataSource<invoiceItem>(this.ELEMENT_DATA);
  }
  closeInvoice() {
    this.close.emit();
  }

  editItem(index) {
    this.dialog
      .open(InvoiceItemModalComponent, {
        data: {
          id_import: this.id_import,
          id_invoice: this.formInvoice.controls["id"].value,
          state: "edit",
          formData: this.ELEMENT_DATA[index],
        },
      })
      .beforeClosed()
      .subscribe((res) => {
        if (res.hasOwnProperty("success") && res.success) {
          this.refreshDataTable(res.data);
          // let row:TableItemInvoice[] =  as TableItemInvoice[]
          // console.log(row);
          // this.ELEMENT_DATA = row;
          // this.dataSource =  new MatTableDataSource<TableItemInvoice>(this.ELEMENT_DATA);
        } else console.log("no tiene data");
      });
  }

  deleteInvoice() {
    let snack1 = this.snack.open("Eliminando Factura espera...");
    this.isLoadInvoice = true;
    this.s_standart
      .destory(
        "purchase-department/imports/" +
          this.id_import +
          "/invoices/" +
          this.formInvoice.controls["id"].value
      )
      .subscribe(
        (res) => {
          console.log(res);
          snack1.dismiss();
          if (res.success) {
            this.snack.open("Eliminado con exito", "Ok", { duration: 2500 });
            this.closeInvoice();
          } else {
            this.snack.open("Error intentalo de nuevo", "Error", {
              duration: 2500,
            });
          }
          this.isLoadInvoice = false;
        },
        (err) => {
          this.isLoadInvoice = false;
          console.log(err);
          snack1.dismiss();
          this.snack.open("Error intentalo de nuevo", "Error", {
            duration: 2500,
          });
        }
      );
  }

  // seachProduct(){
  //   this.openSide.emit()
  // }

  captureImagenProduct(): string | boolean {
    if (this.product_relationship.prestashop_products.length > 0) {
      return this.product_relationship.prestashop_product[0].image;
    }
    if (this.product_relationship.ml_infos.length > 0) {
      return this.product_relationship.ml_infos[0].image;
    }

    return "assets/img/img_default_null.jpg";
  }

  isLoadFile: boolean = false;
  addFile(event): void {
    this.isLoadFile = true;
    let file: any = event.target.files[0];
    this.s_standart
      .uploadImg(
        "purchase-department/imports/" +
          this.id_import +
          "/invoices/" +
          this.formInvoice.controls["id"].value +
          "/items/import",
        file,
        "file"
      )
      .subscribe(
        (res: Iresponse) => {
          console.log(res);
          if (res.success) {
            SwalService.swalToast(
              "Los item del archive se han guardado en la base datos con exito",
              "success"
            );
          }
          this.isLoadFile = false;
        },
        (err) => {
          this.isLoadFile = false;
        }
      );
  }

  getProvider(): string {
    return this.providers.find(x=>x.id==this.invoice.provider_id).name;
  }
}
