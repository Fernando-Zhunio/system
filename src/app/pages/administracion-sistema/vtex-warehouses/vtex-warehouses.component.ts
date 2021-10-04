import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CtableAndPaginator } from '../../../class/ctable-and-paginator';
import { HeaderSearchComponent } from '../../../components/header-search/header-search.component';
import { IpermissionStandart } from '../../../interfaces/ipermission-standart';
import { StandartSearchService } from '../../../services/standart-search.service';

@Component({
  selector: 'app-vtex-warehouses',
  templateUrl: './vtex-warehouses.component.html',
  styleUrls: ['./vtex-warehouses.component.css']
})
export class VtexWarehousesComponent  extends CtableAndPaginator<any> implements OnInit {

  constructor(public activated_route: ActivatedRoute, public s_standart: StandartSearchService, public snack_bar: MatSnackBar) {
    super();
   }
  wordMain: string = 'Cuenta Ml';
  urlDelete: string = 'admin/roles/';
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

  urlData: string = 'admin/vtex/1/warehouses';

  @ViewChild(HeaderSearchComponent) headerComponent: HeaderSearchComponent;
  permissions: IpermissionStandart;

  ngOnInit(): void {
  }

}
