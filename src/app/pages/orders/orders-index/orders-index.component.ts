import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Crud } from '../../../class/crud';
import { StandartSearchService } from '../../../services/standart-search.service';
import { DetailsOrderComponent } from '../modules/shared-order/details-order/details-order.component';

@Component({
  selector: 'app-orders-index',
  templateUrl: './orders-index.component.html',
  styleUrls: ['./orders-index.component.css']
})
export class OrdersIndexComponent extends Crud<any> implements OnInit {

  constructor(private dialog: MatDialog, protected standardService: StandartSearchService, protected snackBar: MatSnackBar) {
    super();
  }

  url: string = 'system-orders/orders';

  ngOnInit(): void {
  }

  openDetailOrder(id: number) {
    console.log(id);
    this.dialog.open(DetailsOrderComponent, {
      data: {order_id: id},
      // maxHeight: '100vh',
      // panelClass: 'rounded-none',
    });
  }

}
