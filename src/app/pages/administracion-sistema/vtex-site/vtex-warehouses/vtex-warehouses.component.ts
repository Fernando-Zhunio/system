import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CtableAndPaginator } from '../../../../class/ctable-and-paginator';
import { HeaderSearchComponent } from '../../../../components/header-search/header-search.component';
import { IpermissionStandart } from '../../../../interfaces/ipermission-standart';
import { IvtexWarehouse } from '../../../../interfaces/vtex/ivtex-warehouse';
import { StandartSearchService } from '../../../../services/standart-search.service';

@Component({
  selector: 'app-vtex-warehouses',
  templateUrl: './vtex-warehouses.component.html',
  styleUrls: ['./vtex-warehouses.component.css'],
})
export class VtexWarehousesComponent
  extends CtableAndPaginator<IvtexWarehouse>
  implements OnInit
{
  constructor(
    public activated_route: ActivatedRoute,
    public s_standart: StandartSearchService,
    public snack_bar: MatSnackBar,
  ) {
    super();
  }
  // urlDelete: string = 'admin/roles/';
  displayedColumns: string[] = [
    'id',
    'vtex_api_id',
    'name',
    'warehouse_internal',
    'updated_at',
    'acciones'
  ];

  id = this.activated_route.snapshot.paramMap.get('id');
  urlData: string = 'admin/vtex/' + this.id + '/warehouses';
  urlDelete: string;
  wordMain: string = 'esta bodega';

  @ViewChild(HeaderSearchComponent) headerComponent: HeaderSearchComponent;
  permissions: IpermissionStandart;

  ngOnInit(): void {
    this.urlDelete = this.urlData + '/';
    this.activated_route.data.subscribe((res) => {
      this.permissions = res.permissions.all;
    });
  }


}
