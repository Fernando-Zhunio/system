import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { InvoiceItemModalComponent } from '../../../components/modals/invoice-item-modal/invoice-item-modal.component';
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

  isLoadingProvider:boolean = false;
  providers= [];
  state_import:'edit'|'create'='create';
  constructor(private active_route:ActivatedRoute, private spinner:NgxSpinnerService, private s_standart:StandartSearchService,private bottomSheet:MatBottomSheet,private dialog:MatDialog) { }
  products=[];
  form_import:FormGroup = new FormGroup({
    origin:new FormControl("",[Validators.required]),
    sequence:new FormControl("",),
  });

  form_publish: FormGroup = new FormGroup({
    estimated_date_first:new FormControl(null,[Validators.required]),
    estimated_date_last:new FormControl(null,[Validators.required]),
  })

  forms_invoices=[];
  import:Iimportation = null;
  origins = [];
  origen_current:string;
  files: NgxFileDropEntry[] = [];
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
    });
     this.suscribe_status = this.active_route.data.subscribe(res=>{
      console.log(res);
      this.state_import = res.state;
      this.state = this.state_import;

      if(res.state == "edit"){
        this.spinner.show();
        const id = this.active_route.params.subscribe(res=>{
          console.log(res);
          this.s_standart.show("purchase-department/imports/"+res.id+"/edit").subscribe((res:{success:boolean,data:Iimportation})=>{
            console.log(res);
            this.spinner.hide();
            this.import = res.data;
            this.forms_invoices = this.import.invoices;
          },err=>{this.spinner.hide()})
          
        })
      }
    });
    // console.log(state);
    
  }

  createimport(){
    console.log(this.form_import.value);
    if(this.form_import.valid){
      this.isLoadGenerate =true;
      console.log(this.form_import.value);
     
      this.s_standart.store("purchase-department/imports",this.form_import.value).subscribe((res:{success:boolean,data:Iimportation})=>{
        console.log(res);
        if(res.success){
          this.import = res.data;
          this.state_import = "edit"
        }
        this.isLoadGenerate = false;
      },err=>{this.isLoadGenerate = false})
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.suscribe_status.unsubscribe()
  }


  newInvoice(){
  
    this.forms_invoices.push("add");
  }

  removeInvoice(index){
    this.forms_invoices.splice(index,1);
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        const reader = new FileReader();

        console.log(droppedFile);

        fileEntry.file((file: File) => {
          // if (file.type == "image/jpeg" || file.type == "image/png") {
          //   reader.readAsDataURL(file);
          //   reader.onload = () => {
          //     this.src1 = reader.result;
          //     this.arrayImagen.push({
          //       file,
          //       id: this.id,
          //       base64: this.src1,
          //       relativePath: droppedFile.relativePath,
          //     });
          //   };
          //   console.log(file);
          //   this.id++;
          //   console.log(this.arrayImagen);
          // } else {
          //   SwalService.swalToast(
          //     "Este tipo de archivo no es una imagen valida",
          //     "error"
          //   );
          // }

          // console.log(droppedFile.relativePath, file);
          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)
 
          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })
 
          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  // searchProvider(i):void{
  //   this.isLoadingProvider = true;
  //   let search = this.forms_invoices[i].formInvoice.controls['provider_id'].value;
  //   this.s_standart.searchOnly('purchase-department/providers/search',search).subscribe(res=>{
  //     console.log(res);
  //     this.providers = res;
  //     this.isLoadingProvider = false;
  //   },err=>{
  //     this.isLoadingProvider = false;
  //   })
  // }

  // saveInvoice(i):void{
  //   if(this.forms_invoices[i].formInvoice.valid){
  //     console.log(this.forms_invoices[i].formInvoice.value);
  //     if(this.forms_invoices[i].formInvoice.controls['date_purchase'].value != null){
  //       let data_req = this.forms_invoices[i].formInvoice.value;
  //       data_req.date_purchase = formatDate(new Date(data_req.date_purchase),'yyyy/MM/dd','en');
  //       console.log(this.forms_invoices[i].formInvoice.value);
  //       console.log(data_req);
  //     }
  //     this.s_standart.store('purchase-department/imports/'+this.import.id+'/invoices',this.forms_invoices[i].formInvoice.value).subscribe(res=>{
  //       if(res.success){
  //         console.log(res);
  //         this.forms_invoices[i].dataImport = res.data
  //         this.forms_invoices[i].formInvoice.controls['id'].setValue(res.data.id)
  //         this.forms_invoices[i].formInvoice.disable({emitEvent:true});
  //         this.forms_invoices[i].state = "formMore"
  //       }
  //       console.log(this.forms_invoices[i].formInvoice.value);
  //     })
  //   }
  // }
  // closeInvoice(i){
  //   this.forms_invoices.splice(i,1);
  // }

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

  // cancelEditInvoice(i){
  //   this.forms_invoices[i].state = 'formMore'
  // }

  // editInvoice(i){
  //   this.forms_invoices[i].formInvoice.enable({emitEvent:true})
  //   this.forms_invoices[i].state = 'edit'
  // }



  // openActionProvider(i){
  //   let id = this.forms_invoices[i].formInvoice.controls['provider_id'].value;
  //   const indexProvider = this.providers.findIndex(x=>x.id == id);
  //   let data = null;
  //   if(indexProvider != -1){
  //     data = this.providers[indexProvider]
  //   }
  //   const bottomSheetRef = this.bottomSheet.open(ActionProviderComponent, {
  //     data
  //   });
  // }

  addRowTableItem(){
    this.dialog.open(InvoiceItemModalComponent,{data:{id_import:100,id_invoice:100},disableClose:true})
  }

  editItem(i){

  }
  // removeItem(i){
  //   this.ELEMENT_DATA.splice(i,1);
  //   this.dataSource =  new MatTableDataSource<TableItemInvoice>(this.ELEMENT_DATA);
  // }

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

  // changeFormatDate(date){
  //   // if(this.formInvoice.controls['date_purchase'].value != null){
  //     // let data_req = this.formInvoice.value;
  //     // data_req.date_purchase = formatDate(new Date(data_req.date_purchase),'yyyy/MM/dd','en');
  //     data_req.date_purchase = formatDate(new Date(data_req.date_purchase),'yyyy/MM/dd','en');
  //   //  console.log(this.formInvoice.value);
  //     // console.log(data_req);
  //   }
  // }


}
