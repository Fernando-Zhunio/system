import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Crud } from '../../../../../../class/crud';
import { IDepartment } from '../../../../../../interfaces/idepartment';
import { IPosition } from '../../../../../../interfaces/iposition';
import { StandartSearchService } from '../../../../../../services/standart-search.service';

@Component({
  selector: 'app-positions-index',
  templateUrl: './positions-index.component.html',
  styleUrls: ['./positions-index.component.css']
})
export class PositionsIndexComponent extends Crud<IPosition> implements OnInit {
  url: string;

  constructor(protected standardService: StandartSearchService, public router: Router, protected snackBar: MatSnackBar, private activatedRoute: ActivatedRoute) {
    super();
    this.url = `admin/companies/${this.getParams('company_id')}/departments/${this.getParams('department_id')}/positions`;
  }

  department!: IDepartment;

  ngOnInit(): void {
  }

  getParams(key: string = 'id'): any {
    return this.activatedRoute.snapshot.params[key];
  }

  override getData(data: any): void {
    this.department = data?.department;
    this.data = new Map<any, IPosition>( data.positions.data.map( (item: IPosition) => [item.id, item]));
  }
}
