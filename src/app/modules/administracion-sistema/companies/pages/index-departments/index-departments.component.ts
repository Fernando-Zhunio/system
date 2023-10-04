import { Component, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { MatTableHelper } from '../../../../../shared/class/mat-table-helper';
// import { NgxSearchBarPaginatorComponent } from '../../../../../shared/standalone-components/ngx-search-bar-paginator/ngx-search-bar-paginator.component';
import { Company } from '../../interfaces/company';
import { Department } from '../../interfaces/department';
import { MatDialog } from '@angular/material/dialog';
import { CreateOrEditDepartmentComponent } from '../create-or-edit-department/create-or-edit-department.component';
import { NgxSearchBarComponent } from '../../../../../../../project/ngx-search-bar/src/public-api';

@Component({
  selector: 'app-department-index',
  templateUrl: './index-departments.component.html',
  styleUrls: ['./index-departments.component.css']
})
export class IndexDepartmentsComponent extends MatTableHelper<Department> {
  protected columnsToDisplay: string[] = ['id', 'name', 'parent', 'created_at', 'actions'];
  @ViewChild(MatTable) protected table: MatTable<any>;
  @ViewChild(NgxSearchBarComponent) ngxSearchBar: NgxSearchBarComponent;
  // protected mhs: MethodsHttpService;
  url: string;

  constructor(
    protected mhs: MethodsHttpService, 
    protected snackBar: MatSnackBar, 
    private act_router: ActivatedRoute,
    private dialog: MatDialog,
    ) {
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
    // const dataPaginator = {
    //   length: data.data?.departments.total,
    //   pageSize: data.data?.departments.per_page,
    // }
    // this.ngxSearchBar.setDataPaginator(dataPaginator)
  }

  openDialog(id: number | null = null): void {
    // const data = id ? this.dataSource.find((item: any) => item.id === id) : null
    let data = { company: this.company, department: null };
    if (id) {
      data.department = this.dataSource.find((item: any) => item.id === id)! as any;
    }
    
    this.dialog.open(CreateOrEditDepartmentComponent, {
      data
    }).beforeClosed().subscribe((res) => {
      if (!res) {
        return
      }
      this.ngxSearchBar.search();
    })
    console.log(data);
  }

  getLength(res) {
    return res.data.departments.total
  }
}
