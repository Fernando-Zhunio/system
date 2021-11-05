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
  warehousesSelects: Iwarehouse[] = [];
  warehouseCopySearch: Iwarehouse[] = [];
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
        this.warehouseCopySearch = this.warehouses;
        this.mbaStatus = res.data.mba_status;
        if (res.data.user_warehouses) {
          this.assignedDataOnInit(res.data.user_warehouses);
        }
      }
    });
  }

  assignedDataOnInit(user_warehouses: any[]): void {
    console.log(user_warehouses);
    user_warehouses.map((id:any) => {
      console.log(id);
      this.addWarehousesSelects(id);
    });
  }

  addWarehousesSelects(id: any) {
    if (this.allWarehouse) {return; }
    const index = this.warehouses.findIndex((x) => x.id == id);
    console.log(index);
    const indexCopy = this.warehouseCopySearch.findIndex((x) => x.id == id);
    if (index !== -1) {
      this.warehousesSelects.push(this.warehouses[index]);
      this.warehouses.splice(index, 1);
      this.warehouseCopySearch.splice(indexCopy, 1);
      // this.filterWarehouse();
    }
  }

  removeWarehousesSelects(id: number) {
    if (this.allWarehouse) {return; }
    const index = this.warehousesSelects.findIndex((x) => x.id === id);
    if (index !== -1) {
      this.warehouseCopySearch.push(this.warehousesSelects[index]);
      this.warehousesSelects.splice(index, 1);
      this.filterWarehouse();
    }
  }

  filterWarehouse(): void {
      this.warehouses = this.warehouseCopySearch.filter((x) =>
        x.name.toUpperCase().includes(this.search.toUpperCase())
      );
  }

  saveInServer(): void {
    const sendData = this.convertDataSend();
    if (sendData['warehouses_ids'].length > 0) {
      this.isLoad = true;
      const url = 'reports/general-stock';
      console.log(this.warehousesSelects);
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

    const warehouses_ids = this.allWarehouse ? ['all'] : this.warehousesSelects.map((x) => x.id);
    const sendData = {};
    sendData['warehouses_ids'] = warehouses_ids;
    if (this.show_global_stock) { sendData['show_global_stock'] = true; }

    return sendData;
  }

  changeAllWarehouse(event: any) {
    if (event.checked) {
      this.allWarehouse = true;
    } else { this.allWarehouse = false; }
  }

}
