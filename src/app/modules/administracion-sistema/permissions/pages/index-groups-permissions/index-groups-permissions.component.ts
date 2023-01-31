import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { MatTableHelper } from '../../../../../shared/class/mat-table-helper';
import { StatusCreateOrEdit } from '../../../../../shared/enums/status-create-or-edit';
import { CreateOrEditDialogData } from '../../../../../shared/interfaces/create-or-edit-dialog-data';
import { CreateOrEditGroupPermissionComponent } from '../../components/create-or-edit-group-permission/create-or-edit-group-permission.component';
import { PERMISSIONS_PERMISSIONS } from '../../permissions/permissions.permissions';

@Component({
  selector: 'app-groups-permissions-index',
  templateUrl: './index-groups-permissions.component.html',
  styleUrls: ['./index-groups-permissions.component.css']
})
export class IndexGroupsPermissionsComponent extends MatTableHelper {
  protected columnsToDisplay: string[] = ['id', 'name', 'slug', 'position', 'actions'];
  @ViewChild(MatTable) protected table: MatTable<any>;
  permissions = PERMISSIONS_PERMISSIONS;
  url: string = 'admin/groups-permissions';

  constructor(protected mhs: MethodsHttpService, private dialog: MatDialog) {
    super();
  }

  openDialog(id: number | null = null) {
    const data: CreateOrEditDialogData = {
      status: id ? StatusCreateOrEdit.Edit : StatusCreateOrEdit.Create
    }
    console.log(data)
    if (id) {
      data.id = id;
      data.info = this.dataSource.find(item => item.id === id);
    }
    this.dialog.open(CreateOrEditGroupPermissionComponent, {
      data
    }).afterClosed().subscribe(res => {
      if (!res) {
      return;
      }
      if(id) {
        console.log(res);
        this.updateItemInTable(id,res.response.data);
      } else {
        this.addItemInTable(res.response.data);
      }
    });
  }


}
