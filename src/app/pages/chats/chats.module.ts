import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateGroupChatComponent } from './create-group-chat/create-group-chat.component';
import { ChatMainComponents, ChatRoutingModule } from './chats-routing.module';
import { RouterModule } from '@angular/router';
import {MatStepperModule} from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [ChatMainComponents, CreateGroupChatComponent],
  imports: [
  CommonModule,
  ChatRoutingModule,
  RouterModule,
  MatStepperModule,
  ReactiveFormsModule,
  FormsModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatListModule,
  MatIconModule,
  MatCardModule,
  ]
})
export class ChatsModule { }
