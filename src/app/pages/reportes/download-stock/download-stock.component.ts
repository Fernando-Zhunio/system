import { Component, OnInit } from '@angular/core';
import { Iwarehouse } from '../../../interfaces/iwarehouse';
import { StandartSearchService } from '../../../services/standart-search.service';
// import { MatSelectionListChange } from '@angular/material/list';
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
  status: string = 'ready';
  warehouses: Iwarehouse[] = [];
  warehousesSelects: Iwarehouse[] = [];
  warehouseCopySearch: Iwarehouse[] = [];
  search: string = '';
  isLoad: boolean = false;
  mbaStatus: ImbaStatus = null;
  show_global_stock: boolean = false;
  ngOnInit(): void {
    this.isLoad = true;
    this.s_standart.show('reports/general-stock').subscribe(res => {

      if (res && typeof res === 'object' && res.hasOwnProperty('success') && res.success) {
        this.isLoad = false;
        this.warehouses = collect(res.data.warehouses).sortBy('name').all() as Iwarehouse[];
        this.warehouseCopySearch = this.warehouses;
        this.mbaStatus = res.data.mba_status;
      }
      console.log(res);
    });
  }

  addWarehousesSelects(id: number) {
    console.log(id);
    const index = this.warehouses.findIndex((x) => x.id === id);
    const indexCopy = this.warehouseCopySearch.findIndex((x) => x.id === id);
    if (index !== -1) {
      this.warehousesSelects.push(this.warehouses[index]);
      this.warehouses.splice(index, 1);
      this.warehouseCopySearch.splice(indexCopy, 1);
      // this.filterWarehouse();
    }
  }

  removeWarehousesSelects(id: number) {
    const index = this.warehousesSelects.findIndex((x) => x.id === id);
    // const indexCopy = this.warehouseCopySearch.findIndex((x) => x.id === id);

    if (index !== -1) {
      console.log(id);

      // this.warehouses.push(this.warehousesSelects[index]);
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
    if (this.warehousesSelects.length > 0) {
      this.isLoad = true;
      const url = 'reports/general-stock';
      const sendData = this.convertDataSend();
      console.log(sendData);
      this.s_standart.store(url, {...sendData}).subscribe( res => {
        console.log(res);
        if (res && typeof res === 'object' && res.hasOwnProperty('success') && res.success) {
          this.isLoad = false;
          SwalService.swalToast(res.data.message, 'success');
          this.warehousesSelects = [];
        }
        this.isLoad = false;
      }, err => {
        console.log(err);
        this.isLoad = false;
      });
    }
  }

  convertDataSend(): object {
    const warehouses_ids = this.warehousesSelects.map((x) => x.id);
    let sendData = {};
    sendData['warehouses_ids'] = warehouses_ids;
    if (this.show_global_stock) { sendData['show_global_stock'] = true; }

    return sendData;
  }

}
