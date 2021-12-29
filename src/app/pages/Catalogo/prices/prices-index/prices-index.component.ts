import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Crud } from '../../../../class/crud';
import { IProductPrice } from '../../../../interfaces/iprice';
import { StandartSearchService } from '../../../../services/standart-search.service';

interface IPrice {
  id: number;
}
@Component({
  selector: 'app-prices-index',
  templateUrl: './prices-index.component.html',
  styleUrls: ['./prices-index.component.css']
})
export class PricesIndexComponent extends Crud<IProductPrice> implements OnInit {

  constructor(private _location: Location, protected standardService: StandartSearchService, protected snackBar: MatSnackBar) {
    super( standardService, snackBar);
  }

  url: string = 'catalogs/products/prices';

  ngOnInit(): void {
  }



  // getData(data) {
  //   console.log(data);
  //   // this.data = new Map<any, T>(data.map((item: T) => [item[this.key], item]));
  // }

}
