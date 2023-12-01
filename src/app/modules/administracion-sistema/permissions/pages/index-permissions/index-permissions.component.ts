import { Component, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
// import { Router } from '@angular/router';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
// import { IndexWithMatTable } from '../../../../../class/index-with-mat-table';
// import { IPermission } from '../../../../../interfaces/ipermission';
// import { StandartSearchService } from '../../../../../services/standart-search.service';
import { MatTableHelper } from '../../../../../shared/class/mat-table-helper';
import { CreateOrEditPermissionComponent } from '../../components/create-or-edit-permission/create-or-edit-permission.component';
import { IndexGroupsPermissionsComponent } from '../index-groups-permissions/index-groups-permissions.component';
import { PERMISSIONS_PERMISSIONS } from '../../permissions/permissions.permissions';

@Component({
  selector: 'app-permission-index',
  templateUrl: './index-permissions.component.html',
  styleUrls: ['./index-permissions.component.css']
})
export class IndexPermissionsComponent extends MatTableHelper {
  protected columnsToDisplay: string[] = ['id', 'title', 'description', 'group_permission_name', 'created_at', 'actions'];
  @ViewChild(MatTable) protected table: MatTable<any>;
  permissions = PERMISSIONS_PERMISSIONS
  url: string = 'admin/permissions';

  constructor(private dialog: MatDialog, protected mhs: MethodsHttpService, private btnSheet: MatBottomSheet) {
    super();
  }

  openCreateOrEdit(id : number | null = null) {
    this.btnSheet.open(CreateOrEditPermissionComponent, {
      data: { id }
    }).afterDismissed().subscribe(res => {
      if (res) {
        console.log(res);
      }
    });
  }

  openDialogGroupPermission() {
    this.dialog.open(IndexGroupsPermissionsComponent).afterClosed().subscribe(() => {
    });
  }

}
