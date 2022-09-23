import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { animation_conditional } from '../../../../animations/animate_leave_enter';
import { Crud } from '../../../../class/crud';
import { IProduct, IPromotions } from '../../../../interfaces/promotion';
import { SheetFzComponent } from '../../../../Modulos/sheet-fz/sheet-fz/sheet-fz.component';
import { MethodsHttpService } from '../../../../services/methods-http.service';

@Component({
  selector: 'app-promotions-index',
  templateUrl: './promotions-index.component.html',
  styleUrls: ['./promotions-index.component.css'],
  animations: animation_conditional

})
export class PromotionsIndexComponent extends Crud<IPromotions> implements OnInit {

  url: string;
  key_paginator: string = 'promotions';

  constructor(protected methodsHttp: MethodsHttpService, protected snackBar: MatSnackBar, private sheet: MatBottomSheet) {
    super();
    this.url = 'catalogs/promotions';
  }

  ngOnInit(): void {
  }

  override getData(data: any): void {
    console.log(data);
    this.data = new Map<any, IPromotions>(data[this.key_paginator].data.map((item: IPromotions) => [item[this.key], item]));
  }

  openSheetViewProducts(key: string): void {
    this.sheet.open(SheetFzComponent, {
      data: this.data.get(key)!.products.map((item: IProduct) => {
        return { id: item.id, icon: 'sell', lines: [`${item.name} - (${item.code})`, `Precio: ${item.pivot.price}`, `Cantidad: ${item.pivot.quantity}`] };
      }
      )
    });
  }

}

