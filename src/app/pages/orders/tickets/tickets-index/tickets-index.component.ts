import { Component, OnInit } from '@angular/core';
import { ITicketOrder } from '../../../../interfaces/iorder';
import { MethodsHttpService } from '../../../../services/methods-http.service';

@Component({
  templateUrl: './tickets-index.component.html',
  styleUrls: ['./tickets-index.component.scss']
})
export class TicketsIndexComponent implements OnInit {

  constructor(private methodsHttp: MethodsHttpService) { }

  url = 'system-orders/tickets';
  tickets: ITicketOrder[] = [];

  ngOnInit(): void {
  }

  getData(event): void {
    console.log(event);
    this.tickets = event;
  }

  // getTickets() {
    // this.methodsHttp.methodGetPaginate
  // }

}
