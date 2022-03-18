import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Crud } from '../../../class/crud';
import { StandartSearchService } from '../../../services/standart-search.service';

@Component({
  selector: 'app-orders-index',
  templateUrl: './orders-index.component.html',
  styleUrls: ['./orders-index.component.css']
})
export class OrdersIndexComponent extends Crud<any> implements OnInit {

  constructor(protected standardService: StandartSearchService, protected snackBar: MatSnackBar) {
    super();
  }

  url: string = 'system-orders/orders';

  ngOnInit(): void {
  }

}
