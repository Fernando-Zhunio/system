import { Component, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
// import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTable } from "@angular/material/table";
import { ActivatedRoute } from "@angular/router";
import { MethodsHttpService } from "../../../../../services/methods-http.service";
// import { IndexWithMatTable } from "../../../../../class/index-with-mat-table";
// import { Icity } from "../../../../../interfaces/iml-info";
// import { StandartSearchService } from "../../../../../services/standart-search.service";
import { MatTableHelper } from "../../../../../shared/class/mat-table-helper";
import { StatusCreateOrEdit } from "../../../../../shared/enums/status-create-or-edit";
import { CreateOrEditDialogData } from "../../../../../shared/interfaces/create-or-edit-dialog-data";
import { PERMISSIONS_CITIES } from "../../permissions/countries-and-cities.permissions";
import { CreateOrEditCityComponent } from "../create-or-edit-city/create-or-edit-city.component";

@Component({
  selector: "app-cities-index",
  templateUrl: "./index-cities.component.html",
  styleUrls: ["./index-cities.component.css"],
})
export class IndexCitiesComponent
  extends MatTableHelper {

  @ViewChild(MatTable) protected table: MatTable<any>;
  url: string;
  permissions = PERMISSIONS_CITIES;
  columnsToDisplay: string[] = ["id", "name", "code", "created_at", "updated_at", 'actions'];
  constructor(
    protected mhs: MethodsHttpService,
    protected dialog: MatDialog,
    protected activateRoute: ActivatedRoute,
  ) {
    super();
    this.url = `admin/countries/${this.getParams('country_id')}/cities`;
  }


  getParams(key): string {
    return this.activateRoute.snapshot.params[key];
  }

  openDialog(id: number | null = null): void {
    const data: CreateOrEditDialogData = {
      status: id ? StatusCreateOrEdit.Edit : StatusCreateOrEdit.Create,
      multiId: { countryId: Number.parseInt(this.getParams('country_id')) }
    }
    if (id) {
      data.id = id;
      data.info = this.dataSource.find(res => res.id == id);
    }
    this.dialog.open(CreateOrEditCityComponent,
      {
        data
      }
    ).beforeClosed().subscribe(res => {
      if (!res) {
        return;
      }
      if (!id) {
        this.addItemInTable(res.response.data)
      } else {
        this.updateItemInTable(id, res.response.data)
      }
    });
  }
}
