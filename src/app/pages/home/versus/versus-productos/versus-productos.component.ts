import { Component, OnInit } from '@angular/core';
import AirDatepicker from 'air-datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { Iproduct2 } from '../../../../interfaces/iproducts';
import { StandartSearchService } from '../../../../services/standart-search.service';
import { EKeyDashboard } from '../../../../enums/EkeyDashboard.enum';
import { VersusChart } from '../../../../class/versus-chart';

@Component({
  selector: 'app-versus-productos',
  templateUrl: './versus-productos.component.html',
  styleUrls: ['./versus-productos.component.css']
})
export class VersusProductosComponent extends VersusChart<Iproduct2> implements OnInit {

  constructor( spinner: NgxSpinnerService,  s_standart: StandartSearchService) {
    super(spinner, s_standart);
  }
  url = 'dashboard/versus/products';
  urlDashboard: string = 'dashboard/stats/graph';
  key: string = EKeyDashboard.product_sales;

  ngOnInit(): void {
    this.airDate = new AirDatepicker('#input-date-products', this.optionsDate as any);
    this.loadDateLocalStorage();
    this.getData();
    this.create_chart('chart-versus-products', 'line');
  }


  captureImagenProduct(key): string {
    if (this.data.get(key)?.prestashop_products?.length > 0) {
      return this.data.get(key).prestashop_products[0].image;
    }
    if (this.data.get(key).ml_infos?.length > 0) {
      return this.data.get(key).ml_infos[0].image;
    }
    return 'assets/img/img_default_null.jpg';
  }

  captureImagenProductSelect(key): string {
    if (this.dataSelect.get(key)?.prestashop_products?.length > 0) {
      return this.dataSelect.get(key).prestashop_products[0].image;
    }
    if (this.dataSelect.get(key).ml_infos?.length > 0) {
      return this.dataSelect.get(key).ml_infos[0].image;
    }
    return 'assets/img/img_default_null.jpg';
  }

}
