import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MethodsHttpService } from '../../../services/methods-http.service';
// import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-stock-bodegas',
  templateUrl: './stock-bodegas.component.html',
  styleUrls: ['./stock-bodegas.component.css']
})
export class StockBodegasComponent implements OnInit, OnDestroy {

  constructor(@Inject(MAT_DIALOG_DATA) public data, private methodsHttp: MethodsHttpService) { }
  total_stock: number = 0;
  total_stock_other: number = 0;
  total_stock_general: number = 0;

  subscription: Subscription; 
  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  
  init(): void {
    this.totalVentasBodegas();
    if(this.data?.data?.stock_other) {
      this.totalOtrasBodegas();
    }
    this.total_stock_general = this.total_stock + this.total_stock_other;
  }

  totalVentasBodegas() {
    const warehouse = this.data.data.stock;
    const sizeWarehouse = warehouse.length;
    let total = 0;
    for (let i = 0; i < sizeWarehouse; i++) {
      const sum = warehouse[i].available;
      total += sum;
    }
    this.total_stock =  total;
  }

  totalOtrasBodegas() {
    const warehouse = this.data.data.stock_other;
    const sizeWarehouse = warehouse.length;

    let total = 0;
    for (let i = 0; i < sizeWarehouse; i++) {
      const sum = warehouse[i].available;
      total += sum;
    }
    this.total_stock_other =  total;
  }

  viewWareHouseUpdate() {
    
    this.subscription = this.methodsHttp.methodPut(`catalogs/products/${this.data.data.product.id}/sync-stock`, this.data.warehouse).subscribe((res) => {
      this.data.data = res;
      this.init();
    });
  }

}
