import { Product } from '../../../../../administracion_productos/products/interfaces/product';
import { Campaign } from '../../../campaign/interfaces/campaign';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { NgxPermissionsService } from 'ngx-permissions';
// import { IProduct } from '../../../../../../interfaces/iproducts';
import { MethodsHttpService } from '../../../../../../services/methods-http.service';
import { MatTableHelper } from '../../../../../../shared/class/mat-table-helper';
import { SimpleSearchComponent } from '../../../../../../shared/standalone-components/simple-search/simple-search.component';
import { SimpleSearchSelectorService } from '../../../../../../shared/standalone-components/simple-search/simple-search-selector.service';
import { Promotion } from '../../../campaign/interfaces/promotion';
// import { SearchCampaignDialogComponent } from '../../components/search-campaign-dialog/search-campaign-dialog.component';
import { getDurationPromotionArray, getStatusesPromotionArray, PROMOTION_STATUS_ACTIVE } from '../../constants/promotion-const';
import { PERMISSIONS_PROMOTIONS } from '../../permissions/promotions.permissions';

@Component({
  templateUrl: './index-promotions.component.html',
  styleUrls: ['./index-promotions.component.scss']
})
export class IndexPromotionsComponent extends MatTableHelper<Promotion> implements OnInit {
  protected columnsToDisplay: string[] = [
    'id', 'created_at', 'status', 'title', 'price_formated', 'products', 'duration_type', 'description', 'campaign'];
  @ViewChild(MatTable) table: MatTable<Promotion>;
  @ViewChild('campaignTemplate') campaignTemplate: TemplateRef<any>;
  permissions = PERMISSIONS_PROMOTIONS;

  url: string = 'catalogs/promotions';
  products: Product[] = [];
  campaigns: Campaign[] = [];

  formFilter = new FormGroup({
    status: new FormControl(PROMOTION_STATUS_ACTIVE),
    duration_type: new FormControl(null),
    'products[]': new FormControl<any[]>([]),
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

  removeProduct(product: Product) {
    const productIndex = this.products.findIndex((_product: Product) => _product.id === product.id);
    this.products.splice(productIndex, 1);
    this.formFilter.patchValue({ 'products[]': this.products });
  }

  removeCampaign(id: number) {
    const campaignIndex = this.campaigns.findIndex((campaign) => campaign.id === id);
    this.campaigns.splice(campaignIndex, 1);
    this.formFilter.patchValue({ 'campaigns[]': this.campaigns });
  }

  openSearchProducts(): void {
    this.chs.openDialog(
      SimpleSearchComponent,
      { 
      path: 'catalogs/promotions/products', 
      isMultiSelection: true,
      currentItemSelect: this.products,
    })
      .beforeClose().subscribe((res: any) => {
        if (!res) {
          return;
        }
        this.products = res.data;
        this.formFilter.patchValue({ 'products[]': this.products });
      });
  }

  openSearchCampaign(): void {
    this.chs.openDialogSelector({
        path: 'catalogs/campaigns',
        isMultiSelection: true,
        itemTemplateRef: this.campaignTemplate,
        currentItemSelect: this.campaigns,
      })
      .beforeClose().subscribe((res: any) => {
        if (!res) {
          return;
        }

        this.campaigns = res?.data;
        this.formFilter.patchValue({ 'campaigns[]': this.campaigns });
      });
  }

  deletePromotion(id: number) {
    const promotion = this.dataSource.find((item: Promotion) => item.id === id);
    if (promotion && promotion?.campaign) {
      const url = `catalogs/campaigns/${promotion.campaign.id}/promotions`;
      this.deleteData(id, url);
    }
  }

}
