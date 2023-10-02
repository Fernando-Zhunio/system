import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { ChatBotsCreateOrEditComponent } from './components/dialog-chat-bots-create-or-edit/dialog-chat-bots-create-or-edit.component';
import { ChatBotsIndexComponent } from './pages/chat-bots-index/chat-bots-index.component';
import { DialogCreateOrEditChatbotWebhookComponent } from './components/dialog-create-or-edit-chatbot-webhook/dialog-create-or-edit-chatbot-webhook.component';
import { WebhooksIndexComponent } from './pages/webhooks-index/webhooks-index.component';

const permisos = {
  chatbot: {
    index: ['super-admin', 'admin.chatbot.index'],
    show: ['super-admin', 'admin.chatbot.show'],
    create: ['super-admin', 'admin.chatbot.create'],
    edit: ['super-admin', 'admin.chatbot.edit'],
    delete: ['super-admin', 'admin.chatbot.destroy'],
  },
  chatbot_webhook: {
    index: ['super-admin', 'admin.chatbot_webhook.index'],
    show: ['super-admin', 'admin.chatbot_webhook.show'],
    create: ['super-admin', 'admin.chatbot_webhook.create'],
    edit: ['super-admin', 'admin.chatbot_webhook.edit'],
    delete: ['super-admin', 'admin.chatbot_webhook.destroy'],
  }
};

const routes: Routes = [
  {
    path: '',
    component: ChatBotsIndexComponent,
    data: {
      permissions: {
        only: permisos.chatbot.index,
      },
    },
    canActivate: [NgxPermissionsGuard],
  },
  {
    path: 'create',
    component: ChatBotsCreateOrEditComponent,
    data: {
      permissions: {
        only: permisos.chatbot.create,
      },
    },
    canActivate: [NgxPermissionsGuard],
  },
  {
    path: ':chatbot_id/edit',
    component: ChatBotsCreateOrEditComponent,
    data: {
      isEdit: true,
      permissions: {
        only: permisos.chatbot.edit,
      },
    },
    canActivate: [NgxPermissionsGuard],
  },
  {
    path: ':chatbot_id/webhooks',
    children: [
      {
        path: '',
        component: WebhooksIndexComponent,
      },
      {
        path: 'create',
        component: DialogCreateOrEditChatbotWebhookComponent,
      },
      {
        path: ':webhook_id/edit',
        component: DialogCreateOrEditChatbotWebhookComponent,
        data: {
          isEdit: true,
        },
      }
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule],
})
export class ChatBotsRoutingModule { }
