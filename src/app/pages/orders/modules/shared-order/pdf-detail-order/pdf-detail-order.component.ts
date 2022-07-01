import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IClientOrder, IItemOrder, IOrder } from '../../../../../interfaces/iorder';
import { Iwarehouse } from '../../../../../interfaces/iwarehouse';

@Component({
  selector: 'app-pdf-detail-order',
  templateUrl: './pdf-detail-order.component.html',
  styleUrls: ['./pdf-detail-order.component.scss']
})
export class PdfDetailOrderComponent  implements OnInit {


  url = 'system-orders/warehouses/search';
  warehouses: Map<number, Iwarehouse> = new Map();
  warehouseSelected: Map<number, Iwarehouse> = new Map();
  itemsPdf: Map<number, DataWarehouse> = new Map();
  currentItemPdf: DataWarehouse;
  isOpenSearchWarehouse = false;
  itemsOrder: Map<number, IItemOrder> = new Map();
  client: IClientOrder;

  constructor(@Inject(MAT_DIALOG_DATA) public dataExternal: {order:IOrder}, private snackbar: MatSnackBar) {
  }

  ngOnInit() {
    this.itemsOrder = new Map(this.dataExternal.order.items.map(item => [item.id, item]));
    this.client = this.dataExternal.order.client;
  }

  getData($event): void {
    console.log($event);
    this.warehouses = new Map($event.data.map(warehouse => [warehouse.id, warehouse]));
  }

  addWarehouse(key): void {
    if(!this.currentItemPdf){
      this.currentItemPdf = new DataWarehouse();
    }
    this.currentItemPdf.warehouse = this.warehouses.get(key);
    this.isOpenSearchWarehouse = false;
  }

  removeWarehouse(key): void {
    this.warehouseSelected.delete(key);
  }

  pass(quantity, id): void {
    console.log(quantity, id);
    const item = this.itemsOrder.get(id);
    if (item && quantity <= item.quantity) {
      if (!this.currentItemPdf) {
        this.currentItemPdf = new DataWarehouse();
      }
        this.currentItemPdf.addItem(item, quantity);
        item.quantity -= quantity;
    } else {
      this.snackbar.open('No hay suficientes unidades', 'Cerrar', { duration: 3000 });
    }
  }

  quitItem(id): void {
    const itemSelected = this.currentItemPdf.items.get(id);
    this.itemsOrder.get(id).quantity = Number.parseInt(this.itemsOrder.get(id).quantity.toString()) + itemSelected.quantity;
    this.currentItemPdf.items.delete(id);
  }

  saveItemPdf(): void {
    if(this.currentItemPdf && this.currentItemPdf.validateOk()){
      if (this.itemsPdf.has(this.currentItemPdf.warehouse.id)) {
        this.snackbar.open('Ya existe una lista para la bodega', 'Cerrar', { duration: 4000 });
        return;
      }
      console.log(this.itemsPdf);
      this.itemsPdf.set(this.currentItemPdf.warehouse.id, this.currentItemPdf);
      this.currentItemPdf = null;
    } else {
      this.snackbar.open('No se puede guardar aun falta la bodega o productos', 'Cerrar', { duration: 3000 });
    }

  }

  removeAllItems(id): void {
    this.itemsPdf.get(id).items.forEach((value, key) => {
      this.itemsOrder.get(key).quantity = Number.parseInt(this.itemsOrder.get(key).quantity.toString()) + value.quantity;
    });
    this.itemsPdf.delete(id);
  }

}


class DataWarehouse {
  warehouse: Iwarehouse;
  items: Map<number,{
    id: number;
    name: string;
    quantity: number;
    price: number;
    code: string;
    img: string;
  }> = new Map();

  constructor() {}

  addItem(item: IItemOrder, quantity: any): void {
    if (this.items.has(item.id)) {
      this.items.get(item.id).quantity += Number.parseInt(quantity);
      return;
    }
    this.items.set(item.id,{
      id: item.id,
      img: item?.product?.image || 'assets/img/img_not_available.png',
      name: item.product.name,
      quantity: Number.parseInt(quantity),
      price: item.price,
      code: item.product.code
    });
  }

  validateOk(): boolean {
    return this.warehouse && this.items.size > 0;
  }

}
