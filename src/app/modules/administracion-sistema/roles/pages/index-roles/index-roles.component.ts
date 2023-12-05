import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { MatTableHelper } from '../../../../../shared/class/mat-table-helper';
import { PERMISSIONS_ROLES } from '../../permissions/roles.permissions';

@Component({
  selector: 'app-roles',
  templateUrl: './index-roles.component.html',
  styleUrls: ['./index-roles.component.css']
})
export class IndexRolesComponent extends MatTableHelper  {
  protected columnsToDisplay = [
    'id',
    'name',
    'title',
    'description',
    'permissions_count',
    'actions',
  ];
  protected url: string ='admin/roles';
  @ViewChild(MatTable) protected table: MatTable<any>;
  permissions = PERMISSIONS_ROLES;

  constructor(
    protected mhs: MethodsHttpService,
  ) { super() 
  }

  // override getData($event: any): void {
  //   console.log($event);
  // }
}
