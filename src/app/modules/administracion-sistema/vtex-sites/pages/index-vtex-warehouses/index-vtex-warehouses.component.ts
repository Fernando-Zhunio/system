import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { MatTableHelper } from '../../../../../shared/class/mat-table-helper';
import { PERMISSIONS_VTEX_WAREHOUSES } from '../../permissions/vtex-warehouses.permissions';

@Component({
  selector: 'app-vtex-warehouses',
  templateUrl: './index-vtex-warehouses.component.html',
  styleUrls: ['./index-vtex-warehouses.component.css'],
})
export class IndexVtexWarehousesComponent
  extends MatTableHelper
{
  @ViewChild(MatTable) protected table: MatTable<any>;
  constructor(
    protected mhs: MethodsHttpService,
    private activatedRoute: ActivatedRoute,
  ) {
    super();
    this.id = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.url = 'admin/vtex/' + this.id + '/warehouses';
  }
   columnsToDisplay: string[] = [
    'id',
    'vtex_api_id',
    'name',
    'warehouse_internal',
    'updated_at',
    'acciones'
  ];

  id = '';
  url: string;

  permissions = PERMISSIONS_VTEX_WAREHOUSES;

}
