import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Crud } from '../../../../../class/crud';
import { IDepartment } from '../../../../../interfaces/idepartment';
import { StandartSearchService } from '../../../../../services/standart-search.service';

@Component({
  selector: 'app-department-index',
  templateUrl: './department-index.component.html',
  styleUrls: ['./department-index.component.css']
})
export class DepartmentIndexComponent extends Crud<IDepartment> implements OnInit {

  constructor(  standardService: StandartSearchService, snackBar: MatSnackBar) {
    super( standardService, snackBar);
  }

  url: string = 'admin/departments';

  ngOnInit(): void {
  }

}
