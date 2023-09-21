import { Component, OnInit } from "@angular/core"
import { Iwarehouse as IWarehouse } from "../../../../interfaces/iwarehouse"
import { SwalService } from "../../../../services/swal.service"
import { MethodsHttpService } from "../../../../services/methods-http.service"

interface IMbaStatus {
  created_at: string
  id: number
  preferable_id: number
  preferable_type: string
  preference: string
  updated_at: string
  value: string
}

@Component({
  selector: "app-download-stock",
  templateUrl: "./download-stock.component.html",
  styleUrls: ["./download-stock.component.css"],
})
export class DownloadStockComponent implements OnInit {
  constructor(private methodsHttp: MethodsHttpService) {}
  warehousesAll: IWarehouse[] = []
  warehousesAvailable: IWarehouse[] = []
  warehousesSelects: IWarehouse[] = []
  search: string = ""
  isLoading: boolean = false
  mbaStatus: IMbaStatus | null = null
  show_global_stock: boolean = false
  allWarehouse: boolean = false
  ngOnInit(): void {
    this.isLoading = true
    this.methodsHttp.methodGet("reports/general-stock").subscribe((res) => {
      if (res?.success) {
        this.isLoading = false
        const warehouses = res.data.warehouses as IWarehouse[]
        this.warehousesAll = warehouses
        this.warehousesAvailable = [...warehouses]
        this.mbaStatus = res.data.mba_status
        if (res.data.user_warehouses) {
          this.assignedDataOnInit(res.data.user_warehouses)
        }
      }
    })
  }

  assignedDataOnInit(user_warehouses: any[]): void {
    user_warehouses.map((id: any) => {
      this.addWarehousesSelects(id)
    })
  }

  addWarehousesSelects(id: any) {
    const value = this.warehousesAvailable.find((warehouse) => warehouse.id === id) as IWarehouse
    this.warehousesSelects.push(value)
    const indexAvailable = this.warehousesAvailable.findIndex((warehouse) => warehouse.id === id)
    if (indexAvailable >= 0) {
      this.warehousesAvailable.splice(indexAvailable, 1)
    }

    const indexAll = this.warehousesAll.findIndex((warehouse) => warehouse.id === id)
    if (indexAll >= 0) {
      this.warehousesAll.splice(indexAll, 1)
    }
  }

  removeWarehousesSelects(id: number) {
    if (this.allWarehouse) {
      return
    }
    const indexSelect = this.warehousesSelects.findIndex(warehouse => warehouse.id === id);
    if (indexSelect >= 0) {
      this.warehousesAll.push(this.warehousesSelects[indexSelect]);
      if (this.warehousesSelects[indexSelect].name.toUpperCase().includes(this.search.toUpperCase())) {
        this.warehousesAvailable.push(this.warehousesSelects[indexSelect]);
      }
      this.warehousesSelects.splice(indexSelect, 1)
    }
  }

  filterWarehouse(): void {
    this.warehousesAvailable = this.warehousesAll.filter((x) => x.name.toUpperCase().includes(this.search.toUpperCase()))
    
  }

  saveInServer(): void {
    const sendData = this.convertDataSend()
    if (sendData["warehouses_ids"].length > 0) {
      this.isLoading = true
      const url = "reports/general-stock"
      this.methodsHttp.methodPut(url, sendData).subscribe(
        (res) => {
          if (res?.success) {
            this.isLoading = false
            SwalService.swalToast(res.data.message, "success")
          }
          this.isLoading = false
        },
        (err) => {
          console.error(err)
          this.isLoading = false
        }
      )
    }
  }

  convertDataSend(): object {
    const warehouses_ids = this.allWarehouse ? ["all"] : this.warehousesSelects.map((x) => x.id)
    const sendData = {}
    sendData["warehouses_ids"] = warehouses_ids
    if (this.show_global_stock) {
      sendData["show_global_stock"] = true
    }

    return sendData
  }

  changeAllWarehouse(event: any) {
    if (event.checked) {
      this.allWarehouse = true
    } else {
      this.allWarehouse = false
    }
  }
}
