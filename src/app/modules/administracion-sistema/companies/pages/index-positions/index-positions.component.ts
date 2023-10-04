import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { MatTableHelper } from '../../../../../shared/class/mat-table-helper';
// import { NgxSearchBarPaginatorComponent } from '../../../../../shared/standalone-components/ngx-search-bar-paginator/ngx-search-bar-paginator.component';
import { Department } from '../../interfaces/department';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateOrEditPositionComponent } from '../../components/dialog-create-or-edit-position/dialog-create-or-edit-position.component';
import { NgxSearchBarComponent } from '../../../../../../../project/ngx-search-bar/src/public-api';

@Component({
  selector: 'app-index-positions',
  templateUrl: './index-positions.component.html',
  styleUrls: ['./index-positions.component.css']
})
export class IndexPositionsComponent extends MatTableHelper {
  protected columnsToDisplay: string[] = ['id', 'name', 'hierarchy_type', 'employe_type', 'created_at', 'actions'];
  @ViewChild(MatTable) protected table: MatTable<any>;
  @ViewChild(NgxSearchBarComponent) protected ngxSearchBar: NgxSearchBarComponent;
  
  url: string;
  companyId: number;

  constructor(
    protected mhs: MethodsHttpService, 
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    ) {
    super();
    this.companyId = this.getParams('company_id');
    this.url = `admin/companies/${this.companyId}/departments/${this.getParams('department_id')}/positions`;
  }

  department!: Department;

  getParams(key: string = 'id'): any {
    return this.activatedRoute.snapshot.params[key];
  }

  override getData(data: any): void {
    this.department = data.data?.department;
    this.dataSource = data.data?.positions.data;
    // const dataPaginator = {
    //   length: data.data?.positions.total,
    //   pageSize: data.data?.positions.per_page,
    // }
    // this.ngxSearchBarPaginator.setDataPaginator(dataPaginator)
  }

  openDialog(id: number | null = null): void {
    // const data = id ? this.dataSource.find((item: any) => item.id === id) : null
    let data = { companyId: this.companyId, department: this.department, position: null };
    if (id) {
      data.position = this.dataSource.find((item: any) => item.id === id)! as any;
    }
    
    this.dialog.open(DialogCreateOrEditPositionComponent, {
      data
    }).beforeClosed().subscribe((res) => {
      if (!res) {
        return
      }
      this.ngxSearchBar.search();
    })
    // console.log(data);
  }
}
