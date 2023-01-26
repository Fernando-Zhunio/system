import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { MatTableHelper } from '../../../../../shared/class/mat-table-helper';
import { NgxSearchBarPaginatorComponent } from '../../../../../shared/standalone-components/ngx-search-bar-paginator/ngx-search-bar-paginator.component';
import { Company } from '../../interfaces/company';
import { Department } from '../../interfaces/department';

@Component({
  selector: 'app-department-index',
  templateUrl: './index-departments.component.html',
  styleUrls: ['./index-departments.component.css']
})
export class IndexDepartmentsComponent extends MatTableHelper<Department> {
  protected columnsToDisplay: string[] = ['id', 'name', 'parent', 'created_at', 'actions'];
  @ViewChild(MatTable) protected table: MatTable<any>;
  @ViewChild(NgxSearchBarPaginatorComponent) ngxSearchBarPaginator: NgxSearchBarPaginatorComponent;
  // protected mhs: MethodsHttpService;
  url: string;

  constructor(protected mhs: MethodsHttpService, protected snackBar: MatSnackBar, private act_router: ActivatedRoute) {
    super();
    this.url = `admin/companies/${this.getParam()}/departments`;
  }

  company: Company;
  

  getParam(key: string = 'company_id'): any {
    return this.act_router.snapshot.params[key];
  }

  override getData(data) {
    console.log(data);
    this.company = data.data?.company;
    this.dataSource = data.data?.departments.data;
    const dataPaginator = {
      length: data.data?.departments.total,
      pageSize: data.data?.departments.per_page,
    }
    this.ngxSearchBarPaginator.setDataPaginator(dataPaginator)
  }

}
