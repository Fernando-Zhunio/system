import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-warehouses',
  templateUrl: './search-warehouses.component.html',
  styleUrls: ['./search-warehouses.component.scss']
})
export class SearchWarehousesComponent implements OnInit {

  @Input() warehousesSelected = new Map<number, string>();
  @Output() add = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();
  constructor() { }
  warehouses = []

  ngOnInit() {
  }

  getDataWarehouses(event): void {
    this.warehouses = event.data
  }

  addWarehouse(id, name): void {
   this.add.emit({id, name})
  }

  removeWarehouse(id): void {
    this.remove.emit(id)
  }

  hasWarehouseSelected(id): boolean {
    return this.warehousesSelected.has(id)
  }

}
