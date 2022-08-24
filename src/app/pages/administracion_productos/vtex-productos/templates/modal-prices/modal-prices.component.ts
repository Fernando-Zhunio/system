import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StandartSearchService } from './../../../../../services/standart-search.service';
import { Subscription } from 'rxjs';
import { SwalService } from './../../../../../services/swal.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { vtexResponseSku } from '../../../../../interfaces/vtex/iproducts';
import { IvtexPrices } from '../../../../../interfaces/vtex/ivtex-prices';

// export interface IvtexPrice {
//   itemId: string;
//   listPrice: any;
//   costPrice: number;
//   markup: number;
//   basePrice: number;
//   fixedPrices: any[];
// }

export enum EStatus {
  create,
  edit,
  view,
  notFound,
  loading
}
@Component({
  selector: 'app-modal-prices',
  templateUrl: './modal-prices.component.html',
  styleUrls: ['./modal-prices.component.css'],
})
export class ModalPricesComponent implements OnInit {
  public e_status = EStatus;
  public sku: vtexResponseSku;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { sku: vtexResponseSku },
    private s_standart: StandartSearchService,
    private dialogRef: MatDialogRef<ModalPricesComponent>,
    private router: Router,
    private s_spinner: NgxSpinnerService,
  ) {
    this.sku = data.sku;
  }

  vtexPriceSku: IvtexPrices;
  status: EStatus = EStatus.loading;
  //  "create" | "edit" | "view" | "not found" | "loading" = "loading";
  // isLoad: boolean = false;
  suscriptionPrices: Subscription;
  ngOnInit(): void {
    this.searchVtexPricesSku();
  }

  searchVtexPricesSku(): void {
    this.status = EStatus.loading;
    // this.s_spinner.show("loader-modal-prices");
    this.suscriptionPrices = this.s_standart
      .show('products-admin/vtex/price-vtex/' + this.sku.vtex_api_id)
      .subscribe(
        (res) => {
          if ((res && res.hasOwnProperty('success'), res.success)) {
            this.vtexPriceSku = res.data;
            this.status = EStatus.view;
          }
        },
        () => {
          this.status = EStatus.notFound;
        }
      );
  }

  closeModal(event = null): void {
    if (this.suscriptionPrices) { this.suscriptionPrices.unsubscribe(); }
    if (event) {
      SwalService.swalFire({
        title: 'Guardado con exito',
        icon: 'success',
        position: 'center',
        timer: 1500,
      });
    }
    this.dialogRef.close();
  }

  editPrice(): void {
    this.status = EStatus.edit;
  }
  createPrice(): void {
    this.status = EStatus.create;
  }
  viewPrice():void{
    this.status = EStatus.view;

  }

  goVtexPrices(): void {
    this.router.navigate([
      'admin-products/vtex-products/vtex-price-create',
      this.sku.vtex_api_id,
    ]);
    this.dialogRef.close();
  }
}
