import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Crud } from '../../../../class/crud';
import { Iproduct2 } from '../../../../interfaces/iproducts';
import { StandartSearchService } from '../../../../services/standart-search.service';

@Component({
  selector: 'app-promotions-index',
  templateUrl: './promotions-index.component.html',
  styleUrls: ['./promotions-index.component.css']
})
export class PromotionsIndexComponent extends Crud<any> implements OnInit {

  url: string;
  key_paginator: string = 'promotions';
  constructor(private s_standartService: StandartSearchService, private s_snackBar: MatSnackBar) {
    super( s_standartService, s_snackBar);
    this.url = 'catalogs/promotions';
  }

  ngOnInit(): void {
  }

  getData(data: any): void {
    console.log(data);
    this.data = new Map<any, Iproduct2>(data[this.key_paginator].data.map((item: Iproduct2) => [item[this.key], item]));
  }

}

