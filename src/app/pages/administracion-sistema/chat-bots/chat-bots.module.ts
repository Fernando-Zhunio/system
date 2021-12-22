import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBotsIndexComponent } from './chat-bots-index/chat-bots-index.component';
import { RouterModule } from '@angular/router';
import { ChatBotsRoutingModule } from './chat-bots-routing.module';
import { SearchTemplateModule } from '../../../Modulos/search-template/search-template.module';



@NgModule({
  declarations: [ChatBotsIndexComponent],
  imports: [
    CommonModule,
    RouterModule,
    ChatBotsRoutingModule,
    SearchTemplateModule
  ]
})
export class ChatBotsModule { }
