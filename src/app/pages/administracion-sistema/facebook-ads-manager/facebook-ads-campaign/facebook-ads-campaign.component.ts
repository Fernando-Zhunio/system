import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CtableAndPaginator } from '../../../../class/ctable-and-paginator';
import { HeaderSearchComponent } from '../../../../components/header-search/header-search.component';
import { IpermissionStandart } from '../../../../interfaces/ipermission-standart';
import { StandartSearchService } from '../../../../services/standart-search.service';
import { FacebookAdsModalComponent } from '../facebook-ads-modal/facebook-ads-modal.component';

interface IaccountsFb {
  id: number;
  name: string;
  fb_id: string;
  created_at: string;
  updated_at: string;
}

interface IfacebookCampaign {
  id: number;
  name: string;
  status: string;
  effective_status: string;
  created_time: string;
  start_time: string;
  stop_time: string;
  fb_id: string;
  facebook_ad_account_id: number;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  products: {
    min_product: number;
    products: [
      {
        id: number;
        name: string;
        description: string;
        code: string;
        available: number;
        last_prices: [];
        pivot: {
          facebook_campaign_ad_id: number;
          product_id: number;
        };
      }
    ];
  };
  ads_by_stock_status_count: {
    GOOD: number;
    WARNING: number;
    DANGER: number;
  };
  ad_sets: [
    {
      id: number;
      name: string;
      fb_id: string;
      status: string;
      effective_status: string;
      facebook_campaign_id: number;
      created_at: string;
      updated_at: string;
      is_active: boolean;
      products: [
        {
          id: number;
          name: string;
          description: string;
          code: string;
          available: number;
          last_prices: [];
          pivot: {
            facebook_campaign_ad_id: number;
            product_id: number;
          };
        }
      ];
      ads: [
        {
          id: number;
          name: string;
          fb_id: string;
          fb_creative_id: string;
          status: string;
          effective_status: string;
          thumbnail_url: string;
          created_time: string;
          min_stock: number;
          facebook_campaign_ad_set_id: number;
          created_at: string;
          updated_at: string;
          is_active: true;
          products_set: {
            min_product: number;
            sum_product: number;
            products: [
              {
                id: number;
                name: string;
                description: string;
                code: string;
                available: number;
                last_prices: [];
                pivot: {
                  facebook_campaign_ad_id: number;
                  product_id: number;
                };
              }
            ];
          };
          stock_status: string;
          products: [
            {
              id: number;
              name: string;
              description: string;
              code: string;
              available: number;
              last_prices: [];
              pivot: {
                facebook_campaign_ad_id: number;
                product_id: number;
              };
            }
          ];
        }
      ];
    }
  ];
}
@Component({
  selector: 'app-facebook-ads-campaign',
  templateUrl: './facebook-ads-campaign.component.html',
  styleUrls: ['./facebook-ads-campaign.component.css']
})
export class FacebookAdsCampaignComponent extends CtableAndPaginator<IfacebookCampaign> implements OnInit {

  @ViewChild(HeaderSearchComponent) headerComponent: HeaderSearchComponent;
  @Output() arrayIds:EventEmitter<any> = new EventEmitter();
  searchItems:{id:number,name:string}[] = [];
  idSearchItems:number[] = [];
  @Input() account_id;
  @Input() urlData;
  accounts: IaccountsFb[] = [];
  currentAccount: any;
  permissions: IpermissionStandart;
  wordMain: string = "Facebook Ads";
  urlDelete: string = "admin/roles/";
  displayedColumns: string[] = [
    "add",
    "state",
    "riesgo",
    "name",
    "start",
    "stop",
    "acciones"
  ];

  //#region DATA FILTER FUN
  min:any = '';
  max:any = '';
  status:number= 3;
  //#endregion

  name_spinner:string = "spinner_table";


  constructor( public activated_route: ActivatedRoute,
    public s_standart: StandartSearchService,
    public snack_bar: MatSnackBar,private dialog:MatDialog,public ngx_spinner:NgxSpinnerService) { super(); }

  ngOnInit(): void {
    this.activated_route.data.subscribe((res) => {
      this.permissions = res.permissions.all;
    });
  }

  addSearchCampaign(id):void{
    const exist_item = this.searchItems.find(x=>x.id == id);
    if(exist_item)return;
    const item_add = this.ELEMENT_DATA.find(x=>x.id == id);
    console.log({item_add,id});
    if(item_add){
      this.searchItems.push({id:item_add.id,name:item_add.name});
      // this.idSearchItems.push(item_add.id)
    }
  }

  removeSearchCampaign(id):void{
    const remove_item_index = this.searchItems.findIndex(x=>x.id == id);
    if(remove_item_index != -1){
      this.searchItems.splice(remove_item_index,1);

      // this.searchItems.splice(remove_item_index,1);
    }
  }
  changeState(id,event):void{
    console.log(event.target.checked,id);
    this.s_standart.updatePut('admin/facebook-ads/campaigns/'+id+'/toggle-enable',{}).subscribe(res=>{
      console.log(res);
    },
    err=>{
      event.target.checked = !event.target.checked
    }
    )
  }

  applyFilter() {
  this.headerComponent.url = "admin/facebook-ads/" + this.account_id + "/campaigns";
    if(this.min > this.max) {const aux = this.min;this.min=this.max;this.max=aux}
    this.headerComponent.searchBar();
  }

  viewProduct(id):void{
    const products = this.ELEMENT_DATA.find(x=>x.id ==id);
    console.log(products.products.products);
    if(products){
      this.dialog.open(FacebookAdsModalComponent,{data:{products:products.products.products}})
    }
  }

  // loaderTable(state):void{
  //   console.log({state});
  // state ? this.ngx_spinner.show(this.name_spinner):this.ngx_spinner.hide(this.name_spinner);
  // }

}
