import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { MatTableHelper } from '../../../../../shared/class/mat-table-helper';
import { PERMISSIONS_ROLES } from '../../permissions/roles.permissions';
// import { CtableAndPaginator } from '../../../class/ctable-and-paginator';
// import { HeaderSearchComponent } from '../../../components/header-search/header-search.component';
// import { IpermissionStandart } from '../../../interfaces/ipermission-standart';
// import { IrolSystem } from '../../../interfaces/irol-system';
// import { ItableAndPaginator } from '../../../interfaces/itable-and-paginator';
// import { StandartSearchService } from '../../../services/standart-search.service';

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
  ) { super() }

  // override wordMain: string = 'rol';

  // override urlDelete: string = 'admin/roles/';
  // @ViewChild(HeaderSearchComponent) override headerComponent: HeaderSearchComponent;
  // permissions: IpermissionStandart;

  // ngOnInit(): void {
  //   this.activated_route.data.subscribe(res => {
  //     this.permissions = res['permissions'].all;
  //   });
  // }

  // override changePaginator(event): void {
  //   this.headerComponent.searchBar(event);
  // }




}
