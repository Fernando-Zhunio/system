import { Component, OnInit } from '@angular/core';
import { MethodsHttpService } from '../../../../services/methods-http.service';

@Component({
  templateUrl: './tickets-index.component.html',
  styleUrls: ['./tickets-index.component.scss']
})
export class TicketsIndexComponent implements OnInit {

  constructor(private methodsHttp: MethodsHttpService) { }

  url = 'system-orders/tickets';
  tickets: any[] = [];

  ngOnInit(): void {
  }

  // getTickets() {
    // this.methodsHttp.methodGetPaginate
  // }

}
