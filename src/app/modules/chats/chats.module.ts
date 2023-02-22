import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { CreateGroupChatComponent } from '../../shared/modules/chat/components/create-or-edit-chat-group/create-or-edit-chat-group.component';
import { ChatRoutingModule } from './chats.routing';
import { RouterModule } from '@angular/router';
// import {MatStepperModule} from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
// import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [],
  imports: [
  CommonModule,
  ChatRoutingModule,
  RouterModule,
  // MatStepperModule,
  ReactiveFormsModule,
  FormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatListModule,
  // MatIconModule,
  MatCardModule,
  MatCheckboxModule,
  ]
})
export class ChatsModule { }
