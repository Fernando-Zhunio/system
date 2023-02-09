import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateGroupChatComponent } from './pages/create-group-chat/create-group-chat.component';



const routes: Routes = [
  // usuarios
  {
    path: 'groups',
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
