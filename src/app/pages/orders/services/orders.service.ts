import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '../../../services/methods-http.service';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  orders: Order | null = null;

  constructor(private httpClient: HttpClient) { }

  refreshOrders(): void {
    this.httpClient.get<IResponse<Order>>('system-orders/orders').subscribe(
      {
        next: (response) => {
          this.orders = response.data;
        }
      }
    );
  }

}
