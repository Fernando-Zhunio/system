import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Crud } from '../../../../../../class/crud';
import { IDepartment } from '../../../../../../interfaces/idepartment';
import { IPosition } from '../../../../../../interfaces/iposition';
import { MethodsHttpService } from '../../../../../../services/methods-http.service';

@Component({
  selector: 'app-index-positions',
  templateUrl: './index-positions.component.html',
  styleUrls: ['./index-positions.component.css']
})
export class IndexPositionsComponent extends Crud<IPosition> {
  url: string;

  constructor(protected methodsHttp: MethodsHttpService, public router: Router, protected snackBar: MatSnackBar, private activatedRoute: ActivatedRoute) {
    super();
    this.url = `admin/companies/${this.getParams('company_id')}/departments/${this.getParams('department_id')}/positions`;
  }

  department!: IDepartment;



  getParams(key: string = 'id'): any {
    return this.activatedRoute.snapshot.params[key];
  }

  override getData(data: any): void {
    this.department = data?.department;
    this.data = new Map<any, IPosition>( data.positions.data.map( (item: IPosition) => [item.id, item]));
  }
}
