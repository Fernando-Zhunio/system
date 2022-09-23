import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StandartSearchService } from '../../../../services/standart-search.service';
import { Ispecification } from './../../../../interfaces/vtex/ispecification';
import { IvtexSkuStore } from './../../../../interfaces/vtex/iproducts';
import { Subscription } from 'rxjs';
import { SwalService } from './../../../../services/swal.service';

@Component({
  selector: 'app-modal-sku',
  templateUrl: './modal-sku.component.html',
  styleUrls: ['./modal-sku.component.css']
})
export class ModalSkuComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {id},private s_standart:StandartSearchService, private dialogRef: MatDialogRef<ModalSkuComponent>) { }

  vtexSpecificationsSkus:Ispecification
  item:IvtexSkuStore;
  isLoad:boolean = false;
  suscriptionSpecification:Subscription;
  ngOnInit(): void {
    this.searchVtexSku();
  }

   searchVtexSku():void{
     this.isLoad = true;
    this.suscriptionSpecification = this.s_standart.show('products-admin/vtex/update-modal/'+this.data.id+'/edit').subscribe(res=>{
      if(res && res.hasOwnProperty('success'), res.success){
        this.item = res.data.sku;
        this.vtexSpecificationsSkus = res.data.specification.specification_skus;
        this.isLoad = false;
      }
     },()=>{this.isLoad = false;})
   }

   closeModal(event=null):void{
     if(this.suscriptionSpecification)this.suscriptionSpecification.unsubscribe();
     if(event) SwalService.swalFire({title:'Guardado con exito',icon:'success',position:"center",timer:1500});
     this.dialogRef.close();
   }
}
