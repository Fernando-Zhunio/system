import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Crud } from '../../../../class/crud';
import { StandartSearchService } from '../../../../services/standart-search.service';
import { DetailsOrderComponent } from '../../modules/shared-order/details-order/details-order.component';
// import { Crud } from '../../../class/crud';
// import { StandartSearchService } from '../../../services/standart-search.service';
// import { DetailsOrderComponent } from '../modules/shared-order/details-order/details-order.component';

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
  filters = {
    status: '',
    min: 0,
    max: 0,
    type: '',
  };

  statuses: any[] = [];
  types: any[] = [];

  ngOnInit(): void {
    this.getDataForFilter();
  }

  getDataForFilter(): void {
    this.standardService.methodGet('system-orders/orders/filter-data').subscribe(
      (response: any) => {
        this.statuses = response.data.status;
        this.types = response.data.type;
      },
      (error) => {
        this.snackBar.open('Error al cargar los datos', 'Cerrar', {
          duration: 5000,
        });
      }
    );
  }

  openDetailOrder(id: number) {
    console.log(id);
    this.dialog.open(DetailsOrderComponent, {
      data: {order_id: id},
    });
  }

  validateMinQuantity(e): void {
    // tslint:disable-next-line: radix
    const typedNumber = parseInt(e.key);
    // tslint:disable-next-line: radix
    const currentVal = parseInt(e.target.value) || '';
    console.log(currentVal);
    // tslint:disable-next-line: radix
    const newVal = parseInt(typedNumber.toString() + currentVal.toString());

    if (newVal > this.filters.max) {
      // e.preventDefault();
      // e.stopPropagation();
      this.filters.max = newVal + 1;
    }
  }

  validateMaxQuantity(e): void {
    // tslint:disable-next-line: radix
    const typedNumber = parseInt(e.key);
    // tslint:disable-next-line: radix
    const currentVal = parseInt(e.target.value) || '';
    console.log(currentVal);
    // tslint:disable-next-line: radix
    const newVal = parseInt(typedNumber.toString() + currentVal.toString());

    if (newVal < this.filters.min) {
      // e.preventDefault();
      // e.stopPropagation();
      this.filters.min = newVal - 1;
    }
  }

}
