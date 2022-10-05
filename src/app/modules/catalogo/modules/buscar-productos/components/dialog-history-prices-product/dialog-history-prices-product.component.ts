import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MethodsHttpService } from '../../../../../../services/methods-http.service';
import { Promotion } from '../../../campaign/interfaces/promotion';
import { HistoryPriceProduct } from '../../interfaces/history-price-product';

@Component({
  selector: 'app-dialog-history-prices-product',
  templateUrl: './dialog-history-prices-product.component.html',
  styleUrls: ['./dialog-history-prices-product.component.scss']
})
export class DialogHistoryPricesProductComponent implements OnInit, OnDestroy {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private methodsHttp: MethodsHttpService) { }
  prices: HistoryPriceProduct[] = [];
  promotions: Promotion[] = [];
  isLoading: boolean = false;
  subscription: Subscription

  ngOnInit() {
    this.isLoading = true;
   this.subscription =  this.methodsHttp.methodGet<{prices: HistoryPriceProduct[], promotions: Promotion[]}>(`catalogs/products/${this.data.product.id}/history-prices`).subscribe((res) => {
      if (res?.success) {
        this.prices = res.data.prices;
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

}
