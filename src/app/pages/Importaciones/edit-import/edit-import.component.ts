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
import { Iimportation, invoice, Iprovider } from '../../../interfaces/Imports/invoice-item';
import { StandartSearchService } from '../../../services/standart-search.service';



@Component({
  selector: 'app-edit-import',
  templateUrl: './edit-import.component.html',
  styleUrls: ['./edit-import.component.css']
})
export class EditImportComponent implements OnInit {

  isLoadingProvider:boolean = false;
  providers: Iprovider[] = [];
  constructor(private active_route:ActivatedRoute, private spinner:NgxSpinnerService, private s_standart:StandartSearchService,private bottomSheet:MatBottomSheet,private dialog:MatDialog,private snack_bar:MatSnackBar) { }
  products=[];
 

  form_publish: FormGroup = new FormGroup({
    estimated_date_first:new FormControl(null,[Validators.required]),
    estimated_date_last:new FormControl(null,[Validators.required]),
  })

  forms_invoices:invoice[]=[];
  import:Iimportation = null;
  origins = [];
  origen_current:string;
  // files: NgxFileDropEntry[] = [];
  isLoadGenerate:boolean = false;
  isLoadPublish
  state:"create"|"edit"|"store"="create";
  suscribe_status:Subscription

  ngOnInit(): void {
    // this.forms_invoices = [];
    console.log(this.state);
    this.s_standart.create("purchase-department/imports/create").subscribe(res=>{
      console.log(res);
      ({origins:this.origins, providers:this.providers} = res.data)
      console.log(this.providers);
      
    });
     this.suscribe_status = this.active_route.data.subscribe(res=>{
      console.log(res);
        this.spinner.show();
        const id = this.active_route.params.subscribe(res=>{
          console.log(res);
          this.s_standart.show("purchase-department/imports/"+res.id+"/edit").subscribe((response:{success:boolean,data:Iimportation})=>{
            console.log(response);
            this.spinner.hide();
            this.import = response.data;
            this.forms_invoices = this.import.invoices;
          },err=>{this.spinner.hide()})
        })
      
    });
    // console.log(state);
    
  }

  changeProviders(event):void{
    let snack;
    switch (event.action) {
      case EProviderActions.create_provider:
         snack = this.snack_bar.open("Creando proveedor espere...")
        this.s_standart.store("purchase-department/providers",event.data).subscribe(res=>{
          if(res.success){
            snack.dismiss();
            this.snack_bar.open('Proveedor creado con exito','OK',{duration:2000})
            console.log(res);
         
            this.providers = res.data;
          }
        },err=>{
          console.log(err);  
          snack.dismiss();
        })
        break;
      case EProviderActions.create_contact:
        snack = this.snack_bar.open("Creando contacto espere...");
        this.s_standart.store(`purchase-department/providers/${event.id}/contacts`,event.data).subscribe(res=>{
          if(res.success){
            snack.dismiss();
            this.providers = res.data;
            this.snack_bar.open('Contacto creado con exito','OK',{duration:2000})
            console.log(res);
          }
        },err=>{
          console.log(err);  
          snack.dismiss();
        })
      break;
      case EProviderActions.edit_provider:
        snack = this.snack_bar.open("Editando proveedor espere...");
        this.s_standart.updatePut(`purchase-department/providers/${event.id}`,event.data).subscribe(res=>{
          if(res.success){
            snack.dismiss();
            this.providers = res.data;
            this.snack_bar.open('Proveedor editado con exito','OK',{duration:2000})
            console.log(res);
          }
        },err=>{
          console.log(err);  
          snack.dismiss();
        })
      break;
      case EProviderActions.delete_provider:
        snack = this.snack_bar.open("Eliminando proveedor espere...");
        this.s_standart.destory(`purchase-department/providers/${event.id}`).subscribe(res=>{
          if(res.success){
            snack.dismiss();
            this.providers = res.data;
            this.snack_bar.open('Proveedor eliminado con exito','OK',{duration:2000})
            console.log(res);
          }
        },err=>{
          console.log(err);  
          snack.dismiss();
        })
        break;
        case EProviderActions.edit_contact:
        snack = this.snack_bar.open("Editando contacto espere...");
        this.s_standart.updatePut(`purchase-department/providers/${event.id}/contacts/${event.data.id}`,event.data).subscribe(res=>{
          if(res.success){
            snack.dismiss();
            this.providers = res.data;
            this.snack_bar.open('Contacto editado con exito','OK',{duration:2000})
            console.log(res);
          }
        },err=>{
          console.log(err);  
          snack.dismiss();
        })
        break;
        case EProviderActions.delete_contact:
          snack = this.snack_bar.open("Eliminando contacto espere...");
          this.s_standart.destory(`purchase-department/providers/${event.id}/contacts/${event.data.id}`).subscribe(res=>{
            if(res.success){
              snack.dismiss();
              this.providers = res.data;
              this.snack_bar.open('Contacto eliminado con exito','OK',{duration:2000})
              console.log(res);
            }
          },err=>{
            console.log(err);  
            snack.dismiss();
          })
          break

      default:
        break;
    }
    // console.log(providers);    
    // this.providers = providers;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.suscribe_status.unsubscribe()
  }


