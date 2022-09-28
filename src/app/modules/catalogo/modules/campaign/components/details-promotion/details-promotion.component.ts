import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Subscription } from 'rxjs';
import { MethodsHttpService } from '../../../../../../services/methods-http.service';
import { SharedService } from '../../../../../../services/shared/shared.service';
import { Promotion } from '../../interfaces/promotion';

@Component({
  selector: 'app-details-promotion',
  templateUrl: './details-promotion.component.html',
  styleUrls: ['./details-promotion.component.scss']
})
export class DetailsPromotionComponent implements OnInit {

  constructor(private methodsHttp: MethodsHttpService, @Inject(MAT_BOTTOM_SHEET_DATA) public data: {campaignId: number, promotionId: number} ) { }
  isLoading: boolean = false;
  subscription: Subscription;
  promotion: Promotion

  ngOnInit() {
    this.isLoading = true;
    SharedService.disabled_loader = true;
    this.subscription = this.methodsHttp.methodGet(`catalogs/campaigns/${this.data.campaignId}/promotions/${this.data.promotionId}`).subscribe((res: any) => {
      this.promotion = res.data;
      console.log(this.promotion);
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    
  }

}
