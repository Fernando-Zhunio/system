import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrderTicketMessage } from '../../../../../interfaces/iorder';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
import { SharedService } from '../../../../../services/shared/shared.service';

@Component({
  selector: 'app-chat-ticket',
  templateUrl: './chat-ticket.component.html',
  styleUrls: ['./chat-ticket.component.scss']
})
export class ChatTicketComponent implements OnInit {

  constructor(private methodsHttp: MethodsHttpService, private activatedRouter: ActivatedRoute) { }
  messages: IOrderTicketMessage[] = [];
  ngOnInit(): void {
    const ticket_id = SharedService.getParametersUrl('id', this.activatedRouter);
    this.methodsHttp.methodGet(`system-orders/tickets/${ticket_id}/messages`).subscribe
    (res => {
      this.messages = res.data;
    });
  }

}
