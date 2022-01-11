import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import { IndexWithMatTable } from "../../../../../class/index-with-mat-table";
import { Icity } from "../../../../../interfaces/iml-info";
import { StandartSearchService } from "../../../../../services/standart-search.service";

@Component({
  selector: "app-cities-index",
  templateUrl: "./cities-index.component.html",
  styleUrls: ["./cities-index.component.css"],
})
export class CitiesIndexComponent
  extends IndexWithMatTable<Icity>
  implements OnInit
{
  url: string;
  permissions = {
    create: [ "super-admin", "admin.countries.cities.create" ],
    edit: [ "super-admin", "admin.countries.cities.edit" ],
    destroy: [ "super-admin", "admin.countries.cities.destroy" ],
  };
  itemRows: { key: string; title: string, isEditable: boolean }[] = [
    { key: "id", title: "ID", isEditable: false },
    { key: "name", title: "Nombre", isEditable: true },
    { key: "code", title: "Código", isEditable: true },
    { key: "created_at", title: "Creado", isEditable: false },
    { key: "updated_at", title: "Actualizado", isEditable: false },
  ];
  displayedColumns: string[]=["id", "name", "code", "created_at", "updated_at", 'actions'];
  constructor(
    protected s_standart: StandartSearchService,
    protected snack_bar: MatSnackBar,
    protected dialog: MatDialog,
    protected activateRoute: ActivatedRoute,
    protected router : Router
  ) {
    super(s_standart, snack_bar, router);
    this.url = `admin/countries/${this.getParams('country_id')}/cities`;
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  getParams(key): string {
    return this.activateRoute.snapshot.params[key];
  }
}
