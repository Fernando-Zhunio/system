import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatBotsIndexComponent } from './pages/chat-bots-index/chat-bots-index.component';
import { RouterModule } from '@angular/router';
import { ChatBotsRoutingModule } from './chat-bots-routing.module';
// import { SearchTemplateModule } from '../../../Modulos/search-template/search-template.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ChatBotsCreateOrEditComponent } from './components/dialog-chat-bots-create-or-edit/dialog-chat-bots-create-or-edit.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { WebhooksIndexComponent } from './pages/webhooks-index/webhooks-index.component';
import { DialogCreateOrEditChatbotWebhookComponent } from './components/dialog-create-or-edit-chatbot-webhook/dialog-create-or-edit-chatbot-webhook.component';
import { MatTableModule } from '@angular/material/table';
import { NgxSearchBarModule } from '../../../../../project/ngx-search-bar/src/public-api';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [ChatBotsIndexComponent, ChatBotsCreateOrEditComponent, WebhooksIndexComponent, DialogCreateOrEditChatbotWebhookComponent],
  imports: [
    CommonModule,
    RouterModule,
    ChatBotsRoutingModule,
    NgxSearchBarModule,
    ReactiveFormsModule,
    // Material Modules
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
  ]
})
export class ChatBotsModule { }
