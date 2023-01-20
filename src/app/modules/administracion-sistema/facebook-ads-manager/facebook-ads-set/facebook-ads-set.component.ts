import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CtableAndPaginator } from '../../../../class/ctable-and-paginator';
import { HeaderSearchComponent } from '../../../../components/header-search/header-search.component';
import { STATUS_FACEBOOK } from '../../../../Objects/ObjectMatchs';
import { StandartSearchService } from '../../../../services/standart-search.service';
import { FacebookAdsModalComponent } from '../facebook-ads-modal/facebook-ads-modal.component';

interface IfacebookSet {
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
    products: {
      id: number;
      name: string;
      description: string;
      code: string;
      available: number;
      last_prices: any[];
      pivot: {
        facebook_campaign_ad_id: number;
        product_id: number;
      };
    }[];
  };
  stock_status: 'WARNING' | 'GOOD' | 'DANGER';
  products: [
    {
      id: number;
      name: string;
      description: string;
      code: string;
      available: number;
      last_prices: any[];
      pivot: {
        facebook_campaign_ad_id: number;
        product_id: number;
      };
    }
  ];
}

@Component({
  selector: 'app-facebook-ads-set',
  templateUrl: './facebook-ads-set.component.html',
  styleUrls: ['./facebook-ads-set.component.css'],
})
export class FacebookAdsSetComponent
  extends CtableAndPaginator<IfacebookSet>
 {
  @ViewChild(HeaderSearchComponent) headerComponent: HeaderSearchComponent;
  override displayedColumns: string[] = [
    // "add",
    'state',
    'image',
    'riesgo',
    'name',
    'min_stock',
    'start',
    'status_effective',
    'acciones',
  ];
  //#region DATA FILTER FUN
  @Input() account_id: number = 0;
  spinnerTable: string = 'spinner_table';
  min: any = '';
  max: any = '';
  status: number = 3;
  urlData: string = 'facebook-ads/' + this.account_id + '/campaigns-set';
  status_object = STATUS_FACEBOOK;
  //#endregion
  constructor(
    public activated_route: ActivatedRoute,
    public override s_standart: StandartSearchService,
    public override snack_bar: MatSnackBar, private dialog: MatDialog,
    public override ngx_spinner: NgxSpinnerService
  ) {
    super();
  }

  applyFilter() {
    if (this.min > this.max) {const aux = this.min; this.min = this.max; this.max = aux; }
    this.headerComponent.searchBar();
  }

  changeState(id, event): void {
    this.s_standart.updatePut('admin/facebook-ads/campaignsAd/' + id + '/toggle-enable', {}).subscribe(() => {
    },
    () => {
      event.target.checked = !event.target.checked;
    }
    );
  }

  viewProduct(id): void {
    const products = this.ELEMENT_DATA.find(x => x.id === id);
    if (products) {
      this.dialog.open(FacebookAdsModalComponent, {data: {products: products.products_set.products}});
    }
  }


}
