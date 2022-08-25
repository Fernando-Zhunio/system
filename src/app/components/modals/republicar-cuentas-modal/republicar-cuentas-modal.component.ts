import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ImlInfo } from '../../../interfaces/iml-info';
import { StandartSearchService } from '../../../services/standart-search.service';
import { SwalService } from '../../../services/swal.service';

@Component({
  selector: 'app-republicar-cuentas-modal',
  templateUrl: './republicar-cuentas-modal.component.html',
  styleUrls: ['./republicar-cuentas-modal.component.css']
})
export class RepublicarCuentasModalComponent implements OnInit, OnDestroy {

  constructor( @Inject(MAT_DIALOG_DATA) public data: {id}, private s_standart: StandartSearchService) { }
  suscrition: Subscription;
  form_republicar: FormGroup = new FormGroup({
    price: new FormControl(null, [Validators.required]),
    quantity: new FormControl(null, [Validators.required]),
    listing_type_id: new FormControl(null, [Validators.required]),
  });
  ml_info: ImlInfo;
  isLoad: boolean = false;
  isFirst: boolean = true;
  companies_access: any[] = [];
  listingTypes: any[] = [];
  ngOnInit(): void {
   this.loadDataOfServe();
  }

  loadDataOfServe(): void{
    this.isLoad = true;
    this.suscrition = this.s_standart.show(`catalogs/publications/${this.data.id}/relist`).subscribe(res => {

      if (res && res.hasOwnProperty('success') && res.success){
        if (res.data.product){
          this.ml_info = res.data.product;
          this.companies_access = res.data.product.companies_access;
          this.listingTypes = res.data.listingTypes;
          this.form_republicar.setValue({
            price: this.ml_info.price,
            quantity: this.ml_info.stock.available_quantity,
            listing_type_id: this.ml_info.listing_type_id
          });
        }



      }
      this.isLoad = false;
      this.isFirst = false;
    },
      () => {this.isLoad = false; this.isFirst = false; });
  }


  ngOnDestroy(): void{
    if (this.suscrition){this.suscrition.unsubscribe();}
  }

  saveInServer(): void{
    if (this.form_republicar.valid) {
      this.isLoad = true;
      const url = `catalogs/publications/${this.data.id}/relist`;
      this.s_standart.store(url, this.form_republicar.value).subscribe(() => {
        this.isLoad = false;
      }, () => {this.isLoad = false; });
    } else {
      SwalService.swalToast('Necesita completar todos los campos', 'error');
    }
  }

}
