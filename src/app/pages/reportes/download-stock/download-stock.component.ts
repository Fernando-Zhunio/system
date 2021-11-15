import { Component, OnInit } from '@angular/core';
import { Iwarehouse } from '../../../interfaces/iwarehouse';
import { StandartSearchService } from '../../../services/standart-search.service';
import collect from 'collect.js';
import { SwalService } from '../../../services/swal.service';

interface ImbaStatus {
created_at: string;
id: number;
preferable_id: number;
preferable_type: string;
preference: string;
updated_at: string;
value: string;
}

@Component({
  selector: 'app-download-stock',
  templateUrl: './download-stock.component.html',
  styleUrls: ['./download-stock.component.css']
})
export class DownloadStockComponent implements OnInit {

  constructor(private s_standart: StandartSearchService) { }
  // status: string = 'ready';
  warehouses: Iwarehouse[] = [];
  warehousesMap: Map<number, object> = new Map<number, object>();
  // warehousesSelects: Iwarehouse[] = [];
  warehousesSelectsMap:  Map<number, object> = new Map<number, object>();
  // warehouseCopySearch: Iwarehouse[] = [];
  search: string = '';
  isLoad: boolean = false;
  mbaStatus: ImbaStatus = null;
  show_global_stock: boolean = false;
  allWarehouse: boolean = false;
  ngOnInit(): void {
    this.isLoad = true;
    this.s_standart.show('reports/general-stock').subscribe(res => {

      if (res && typeof res === 'object' && res.hasOwnProperty('success') && res.success) {
        this.isLoad = false;
        this.warehouses = res.data.warehouses as Iwarehouse[];
        this.warehousesMap = new Map<number, object>(this.warehouses.map((x) => [x.id, x]));
        // this.warehouseCopySearch = this.warehouses;
        this.mbaStatus = res.data.mba_status;
        if (res.data.user_warehouses) {
          this.assignedDataOnInit(res.data.user_warehouses);
        }
      }
    });
  }

  assignedDataOnInit(user_warehouses: any[]): void {
    console.log(user_warehouses);
    console.log(this.warehousesMap);
    
    user_warehouses.map((id: any) => {
      // console.log(id);
      this.addWarehousesSelects(id);
    });
  }

  addWarehousesSelects(id: any) {
    // if (this.allWarehouse) {return; }
    // const index = this.warehouses.findIndex((x) => x.id == id);
    // console.log({index,id});
    // const indexCopy = this.warehouseCopySearch.findIndex((x) => x.id == id);
    // if (index !== -1) {
    //   this.warehousesSelects.push(this.warehouses[index]);
    //   this.warehouses.splice(index, 1);
    //   this.warehouseCopySearch.splice(indexCopy, 1);
    // }
    const value = this.warehousesMap.get(id);
    this.warehousesSelectsMap.set(id, value);
    const index = this.warehouses.findIndex((x) => x.id == id);
    this.warehouses.splice(index, 1);
    this.warehousesMap.delete(id);
  }

  removeWarehousesSelects(id: number) {
    if (this.allWarehouse) {return; }
    // const index = this.warehousesSelects.findIndex((x) => x.id === id);
    // if (index !== -1) {
    //   this.warehouseCopySearch.push(this.warehousesSelects[index]);
    //   this.warehousesSelects.splice(index, 1);
    //   this.filterWarehouse();
    // }
    const value = this.warehousesSelectsMap.get(id) as Iwarehouse;
    this.warehousesMap.set(id, value);
    // const index = this.warehousesSelects.findIndex((x) => x.id === id);
    // this.warehousesSelects.splice(index, 1);
    this.warehouses.push(value);
    this.warehousesSelectsMap.delete(id);
    this.filterWarehouse();
  }

  filterWarehouse(): void {
    const warehouses = this.warehouses.filter((x) =>
    x.name.toUpperCase().includes(this.search.toUpperCase())
    );
    this.warehousesMap = new Map<number, object>(warehouses.map((x) => [x.id, x]));
  }

  saveInServer(): void {
    const sendData = this.convertDataSend();
    if (sendData['warehouses_ids'].length > 0) {
      this.isLoad = true;
      const url = 'reports/general-stock';
      // console.log(this.warehousesSelects);
      this.s_standart.store(url, {...sendData}).subscribe( res => {
        if (res && typeof res === 'object' && res.hasOwnProperty('success') && res.success) {
          this.isLoad = false;
          SwalService.swalToast(res.data.message, 'success');
        }
        this.isLoad = false;
      }, err => {
        console.log(err);
        this.isLoad = false;
      });
    }
  }

  convertDataSend(): object {

    const warehouses_ids = this.allWarehouse ? ['all'] : Array.from(this.warehousesSelectsMap.keys());
    const sendData = {};
    sendData['warehouses_ids'] = warehouses_ids;
    console.log(warehouses_ids);
    if (this.show_global_stock) { sendData['show_global_stock'] = true; }

    return sendData;
  }

  changeAllWarehouse(event: any) {
    if (event.checked) {
      this.allWarehouse = true;
    } else { this.allWarehouse = false; }
  }

}
