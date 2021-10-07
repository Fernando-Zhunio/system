import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CtableAndPaginator } from '../../../class/ctable-and-paginator';
import { HeaderSearchComponent } from '../../../components/header-search/header-search.component';
import { IAccountMl } from '../../../interfaces/iaccount-ml';
import { Ipagination } from '../../../interfaces/ipagination';
import { IpermissionStandart } from '../../../interfaces/ipermission-standart';
import { ItableAndPaginator } from '../../../interfaces/itable-and-paginator';
import { StandartSearchService } from '../../../services/standart-search.service';

@Component({
  selector: 'app-mercado-libre-admin',
  templateUrl: './mercado-libre-admin.component.html',
  styleUrls: ['./mercado-libre-admin.component.css']
})
export class MercadoLibreAdminComponent extends CtableAndPaginator<IAccountMl> implements OnInit, ItableAndPaginator {

  constructor(public activated_route:ActivatedRoute, public s_standart:StandartSearchService,public snack_bar:MatSnackBar) {
    super();
   }
  wordMain: string = 'Cuenta Ml';
  urlDelete:string = 'admin/roles/';
  displayedColumns: string[] = [
    'id',
    'user_id',
    // "guard_name",
    'name',
    'city',
    'company',
    'date_created',
    'date_update',
    'acciones',
  ];

  urlData:string = 'admin/ml/accounts';


  @ViewChild(HeaderSearchComponent) headerComponent:HeaderSearchComponent;
  // ELEMENT_DATA: IrolSystem[] = [];
  permissions:IpermissionStandart;



  ngOnInit(): void {
    this.activated_route.data.subscribe(res => {
      this.permissions = res.permissions.all;
  });
  }

}
