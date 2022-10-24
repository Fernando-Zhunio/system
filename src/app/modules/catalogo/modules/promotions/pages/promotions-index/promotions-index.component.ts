import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { PermissionCampaigns } from '../../../../../../class/permissions-modules';
import { IProduct } from '../../../../../../interfaces/iproducts';
// import { DialogProductsService } from '../../../../../services/dialog-products.service';
import { MethodsHttpService } from '../../../../../../services/methods-http.service';
import { MatTableHelper } from '../../../../../../shared/class/mat-table-helper';
import { SearchProductsDialogComponent } from '../../../../../../shared/search-products-dialog/search-products-dialog.component';
import { CreateHostService } from '../../../../../../shared/services/create-host.service';
import { Promotion } from '../../../campaign/interfaces/promotion';
import { getDurationPromotionArray, getStatusesPromotionArray } from '../../constants/promotion-const';

@Component({
  templateUrl: './promotions-index.component.html',
  styleUrls: ['./promotions-index.component.scss']
})
export class PromotionsIndexComponent extends MatTableHelper<any> implements OnInit  {
  protected columnsToDisplay: string[] = [
    'id', 'status', 'title', 'price_formated', 'products', 'duration_type', 'description', 'actions'];
  @ViewChild(MatTable) table: MatTable<Promotion>;
  permissions = PermissionCampaigns;

  url: string = 'catalogs/promotions';
  products: Map<number, IProduct> = new Map<number, IProduct>();
  filterData = {
    status: null,
    'products[]': Array.from(this.products.keys()),
    duration_type: null
  }


  statuses: string[] = [];
  durations: string[] = [];

  constructor(private chs: CreateHostService, protected methodsHttp: MethodsHttpService/* , private dialogProduct: DialogProductsService */) {
    super();
  }
  ngOnInit(): void {
    this.statuses = getStatusesPromotionArray();
    this.durations = getDurationPromotionArray();
    console.log(this.statuses);
  }

  removeProduct(id: number) {
    this.products.delete(id);
    this.setFilterDataProducts();
    // let index = this.products.findIndex(p => p.id === id);
    // this.products.splice(index, 1);
  }

  openSearchProducts(): void {
    this.chs.injectComponent(
      SearchProductsDialogComponent,
      { url: 'catalogs/promotions/products', productsSelected: this.products })
      .beforeClose().subscribe(({ data }: { data: Map<number, IProduct> }) => {
        if (data && data.size > 0) {
          data.forEach((value: IProduct) => {
            this.products.set(value.id, value);
          });
          this.setFilterDataProducts();
        }
      });
  }

  setFilterDataProducts(){
    this.filterData['products[]'] = Array.from(this.products.keys());

  }






}
