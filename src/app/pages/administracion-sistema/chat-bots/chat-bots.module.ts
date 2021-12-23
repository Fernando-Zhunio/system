import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBotsIndexComponent } from './chat-bots-index/chat-bots-index.component';
import { RouterModule } from '@angular/router';
import { ChatBotsRoutingModule } from './chat-bots-routing.module';
import { SearchTemplateModule } from '../../../Modulos/search-template/search-template.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ChatBotsCreateOrEditComponent } from './chat-bots-create-or-edit/chat-bots-create-or-edit.component';

@NgModule({
  declarations: [ChatBotsIndexComponent, ChatBotsCreateOrEditComponent],
  imports: [
    CommonModule,
    RouterModule,
    ChatBotsRoutingModule,
    SearchTemplateModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule
  ]
})
export class ChatBotsModule { }
