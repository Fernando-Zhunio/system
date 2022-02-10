import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IndexWithMatTable } from '../../../../class/index-with-mat-table';
import { IPermission } from '../../../../interfaces/ipermission';
import { IndexWithMatTableComponent } from '../../../../Modulos/index-with-mat-table/index-with-mat-table.component';
import { StandartSearchService } from '../../../../services/standart-search.service';
import { CreateOrEditPermissionComponent } from '../create-or-edit-permission/create-or-edit-permission.component';
import { GroupsPermissionsIndexComponent } from '../groups-permissions/groups-permissions-index/groups-permissions-index.component';

@Component({
  selector: 'app-permission-index',
  templateUrl: './permission-index.component.html',
  styleUrls: ['./permission-index.component.css']
})
export class PermissionIndexComponent extends IndexWithMatTable<IPermission> implements OnInit {
  displayedColumns: string[];
  permissions: { create: string[]; edit: string[]; destroy: string[]; };
  itemRows: { key: string; title: string,  isEditable: boolean  }[];
  url: string = 'admin/permissions';
  // @ViewChild('matTable') table: IndexWithMatTableComponent;

  constructor(private dialog: MatDialog , private standard: StandartSearchService, private snack: MatSnackBar, public router: Router, private btnSheet: MatBottomSheet) {
    super(standard, snack, router);
    this.displayedColumns = ['id', 'title', 'description', 'group_permission.name', 'created_at', 'actions'];
    this.permissions = {
      create: ['super-admin', 'admin.permissions.create'],
      edit: ['super-admin', 'admin.permissions.edit'],
      destroy: ['super-admin', 'admin.permissions.destroy'],
    };
    this.itemRows = [
      { key: 'id', title: 'Id', isEditable: false },
      { key: 'title', title: 'Titulo', isEditable: false },
      { key: 'description', title: 'Descripción', isEditable: false },
      { key: 'group_permission.name', title: 'Grupo', isEditable: false },
      { key: 'created_at', title: 'Creado', isEditable: false },
    ];
   }

  ngOnInit(): void {
  }

  openCreateOrEdit(id, isEdit: false) {
    console.log(id);
    this.btnSheet.open(CreateOrEditPermissionComponent, {
      data: {id, isEdit}
    }).afterDismissed().subscribe(res => {
      console.log(res);
      if (res) {
        // this.table.updateItemTable(res.id, res);
        // this.table.changePaginator();
        this.indexWithMatTableComponent.changePaginator();
      }
    });
  }

  openDialogGroupPermission() {
    this.dialog.open(GroupsPermissionsIndexComponent).afterClosed().subscribe(res => {
      // console.log(res);
      // if (res) {
      //   this.table.updateItemTable(res.id, res);
      // }
    });
  }

}
