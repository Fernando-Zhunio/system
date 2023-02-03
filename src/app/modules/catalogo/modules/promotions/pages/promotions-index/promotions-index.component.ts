import { Campaign } from './../../../campaign/interfaces/campaign';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { NgxPermissionsService } from 'ngx-permissions';
// import { PERMISSION_CAMPAIGNS } from '../../../../../../class/permissions-modules';
import { IProduct } from '../../../../../../interfaces/iproducts';
import { MethodsHttpService } from '../../../../../../services/methods-http.service';
import { MatTableHelper } from '../../../../../../shared/class/mat-table-helper';
import { SimpleSearchComponent } from '../../../../../../shared/standalone-components/simple-search/simple-search.component';
import { SimpleSearchSelectorService } from '../../../../../../shared/standalone-components/simple-search/simple-search-selector.service';
import { Promotion } from '../../../campaign/interfaces/promotion';
// import { SearchCampaignDialogComponent } from '../../components/search-campaign-dialog/search-campaign-dialog.component';
import { getDurationPromotionArray, getStatusesPromotionArray, PROMOTION_STATUS_ACTIVE } from '../../constants/promotion-const';
import { PERMISSIONS_PROMOTIONS } from '../../permissions/promotions.permissions';

@Component({
  templateUrl: './promotions-index.component.html',
  styleUrls: ['./promotions-index.component.scss']
})
export class PromotionsIndexComponent extends MatTableHelper<Promotion> implements OnInit {
  protected columnsToDisplay: string[] = [
    'id', 'created_at', 'status', 'title', 'price_formated', 'products', 'duration_type', 'description', 'campaign'];
  @ViewChild(MatTable) table: MatTable<Promotion>;
  @ViewChild('campaignTemplate') campaignTemplate: TemplateRef<any>;
  permissions = PERMISSIONS_PROMOTIONS;

  // urlSearch: string = 'catalogs/promotions';
  url: string = 'catalogs/promotions';
  products = [];
  campaigns: Campaign[] = [];
  // filterData: any = {
  //   status: PROMOTION_STATUS_ACTIVE,
  //   'products[]': [],
  //   duration_type: null,
  //   'campaigns[]': []
  // }

  formFilter = new FormGroup({
    status: new FormControl(PROMOTION_STATUS_ACTIVE),
    duration_type: new FormControl(null),
    'products[]': new FormControl([]),
    'campaigns[]': new FormControl<any>([])
  })

  statuses: string[] = [];
  durations: string[] = [];

  constructor(private nps: NgxPermissionsService, private chs: SimpleSearchSelectorService, protected mhs: MethodsHttpService) {
    super();
  }
  ngOnInit(): void {
    this.statuses = getStatusesPromotionArray();
    this.durations = getDurationPromotionArray();
    this.permittedEdition();
  }

  permittedEdition(): void {
    const permitted = this.permissions.edit.some(e => {
      return this.nps.hasPermission(e);
    })
    if (!permitted) {
      return;
    }
    this.columnsToDisplay.push('actions');
  }

  removeProduct(id: number) {
    const productIndex = this.products.findIndex((product: IProduct) => product.id === id);
    this.products.splice(productIndex, 1);
  }

  removeCampaign(id: number) {
    const campaignIndex = this.campaigns.findIndex((campaign) => campaign.id === id);
    this.campaigns.splice(campaignIndex, 1);
    this.formFilter.patchValue({ 'campaigns[]': this.campaigns.map(e => e.id) });
  }

  openSearchProducts(): void {
    this.chs.openDialog(
      SimpleSearchComponent,
      { path: 'catalogs/promotions/products', isMultiSelection: true })
      .beforeClose().subscribe((res: any) => {
        if (!res) {
          return;
        }
        this.products = res.data;
      });
  }

  openSearchCampaign(): void {
    this.chs.openDialogSelector({
        path: 'catalogs/campaigns',
        isMultiSelection: true,
        itemTemplateRef: this.campaignTemplate
      })
      .beforeClose().subscribe((res: any) => {
        // const data = res?.data;
        if (!res) {
          return;
          // this.campaigns.set(data.id, data);
          // this.setFilterDataCampaign();
        }

        this.campaigns = res?.data;
        this.formFilter.patchValue({ 'campaigns[]': this.campaigns.map(e => e.id) });

      });
  }

  // setFilterDataProducts() {
  //   this.filterData['products[]'] = Array.from(this.products.keys());
  // }

  // setFilterDataCampaign() {
  //   this.filterData['campaigns[]'] = Array.from(this.campaigns.keys());
  // }

  deletePromotion(id: number) {
    const promotion = this.dataSource.find((item: Promotion) => item.id === id);
    if (promotion && promotion?.campaign) {
      const url = `catalogs/campaigns/${promotion.campaign.id}/promotions`;
      this.deleteData(id, url);
    }
  }

}
