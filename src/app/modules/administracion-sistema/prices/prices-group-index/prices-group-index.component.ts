import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Crud } from '../../../../class/crud';
import { MethodsHttpService } from '../../../../services/methods-http.service';
import { IPriceGroup } from './../../../../interfaces/iprice';

@Component({
  selector: 'app-prices-group-index',
  templateUrl: './prices-group-index.component.html',
  styleUrls: ['./prices-group-index.component.css']
})
export class PricesGroupIndexComponent extends Crud<IPriceGroup> implements OnInit {

  constructor(protected methodsHttp: MethodsHttpService, protected snackBar: MatSnackBar ) {
    super();
  }
  url: string = 'admin/prices/groups';

  ngOnInit(): void {
  }

}
