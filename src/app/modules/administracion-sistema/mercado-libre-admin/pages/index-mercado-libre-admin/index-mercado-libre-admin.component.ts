import { Component, ViewChild } from '@angular/core';
// import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
// import { CtableAndPaginator } from '../../../../../class/ctable-and-paginator';
// import { IAccountMl } from '../../../../../interfaces/iaccount-ml';
// import { ItableAndPaginator } from '../../../../../interfaces/itable-and-paginator';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { MatTableHelper } from '../../../../../shared/class/mat-table-helper';
import { PERMISSIONS_MERCADO_LIBRE_ADMIN } from '../../permissions/mercado-libre-admin.permissions';

@Component({
  selector: 'app-mercado-libre-admin',
  templateUrl: './index-mercado-libre-admin.component.html',
  styleUrls: ['./index-mercado-libre-admin.component.css']
})
export class IndexMercadoLibreAdminComponent extends MatTableHelper  {
  // protected columnsToDisplay: string[];
  protected url: string = 'admin/ml/accounts';
  @ViewChild(MatTable) protected table: MatTable<any>;

  constructor(public activated_route: ActivatedRoute, protected mhs: MethodsHttpService) {
    super();
  }
  // wordMain: string = 'Cuenta Ml';
  // urlDelete: string = 'admin/roles/';
  override columnsToDisplay: string[] = [
    'id',
    'user_id',
    'name',
    'city',
    'company',
    'date_created',
    'date_update',
    'acciones',
  ];

  // @ViewChild(HeaderSearchComponent) override headerComponent:HeaderSearchComponent;
  // urlData: string = 'admin/ml/accounts';
  permissions = PERMISSIONS_MERCADO_LIBRE_ADMIN;

  // ngOnInit(): void {
  //   this.activated_route.data.subscribe((res: any) => {
  //     this.permissions = res.permissions.all;
  //   });
  // }

  // override loadData($event): void {
  //   // this.paginator = $event.data;
  //   this.refreshDataTable($event);
  // }

}
