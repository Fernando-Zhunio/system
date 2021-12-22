import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { ChatBotsIndexComponent } from './chat-bots-index/chat-bots-index.component';

const permisos = {
  index: ['super-admin', 'admin.chatbot.index'],
  show: ['super-admin', 'admin.chatbot.show'],
  create: ['super-admin', 'admin.chatbot.create'],
  edit: ['super-admin', 'admin.chatbot.edit'],
  delete: ['super-admin', 'admin.chatbot.destroy'],
};

const routes: Routes = [
  {
    path: 'index',
    component: ChatBotsIndexComponent,
    data: {
      permissions: {
        only: permisos.index,
      },
    },
    canActivate: [NgxPermissionsGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatBotsRoutingModule { }
