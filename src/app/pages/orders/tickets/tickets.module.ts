import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets.routing';
import { TicketsIndexComponent } from './tickets-index/tickets-index.component';
import { SearchTemplateModule } from '../../../Modulos/search-template/search-template.module';


@NgModule({
  declarations: [TicketsIndexComponent],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    SearchTemplateModule
  ]
})
export class TicketsModule { }
