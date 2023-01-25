import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Crud } from '../../../../../class/crud';
import { Icompany } from '../../../../../interfaces/idashboard';
import { IDepartment } from '../../../../../interfaces/idepartment';
import { MethodsHttpService } from '../../../../../services/methods-http.service';

@Component({
  selector: 'app-department-index',
  templateUrl: './index-departments.component.html',
  styleUrls: ['./index-departments.component.css']
})
export class IndexDepartmentsComponent extends Crud<IDepartment> {
  url: string;

  constructor(protected methodsHttp: MethodsHttpService, protected snackBar: MatSnackBar, private act_router: ActivatedRoute) {
    super();
    this.url = `admin/companies/${this.getParam()}/departments`;
  }

  company!: Icompany ;


  getParam(key: string = 'company_id'): any {
    return this.act_router.snapshot.params[key];
  }

  override getData(data) {
    this.company = data?.company;
    this.data = new Map<any, IDepartment>(data.departments.data.map( (item: IDepartment) => [item[this.key], item]));
  }

}
