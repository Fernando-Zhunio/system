import { Component, OnInit, ViewChild } from '@angular/core';
import { StandartSearchService } from '../../../services/standart-search.service';
import { FacebookAdsCampaignComponent } from './facebook-ads-campaign/facebook-ads-campaign.component';
import { FacebookAdsSetComponent } from './facebook-ads-set/facebook-ads-set.component';

interface IaccountsFb {
  id: number;
  name: string;
  fb_id: string;
  created_at: string;
  updated_at: string;
}


@Component({
  selector: 'app-facebook-ads-manager',
  templateUrl: './facebook-ads-manager.component.html',
  styleUrls: ['./facebook-ads-manager.component.css'],
})
export class FacebookAdsManagerComponent implements OnInit {

  @ViewChild(FacebookAdsCampaignComponent) facebookCampaign:FacebookAdsCampaignComponent;
  @ViewChild(FacebookAdsSetComponent) facebookSet:FacebookAdsSetComponent;
  constructor(
    public s_standart: StandartSearchService,
  ) {

  }

  urlData: string


  accounts: IaccountsFb[] = [];
  currentAccount: any;
  ngOnInit(): void {
    this.s_standart.index('admin/facebook-ads').subscribe((res) => {
      this.accounts = res.data.accounts;
      this.currentAccount = Number.parseInt(res.data.preference);
      this.urlData = 'admin/facebook-ads/' + this.currentAccount + '/campaigns';
      this.facebookCampaign.headerComponent.url = this.urlData;
      this.facebookCampaign.headerComponent.searchBar();
    });

  }

  changedTag(event): void {
    if (event.index === 1) {
      const ids: any = [];
      this.facebookCampaign.searchItems.forEach(value=>{
        ids.push(value.id!);
      });
      this.facebookSet.headerComponent.url = 'admin/facebook-ads/' + this.currentAccount + '/campaigns-set';
      this.facebookSet.headerComponent.filter_data = {'array[]': ids };
      this.facebookSet.headerComponent.searchBar();

      // this.facebookSet.headerComponent.filter_data =
      // ?status=3&name=&name_product=&page=1&num_products=10"
    }

  }
}
