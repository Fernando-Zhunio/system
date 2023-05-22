import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { FilePondModule } from 'ngx-filepond';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CreateHostDirective } from '../../directives/create-host.directive';
import { ChatTemplateComponent } from './components/chat-template/chat-template.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatSortPipe } from './pipes/chat-sort.pipe';
import { MarkdownModule } from '../../../Modulos/Markdown/markdown/markdown.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatsUsersListComponent } from './components/chats-users-list/chats-users-list.component';
import { CreateOrEditChatGroupComponent } from './components/create-or-edit-chat-group/create-or-edit-chat-group.component';

@NgModule({
    imports: [
        ReactiveFormsModule,
        CommonModule,
        CreateHostDirective,
        MatCardModule,
        FilePondModule,
        MarkdownModule,
        MatIconModule,
        MatProgressBarModule,
        MatMenuModule,
        MatDialogModule,
        MatButtonModule,
        InfiniteScrollModule,
    ],
    declarations: [
        CreateOrEditChatGroupComponent,
        ChatSortPipe,
        ChatTemplateComponent,
        ChatComponent,
        ChatsUsersListComponent,
    ],
    exports: [
        // ChatSortPipe,
        ChatTemplateComponent,
        ChatComponent,
    ],
})
export class ChatModule { }