import { Component, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild('contentMessage') contentMessage: any;
  messages: IOrderTicketMessage[] = [];
  ticket_id: any = null;
  ngOnInit(): void {
    this.ticket_id = SharedService.getParametersUrl('id', this.activatedRouter);
    this.getMessages();
  }

  getMessages(): void {
    this.methodsHttp.methodGet(`system-orders/tickets/${this.ticket_id}/messages`).subscribe
    (res => {
      this.messages = res.data.reverse();
      setTimeout(() => {
        this.contentMessage.nativeElement.scrollTop = this.contentMessage.nativeElement.scrollHeight;
      } , 1000);
    });
  }

  addMessage(message: IOrderTicketMessage): void {
    this.messages.push(message);
  }

}
