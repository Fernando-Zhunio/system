


import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Permission_prefixes } from '../../../../../class/permissions-modules';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { MatTableHelper } from '../../../../../shared/class/mat-table-helper';
import { StatusCreateOrEdit } from '../../../../../shared/enums/status-create-or-edit';
import { CreateOrEditDialogData } from '../../../../../shared/interfaces/create-or-edit-dialog-data';
import { Prefix } from '../../interfaces/prefix';
import { CreateOrEditPrefixComponent } from '../create-or-edit-prefix/create-or-edit-prefix.component';

@Component({
  selector: 'app-prefixes-index',
  templateUrl: './prefixes-index.component.html',
  styleUrls: ['./prefixes-index.component.css']
})
export class PrefixesIndexComponent extends MatTableHelper<Prefix> {

  protected columnsToDisplay: string[] = ['id', 'type', 'prefix', 'products_count', 'actions'];
  protected url: string = 'products-admin/prefixes';

  @ViewChild(MatTable) table: MatTable<Prefix>;

  constructor(protected mhs: MethodsHttpService, private dialog: MatDialog) {
    super();
  }

  permissions = Permission_prefixes.prefixes;

  createOrEdit(id: number | null = null): void {
    const data: CreateOrEditDialogData = {
      status: id ? StatusCreateOrEdit.Edit : StatusCreateOrEdit.Create,
    }
    if (id) {
      data.id = id;
      data.info = this.dataSource.find((item) => item.id === id);
    }

    this.dialog.open(CreateOrEditPrefixComponent, {
      data,
      disableClose: true,
    }).beforeClosed().subscribe((data) => {
      if (!data) { return }
      console.log(data);
      if (id) {
        this.updateItemInTable(id, data.sendData);
      } else {
        this.addItemInTable(data.response.data);
      }
    });
  }
}
