import { Component, ViewChild } from "@angular/core"
import { MatTable } from "@angular/material/table"
import { MethodsHttpService } from "../../../../../services/methods-http.service"
import { MatTableHelper } from "../../../../../shared/class/mat-table-helper"

@Component({
  selector: "app-prices-group-index",
  templateUrl: "./index-prices-group.component.html",
  styleUrls: ["./index-prices-group.component.css"],
})
export class IndexPricesGroupComponent extends MatTableHelper {
  protected columnsToDisplay: string[] = ["id", "name", "type", "active", "required", "roles", "actions"]
  @ViewChild(MatTable) protected table: MatTable<any>

  constructor(protected mhs: MethodsHttpService) {
    super()
  }
  url: string = "admin/prices/groups"

  override getData($event: any): void {
    this.dataSource = $event
  }
}
