import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Permission_categories } from '../../../../../class/permissions-modules';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { MatTableHelper } from '../../../../../shared/class/mat-table-helper';
import { StatusCreateOrEdit } from '../../../../../shared/enums/status-create-or-edit';
import { CreateOrEditDialogData } from '../../../../../shared/interfaces/create-or-edit-dialog-data';
import { CategoriesCreateOrEditComponent } from '../categories-create-or-edit/categories-create-or-edit.component';

@Component({
  selector: 'app-categories-index',
  templateUrl: './categories-index.component.html',
  styleUrls: ['./categories-index.component.css']
})
export class CategoriesIndexComponent extends MatTableHelper<any> {
  protected columnsToDisplay: string[] = ['id', 'name', 'code', 'products_count', 'actions'];
  protected url: string = 'products-admin/categories';

  @ViewChild(MatTable) table: MatTable<any>;


  constructor(protected mhs: MethodsHttpService, private dialog: MatDialog) {
    super();
  }

  permissions = Permission_categories.categories;

  createOrEdit(id: number | null = null): void {
    const data: CreateOrEditDialogData = {
      status: id ? StatusCreateOrEdit.Edit : StatusCreateOrEdit.Create,
    }
    if (id) {
      data.id = id;
      data.info = this.dataSource.find((item) => item.id === id);
    }

    this.dialog.open(CategoriesCreateOrEditComponent, {
      data,
      disableClose: true,
    }).beforeClosed().subscribe((data) => {
      if (!data) {
        return;
      }
      if (id) {
        this.updateItemInTable(id, data.sendData);
      } else {
        this.addItemInTable(data.response.data);
      }
    });
  }
}