  newInvoice(){
    let invoiceNew:invoice;
    this.forms_invoices.push(invoiceNew);
  }

  removeInvoice(index){
    this.forms_invoices.splice(index,1);
  }

  deleteInvoice(i){
    this.forms_invoices.splice(i,1);
  }

  captureImagenProduct(i):string | boolean{
   if(this.products[i].prestashop_products.length > 0){
     return this.products[i].prestashop_product[0].image
   }
   if(this.products[i].ml_infos.length > 0){
    return this.products[i].ml_infos[0].image
   }

   return 'assets/img/img_default_null.jpg';
  }

  addRowTableItem(){
    this.dialog.open(InvoiceItemModalComponent,{data:{id_import:100,id_invoice:100},disableClose:true})
  }

  editItem(i){

  }


  getProduct(event){
    this.products = event.data.data
  }

  publishNow(){
    if(this.form_publish.valid){
      this.spinner.show();
      let data_req = this.form_publish.value;
      data_req.estimated_date_first = formatDate(new Date(data_req.estimated_date_first),'yyyy/MM/dd','en');
      data_req.estimated_date_last = formatDate(new Date(data_req.estimated_date_last),'yyyy/MM/dd','en');

      this.s_standart.updatePut('purchase-department/imports/'+this.import.id+'/publish',this.form_publish.value).subscribe(res=>{
        console.log(res);
        this.spinner.hide();
      },err=>{
        // this.spinner.hide();
        console.log(err);
        
        this.spinner.hide();
      })
      
    }
  }


  // createProviderOrContact(event):void{
  //   switch (event) {
  //     case 'create_provider':
  //         if(event.hasOwnProperty('success') && event.success){
  //           this.s_standart.store("purchase-department/providers",event.data).subscribe(res=>{
  //             if(res.success){
  //               console.log(res);
             
  //               this.providers = res.data;
  //             }
  //           })
  //         }

  //       break;

  //       case 'create_contact':
  //       // this.dialog.open(CreateProviderOrContactComponent,{data:{title:"Crear Contacto",isProvider:false}}).beforeClosed().subscribe(res=>{
  //         // if(res.hasOwnProperty('success') && res.success){
  //           this.s_standart.store(`purchase-department/providers/${data.id}/contacts`,res.data).subscribe(res=>{
  //             if(res.success){
  //               console.log(res);
  //               this.new_provider.emit(res.data);
  //             }
  //           })
  //         }
  //       })
  //       break;
    
  //     default:
  //       break;
  //   }
  // }

}
