import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CtableAndPaginator } from '../../../class/ctable-and-paginator';
import { HeaderSearchComponent } from '../../../components/header-search/header-search.component';
import { IpermissionStandart } from '../../../interfaces/ipermission-standart';
import { StandartSearchService } from '../../../services/standart-search.service';
import { FacebookAdsCampaignComponent } from './facebook-ads-campaign/facebook-ads-campaign.component';
import { FacebookAdsSetComponent } from './facebook-ads-set/facebook-ads-set.component';

// "preference": "3",
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
  // @ViewChild(FacebookAdsSetComponent) facebookCampaign:FacebookAdsCampaignComponent;
  // @ViewChild(FacebookAdsSetComponent) facebookSet:FacebookAdsSetComponent;
  constructor(
    // public activated_route: ActivatedRoute,
    public s_standart: StandartSearchService,
    // public snack_bar: MatSnackBar
  ) {
    // super();
  }

  // wordMain: string = "Cuenta Ml";
  // urlDelete: string = "admin/roles/";
  // displayedColumns: string[] = [
  //   "add",
  //   "state",
  //   "riesgo",
  //   "name",
  //   "start",
  //   "stop",
  //   "acciones"
  //   // "date_update",
  //   // "acciones",
  // ];

  // @ViewChild(HeaderSearchComponent) headerComponent: HeaderSearchComponent;
  // permissions: IpermissionStandart;
  // form_facebook_ads: FormGroup = new FormGroup({
  //   status: new FormControl(''),
  //   name: new FormControl(''),
  //   name_product: new FormControl(''),
  //   page: new FormControl(''),
  // });

  // searchItems:IfacebookCampaign[] = [];
  urlData: string
  // = "admin/facebook-ads/" + this.currentAccount + "/campaigns";
  // accounts: IaccountsFb[] = [];
  // currentAccount: any;

  // //#region DATA FILTER FUN
  // min:any = '';
  // max:any = '';
  // status:number= 3;

  // //#endregion

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
      const ids = [];
      this.facebookCampaign.searchItems.forEach(value=>{
        ids.push(value.id);
      });
      this.facebookSet.headerComponent.url = 'admin/facebook-ads/' + this.currentAccount + '/campaigns-set';
      this.facebookSet.headerComponent.filter_data = {'array[]': ids };
      this.facebookSet.headerComponent.searchBar();

      // this.facebookSet.headerComponent.filter_data =
      // ?status=3&name=&name_product=&page=1&num_products=10"
    }

  }
}
