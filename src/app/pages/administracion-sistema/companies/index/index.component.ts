import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Crud } from '../../../../class/crud';
import { ICompany } from '../../../../interfaces/icompanies';
import { StandartSearchService } from '../../../../services/standart-search.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent extends Crud<ICompany> implements OnInit {

  constructor(protected standardService: StandartSearchService, protected snackBar: MatSnackBar, public router: Router) {
    super();
  }
  url: string = 'admin/companies';
  ngOnInit(): void {
  }
}
