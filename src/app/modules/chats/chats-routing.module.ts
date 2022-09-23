import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateGroupChatComponent } from './create-group-chat/create-group-chat.component';

@Component({
  selector: 'app-as-users',
  template: '<router-outlet></router-outlet>',
})
export class ChatMainComponents {}


const routes: Routes = [
  // usuarios
  {
    path: 'grupal',
    component: ChatMainComponents,
    children: [
      {
        path: 'create',
        component: CreateGroupChatComponent,
        data: {
          isEdit: false,
        },
      },
      {
        path: ':id/edit',
        component: CreateGroupChatComponent,
        data: {
          isEdit: true,
        },
      },
    ],
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
exports: [RouterModule],
})
export class ChatRoutingModule {}
