import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Crud } from '../../../../class/crud';
import { StandartSearchService } from '../../../../services/standart-search.service';
import { IPriceGroup } from './../../../../interfaces/iprice';

@Component({
  selector: 'app-prices-group-index',
  templateUrl: './prices-group-index.component.html',
  styleUrls: ['./prices-group-index.component.css']
})
export class PricesGroupIndexComponent extends Crud<IPriceGroup> implements OnInit {

  constructor( s_standard: StandartSearchService, snakBar: MatSnackBar ) {
    super(s_standard, snakBar);
  }
  url: string = 'admin/prices/groups';

  ngOnInit(): void {
  }

}
