import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CtableAndPaginator } from '../../../class/ctable-and-paginator';
import { HeaderSearchComponent } from '../../../components/header-search/header-search.component';
import { IAccountMl } from '../../../interfaces/iaccount-ml';
import { IpermissionStandart } from '../../../interfaces/ipermission-standart';
import { ItableAndPaginator } from '../../../interfaces/itable-and-paginator';
import { StandartSearchService } from '../../../services/standart-search.service';

@Component({
  selector: 'app-mercado-libre-admin',
  templateUrl: './mercado-libre-admin.component.html',
  styleUrls: ['./mercado-libre-admin.component.css']
})
export class MercadoLibreAdminComponent extends CtableAndPaginator<IAccountMl> implements OnInit, ItableAndPaginator {

  constructor(public activated_route:ActivatedRoute, public override s_standart:StandartSearchService,public override snack_bar:MatSnackBar) {
    super();
   }
  override wordMain: string = 'Cuenta Ml';
  override urlDelete:string = 'admin/roles/';
  override displayedColumns: string[] = [
    'id',
    'user_id',
    'name',
    'city',
    'company',
    'date_created',
    'date_update',
    'acciones',
  ];

  @ViewChild(HeaderSearchComponent) override headerComponent:HeaderSearchComponent;
  urlData:string = 'admin/ml/accounts';
  permissions:IpermissionStandart;

  ngOnInit(): void {
    this.activated_route.data.subscribe((res: any) => {
      this.permissions = res.permissions.all;
  });
  }

  override loadData($event): void {
    // this.paginator = $event.data;
    this.refreshDataTable($event);
  }

}
