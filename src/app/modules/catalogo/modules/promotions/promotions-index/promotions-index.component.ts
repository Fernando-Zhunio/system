import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { PermissionCampaigns } from '../../../../../class/permissions-modules';
import { IProduct } from '../../../../../interfaces/iproducts';
// import { DialogProductsService } from '../../../../../services/dialog-products.service';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { MatTableHelper } from '../../../../../shared/class/mat-table-helper';
import { SearchProductsDialogComponent } from '../../../../../shared/search-products-dialog/search-products-dialog.component';
import { CreateHostService } from '../../../../../shared/services/create-host.service';
import { Promotion } from '../../campaign/interfaces/promotion';

@Component({
  templateUrl: './promotions-index.component.html',
  styleUrls: ['./promotions-index.component.scss']
})
export class PromotionsIndexComponent extends MatTableHelper<any>   {
  protected columnsToDisplay: string[] = [
    'id', 'status', 'title','price_formated', 'products', 'duration_type', 'description','actions'];
  @ViewChild(MatTable) table: MatTable<Promotion>;
  permissions = PermissionCampaigns;

  url: string = 'catalogs/promotions';
  products: IProduct[] = []; 

  constructor(private chs: CreateHostService, protected methodsHttp: MethodsHttpService/* , private dialogProduct: DialogProductsService */ ) {
    super();
  }

  removeProduct(id: number) {
    let index = this.products.findIndex(p => p.id === id);
    this.products.splice(index, 1);
  }

  openSearchProducts(): void {
    this.chs.injectComponent(
      SearchProductsDialogComponent, {url: 'catalogs/promotions/products'})
      ?.subscribe(data => {
        console.log(data);
      })
    // this.dialogProduct.open(
    //   'catalogs/promotions/products',
    //   {
    //     data: {
    //       isMultiple: true
    //     }
    //   }).subscribe(res => {
    //     if (res?.data) {
    //       this.products.push(res.data);
    //       console.log(this.products);
    //     }
    //   });
  }





}
