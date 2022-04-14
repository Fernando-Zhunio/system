import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CtableAndPaginator } from '../../../class/ctable-and-paginator';
import { HeaderSearchComponent } from '../../../components/header-search/header-search.component';
import { IpermissionStandart } from '../../../interfaces/ipermission-standart';
import { IrolSystem } from '../../../interfaces/irol-system';
import { ItableAndPaginator } from '../../../interfaces/itable-and-paginator';
import { StandartSearchService } from '../../../services/standart-search.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent extends CtableAndPaginator<IrolSystem> implements OnInit, ItableAndPaginator {

  constructor(public activated_route: ActivatedRoute, public s_standart: StandartSearchService, public snack_bar: MatSnackBar) { super() }
  displayedColumns: string[] = [
    'id',
    'name',
    // "guard_name",
    'title',
    'description',
    'permissions_count',
    'acciones',
  ];
  wordMain: string = 'rol';

  urlDelete: string = 'admin/roles/';
  @ViewChild(HeaderSearchComponent) headerComponent: HeaderSearchComponent;
  permissions: IpermissionStandart;

  ngOnInit(): void {
    this.activated_route.data.subscribe(res => {
      this.permissions = res.permissions.all;
    });
  }

  changePaginator(event): void {
    this.headerComponent.searchBar(event);
  }




}
