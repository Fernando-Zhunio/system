


import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { Permission_prefixes } from '../../../../../class/permissions-modules';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { MatTableHelper } from '../../../../../shared/class/mat-table-helper';
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

  createOrEdit(isEdit = true, id =null ): void {
    this.dialog.open(CreateOrEditPrefixComponent, {
      data: {id, isEdit},
      disableClose: true,
    }).beforeClosed().subscribe((data) => {
      if (data) {
        if(isEdit) {
        this.updateItemInTable(data.id, data);
        } else {
          this.addItemInTable(data);
        }
      }
    });
  }
}
