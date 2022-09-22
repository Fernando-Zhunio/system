import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { IResponse } from '../../../services/methods-http.service';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  $order: BehaviorSubject<Order | null> = new BehaviorSubject<Order | null>(null);
  order_id: number | string = 0;
  constructor(private httpClient: HttpClient) { }

  init(orderId: number | string): Observable<IResponse<any>> {
    this.order_id = orderId;
   return this.httpClient.get<IResponse<any>>(`${environment.server}system-orders/orders/${this.order_id}/edit`)
    .pipe(tap(res => {
      if (res.success)
        this.$order.next(res.data.order);
    }))
  }

  refreshOrders(): void {
    this.httpClient.get<IResponse<Order>>(`${environment.server}system-orders/orders/${this.order_id}`).subscribe(
      {
        next: (response) => {
          if (response?.success)
            this.$order.next(response.data);
        }
      }
    );
  }

}
