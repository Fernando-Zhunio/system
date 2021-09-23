import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CtableAndPaginator } from '../../../class/ctable-and-paginator';
import { HeaderSearchComponent } from '../../../components/header-search/header-search.component';
import { Ipagination } from '../../../interfaces/ipagination';
import { IpermissionStandart } from '../../../interfaces/ipermission-standart';
import { IrolSystem } from '../../../interfaces/irol-system';
import { ItableAndPaginator } from '../../../interfaces/itable-and-paginator';
import { StandartSearchService } from '../../../services/standart-search.service';
import { SwalService } from '../../../services/swal.service';
// import { PERMISSION_ROLES_AD } from '../administracion-sistema-routing.module';


declare let Swal: any;

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent extends CtableAndPaginator<IrolSystem> implements OnInit, ItableAndPaginator {

  constructor(public activated_route:ActivatedRoute, public s_standart:StandartSearchService,public snack_bar:MatSnackBar) {super() }
  displayedColumns: string[] = [
    "id",
    "name",
    // "guard_name",
    "title",
    "description",
    "permissions_count",
    "acciones",
  ];
  wordMain:string="rol";

  urlDelete:string = "admin/roles/";
  @ViewChild(HeaderSearchComponent) headerComponent:HeaderSearchComponent;
  // ELEMENT_DATA: IrolSystem[] = [];
  permissions:IpermissionStandart;

  // dataSource = new MatTableDataSource<IrolSystem>(this.ELEMENT_DATA);
  // paginator:Ipagination<IrolSystem>;
  // isload:boolean;

  ngOnInit(): void {
    this.activated_route.data.subscribe(res => {
      this.permissions = res.permissions.all;
  });
  }


changePaginator(event): void {
  this.headerComponent.searchBar(event);
}




}
