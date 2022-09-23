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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { WebhooksComponent } from './webhooks/webhooks.component';
import { CreateOrEditChatbotWebhookComponent } from './webhooks/create-or-edit-chatbot-webhook/create-or-edit-chatbot-webhook.component';

@NgModule({
  declarations: [ChatBotsIndexComponent, ChatBotsCreateOrEditComponent, WebhooksComponent, CreateOrEditChatbotWebhookComponent],
  imports: [
    CommonModule,
    RouterModule,
    ChatBotsRoutingModule,
    SearchTemplateModule,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class ChatBotsModule { }
