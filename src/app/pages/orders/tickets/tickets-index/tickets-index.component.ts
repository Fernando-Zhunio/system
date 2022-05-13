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
  filters = {
    // code: null,
    status: null,
    ticket_department_id: null,
    order_id: null,
    client_id: null,
    // assigned_user_id: null,
    client_unread_messages: null,
    user_unread_messages: null,
  };
  statuses = [];
  departments = [];

  ngOnInit(): void {
    this.getDataForFilter();
  }

  getDataForFilter(): void {
    this.methodsHttp.methodGet('system-orders/tickets/filter-data').subscribe(res => {
      this.departments = res.data.departments;
      this.statuses = res.data.statuses;
    });
  }

  getData(event): void {
    console.log(event);
    this.tickets = event;
  }

}
