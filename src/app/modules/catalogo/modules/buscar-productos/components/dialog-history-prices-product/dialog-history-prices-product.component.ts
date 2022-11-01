import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxPermissionsService } from 'ngx-permissions';
import { Subscription } from 'rxjs';
import { MethodsHttpService } from '../../../../../../services/methods-http.service';
import { groupBy } from '../../../../../../shared/class/tools';
import { Promotion } from '../../../campaign/interfaces/promotion';
import { PERMISSIONS_IMPORTS } from '../../../imports/class/permissions-imports';
import { ShowImportDialogComponent } from '../../../imports/components/show-import-dialog/show-import-dialog.component';
import { HistoryPriceProduct } from '../../interfaces/history-price-product';

type HistoryPriceProductGroup = {
  [key: string]: HistoryPriceProduct[]
}
@Component({
  selector: 'app-dialog-history-prices-product',
  templateUrl: './dialog-history-prices-product.component.html',
  styleUrls: ['./dialog-history-prices-product.component.scss']
})

export class DialogHistoryPricesProductComponent implements OnInit, OnDestroy {

  constructor(private _nps: NgxPermissionsService, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, private mhs: MethodsHttpService) { }
  prices: HistoryPriceProductGroup;
  promotions: Promotion[] = [];
  isLoading: boolean = false;
  subscription: Subscription;
  isCanLookImport: boolean = false;

  ngOnInit() {
  this.isLoading = true;
  this._nps.hasPermission(PERMISSIONS_IMPORTS.index).then((response) => {
    this.isCanLookImport = response;
  });
  this.subscription =  this.mhs.methodGet<{prices: HistoryPriceProduct[], promotions: Promotion[]}>(`catalogs/products/${this.data.product.id}/history-prices`).subscribe((res) => {
      if (res?.success) {
        this.prices = res.data.prices?.length > 0 ? groupBy(res.data.prices, 'price_group_id') : null;
        console.log(this.prices);
        this.promotions = res.data.promotions;
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  openDialogShowImport(id: number) {
    this.dialog.open(ShowImportDialogComponent, {
      data: {
        importId: id
      }
    })
  }

}
