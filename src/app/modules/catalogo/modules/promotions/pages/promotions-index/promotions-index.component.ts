import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { NgxPermissionsService } from 'ngx-permissions';
import { PermissionCampaigns } from '../../../../../../class/permissions-modules';
import { IProduct } from '../../../../../../interfaces/iproducts';
import { MethodsHttpService } from '../../../../../../services/methods-http.service';
import { MatTableHelper } from '../../../../../../shared/class/mat-table-helper';
import { SearchProductsDialogComponent } from '../../../../../../shared/search-products-dialog/search-products-dialog.component';
import { CreateHostService } from '../../../../../../shared/services/create-host.service';
import { Promotion } from '../../../campaign/interfaces/promotion';
import { SearchCampaignDialogComponent } from '../../components/search-campaign-dialog/search-campaign-dialog.component';
import { getDurationPromotionArray, getStatusesPromotionArray } from '../../constants/promotion-const';
 
@Component({
  templateUrl: './promotions-index.component.html',
  styleUrls: ['./promotions-index.component.scss']
})
export class PromotionsIndexComponent extends MatTableHelper<any> implements OnInit  {
  protected columnsToDisplay: string[] = [
    'id', 'created_at', 'status', 'title', 'price_formated', 'products', 'duration_type', 'description', 'campaign'];
  @ViewChild(MatTable) table: MatTable<Promotion>;
  permissions = PermissionCampaigns;

  url: string = 'catalogs/promotions';
  products: Map<number, IProduct> = new Map<number, IProduct>();
  campaigns: Map<number, IProduct> = new Map<number, IProduct>();
  filterData: any = {
    status: null,
    'products[]': [],
    duration_type: null,
    'campaigns[]': []
  }


  statuses: string[] = [];
  durations: string[] = [];

  constructor(private nps: NgxPermissionsService, private chs: CreateHostService, protected methodsHttp: MethodsHttpService/* , private dialogProduct: DialogProductsService */) {
    super();
  }
  ngOnInit(): void {
    this.nps.hasPermission(this.permissions.edit).then((res: boolean) => {
      if (res) {
        this.columnsToDisplay.push('actions');
      }
    })
    this.statuses = getStatusesPromotionArray();
    this.durations = getDurationPromotionArray();
  }

  removeProduct(id: number) {
    this.products.delete(id);
    this.setFilterDataProducts();
  }

  removeCampaign(id: number) {
    this.campaigns.delete(id);
    this.setFilterDataCampaign();
  }

  openSearchProducts(): void {
    this.chs.injectComponent(
      SearchProductsDialogComponent,
      { url: 'catalogs/promotions/products', productsSelected: this.products })
      .beforeClose().subscribe((res: any) => {
        const data = res?.data;
        if (data && data.size > 0) {
          data.forEach((value: IProduct) => {
            this.products.set(value.id, value);
          });
          this.setFilterDataProducts();
        }
      });
  }

  openSearchCampaign(): void {
    this.chs.injectComponent(
      SearchCampaignDialogComponent,
      { url: 'catalogs/campaigns', campaign: this.campaigns })
      .beforeClose().subscribe((res: any) => {
        console.log(res);
        const data = res?.data;
        if (data && data.size > 0) {
          data.forEach((value: IProduct) => {
            this.campaigns.set(value.id, value);
          });
          this.setFilterDataCampaign();
        }
      });
  }

  setFilterDataProducts(){
    this.filterData['products[]'] = Array.from(this.products.keys());
  }

  setFilterDataCampaign(){
    this.filterData['campaigns[]'] = Array.from(this.campaigns.keys());
  }






}
