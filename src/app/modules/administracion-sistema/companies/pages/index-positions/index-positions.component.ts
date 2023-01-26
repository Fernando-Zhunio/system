import { Component, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { MatTableHelper } from '../../../../../shared/class/mat-table-helper';
import { NgxSearchBarPaginatorComponent } from '../../../../../shared/standalone-components/ngx-search-bar-paginator/ngx-search-bar-paginator.component';
import { Department } from '../../interfaces/department';

@Component({
  selector: 'app-index-positions',
  templateUrl: './index-positions.component.html',
  styleUrls: ['./index-positions.component.css']
})
export class IndexPositionsComponent extends MatTableHelper {
  protected columnsToDisplay: string[] = ['id', 'name', 'hierarchy_type', 'employe_type', 'created_at', 'actions'];
  @ViewChild(MatTable) protected table: MatTable<any>;
  @ViewChild(NgxSearchBarPaginatorComponent) protected ngxSearchBarPaginator: NgxSearchBarPaginatorComponent;
  
  url: string;

  constructor(protected mhs: MethodsHttpService, private activatedRoute: ActivatedRoute) {
    super();
    this.url = `admin/companies/${this.getParams('company_id')}/departments/${this.getParams('department_id')}/positions`;
  }

  department!: Department;

  getParams(key: string = 'id'): any {
    return this.activatedRoute.snapshot.params[key];
  }

  override getData(data: any): void {
    this.department = data.data?.department;
    this.dataSource = data.data?.positions.data;
    const dataPaginator = {
      length: data.data?.positions.total,
      pageSize: data.data?.positions.per_page,
    }
    this.ngxSearchBarPaginator.setDataPaginator(dataPaginator)
  }
}
