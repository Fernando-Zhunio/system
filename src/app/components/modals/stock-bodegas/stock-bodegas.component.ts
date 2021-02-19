import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-stock-bodegas',
  templateUrl: './stock-bodegas.component.html',
  styleUrls: ['./stock-bodegas.component.css']
})
export class StockBodegasComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data) { }
  total_stock:number = 0;
  total_stock_other:number = 0;
  total_stock_general:number = 0;
  // displayedColumns: string[] = ['Bodega', 'Ciudad', 'Stock'];
  // dataSource:MatTableDataSource<any> = new MatTableDataSource(this.data.stock);
  ngOnInit(): void {
    this.totalVentasBodegas();
    this.totalOtrasBodegas();
    this.total_stock_general = this.total_stock + this.total_stock_other;
  }

  totalVentasBodegas(){
    let warehouse = this.data.data.stock;
    const sizeWarehouse = warehouse.length;
    // console.log(warehouse[0]);
    
    let total = 0;
    for (let i = 0; i < sizeWarehouse; i++) {
      let sum = warehouse[i].available;
      total+=sum;
    }
    this.total_stock =  total;
  }

  totalOtrasBodegas(){
    let warehouse = this.data.data.stock_other;
    const sizeWarehouse = warehouse.length;
    // console.log(warehouse[0]);
    
    let total = 0;
    for (let i = 0; i < sizeWarehouse; i++) {
      let sum = warehouse[i].available;
      total+=sum;
    }
    this.total_stock_other =  total;
  }

}
