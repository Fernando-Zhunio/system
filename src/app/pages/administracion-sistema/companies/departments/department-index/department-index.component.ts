import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Crud } from '../../../../../class/crud';
import { IDepartment } from '../../../../../interfaces/idepartment';
import { StandartSearchService } from '../../../../../services/standart-search.service';

@Component({
  selector: 'app-department-index',
  templateUrl: './department-index.component.html',
  styleUrls: ['./department-index.component.css']
})
export class DepartmentIndexComponent extends Crud<IDepartment> implements OnInit {

  constructor(standardService: StandartSearchService, snackBar: MatSnackBar, private act_router: ActivatedRoute) {
    super(standardService, snackBar);
    this.url = `admin/companies/${this.getParam()}/departments`;
  }

  url: string = 'admin/departments';

  ngOnInit(): void {
  }

  getParam(key: string = 'id'): any {
    return this.act_router.snapshot.params[key];
  }

  getData(data) {
    console.log(data);
    this.data = new Map<any, IDepartment>(data.map( (item: IDepartment) => [item[this.key], item]));
  }

}
