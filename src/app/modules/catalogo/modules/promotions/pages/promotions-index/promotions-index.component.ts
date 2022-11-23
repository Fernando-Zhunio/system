import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { NgxPermissionsService } from 'ngx-permissions';
import { PERMISSION_CAMPAIGNS } from '../../../../../../class/permissions-modules';
import { IProduct } from '../../../../../../interfaces/iproducts';
import { MethodsHttpService } from '../../../../../../services/methods-http.service';
import { MatTableHelper } from '../../../../../../shared/class/mat-table-helper';
import { SearchProductsDialogComponent } from '../../../../../../shared/search-products-dialog/search-products-dialog.component';
import { CreateHostService } from '../../../../../../shared/services/create-host.service';
import { Promotion } from '../../../campaign/interfaces/promotion';
import { SearchCampaignDialogComponent } from '../../components/search-campaign-dialog/search-campaign-dialog.component';
import { getDurationPromotionArray, getStatusesPromotionArray, PROMOTION_STATUS_ACTIVE } from '../../constants/promotion-const';
 
@Component({
  templateUrl: './promotions-index.component.html',
  styleUrls: ['./promotions-index.component.scss']
})
export class PromotionsIndexComponent extends MatTableHelper<Promotion> implements OnInit, AfterViewInit  {
  protected columnsToDisplay: string[] = [
    'id', 'created_at', 'status', 'title', 'price_formated', 'products', 'duration_type', 'description', 'campaign'];
  @ViewChild(MatTable) table: MatTable<Promotion>;
  permissions = PERMISSION_CAMPAIGNS;

  urlSearch: string = 'catalogs/promotions';
  url: string = 'catalogs/promotions';
  products: Map<number, IProduct> = new Map<number, IProduct>();
  campaigns: Map<number, IProduct> = new Map<number, IProduct>();
  filterData: any = {
    status: PROMOTION_STATUS_ACTIVE,
    'products[]': [],
    duration_type: null,
    'campaigns[]': []
  }

  statuses: string[] = [];
  durations: string[] = [];

  constructor(private nps: NgxPermissionsService, private chs: CreateHostService, protected mhs: MethodsHttpService/* , private dialogProduct: DialogProductsService */) {
    super();
  }
  ngOnInit(): void {
    this.statuses = getStatusesPromotionArray();
    this.durations = getDurationPromotionArray();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.nps.hasPermission(this.permissions.edit).then((res: boolean) => {
      if (res) {
        setTimeout(() => {
          this.columnsToDisplay.push('actions');
        }, 2000);
      }
    })
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
      { url: 'catalogs/promotions/products', onlyOne: true })
      .beforeClose().subscribe((res: any) => {
        console.log({res});
        const data = res?.data;
        if (data) {
          // data.forEach((value: IProduct) => {
            this.products.set(data.id, data);
          // });

          this.setFilterDataProducts();
        }
      });
  }

  openSearchCampaign(): void {
    this.chs.injectComponent(
      SearchCampaignDialogComponent,
      { url: 'catalogs/campaigns', onlyOne: true })
      .beforeClose().subscribe((res: any) => {
        console.log(res);
        const data = res?.data;
        if (data) {
          // data.forEach((value: IProduct) => {
            this.campaigns.set(data.id, data);
          // });
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

  deletePromotion(id: number) {
    const promotion = this.dataSource.find((item: Promotion) => item.id === id);
    if (promotion && promotion?.campaign) {
      const url = `catalogs/campaigns/${promotion.campaign.id}/promotions`;
      this.deleteData(id, url);
    }
  }









}
