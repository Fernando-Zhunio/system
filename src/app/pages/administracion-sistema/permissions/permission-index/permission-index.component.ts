import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IndexWithMatTable } from '../../../../class/index-with-mat-table';
import { IPermission } from '../../../../interfaces/ipermission';
import { StandartSearchService } from '../../../../services/standart-search.service';

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

  constructor(private standard: StandartSearchService, private snack: MatSnackBar, public router: Router) {
    super(standard, snack, router);
    this.displayedColumns = ['id', 'title', 'description', 'group_permission', 'created_at', 'actions'];
    this.permissions = {
      create: ['purchase-department.permissions.create'],
      edit: ['purchase-department.permissions.edit'],
      destroy: ['purchase-department.permissions.destroy'],
    };
    this.itemRows = [
      { key: 'id', title: 'Id', isEditable: false },
      { key: 'title', title: 'Titulo', isEditable: false },
      { key: 'description', title: 'Descripción', isEditable: false },
      { key: 'group_permission', title: 'Grupo', isEditable: false },
      { key: 'created_at', title: 'Creado', isEditable: false },
    ];
   }

  ngOnInit(): void {
  }

}
