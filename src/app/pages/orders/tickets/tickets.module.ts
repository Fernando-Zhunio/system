import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets.routing';
import { TicketsIndexComponent } from './tickets-index/tickets-index.component';
import { SearchTemplateModule } from '../../../Modulos/search-template/search-template.module';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { ResponseTicketComponent } from './response-ticket/response-ticket.component';
import { ChatTicketComponent } from './components/chat-ticket/chat-ticket.component';


@NgModule({
  declarations: [TicketsIndexComponent, CreateTicketComponent, ResponseTicketComponent, ChatTicketComponent],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    SearchTemplateModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule
  ]
})
export class TicketsModule { }
