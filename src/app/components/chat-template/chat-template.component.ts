import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Ichats, ImessageChat, IuserChat } from '../../interfaces/chats/ichats';
import { SharedService } from '../../services/shared/shared.service';
import { StandartSearchService } from '../../services/standart-search.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-chat-template',
  templateUrl: './chat-template.component.html',
  styleUrls: ['./chat-template.component.css'],
})
export class ChatTemplateComponent implements OnInit {
  constructor(
    private s_shared: SharedService,
    private s_storage: StorageService,
    private s_standart: StandartSearchService
  ) {}

  @Input() openOrClose: boolean = false;
  @Output() newMessageEmit = new EventEmitter<boolean>();
  users: IuserChat[] = [];
  chats: Ichats[] = [];
  chatsbubble: IuserChat[] = [];
  hideUsers: boolean = true;
  page: number = 1;
  myUser: any = null;
  ngOnInit(): void {
    this.myUser = this.s_storage.getCurrentUser();
    this.s_shared.echo
      .private(`chat.${this.myUser.id}`)
      .listen(`.chat`, this.newChat.bind(this))
      .listen('.message', this.getMessages.bind(this))
      .listen('.typing', this.typingUser.bind(this))
      .listen('.message_readed', this.getMessageReaded.bind(this));
    this.s_shared.echo
      .private(`chat_users`)
      .listen('.user', this.getChatUserStatus.bind(this));
    this.getAllUsers();
    this.onSelectChats(null);
  }

  newChat(event: { chat: Ichats; event: 'created'|'updated'|'deleted' }): void {
    console.log(event);
    if (event.event == 'created') {
      this.chats.unshift(event.chat);
      return;
    }
    // if (event.event == 'updated') {
    //   const chatIndex = this.chats.findIndex(
    //     (x) => x._id == event.chat._id
    //   );
    //   if (chatIndex !== -1) {
    //     this.chats[chatIndex] = event.chat;
    //   }
    //   return;
    // }
    if (event.event == 'deleted') {
      const chatIndex = this.chats.findIndex(
        (x) => x._id == event.chat._id
      );
      if (chatIndex !== -1) {
        this.chats.splice(chatIndex, 1);
      }
      return;
    }
  }

  getMessages(event: { chat: Ichats; message: ImessageChat }): void {
    console.log({ 'message_event:': event });
    if (!this.openOrClose) {
      this.newMessageEmit.emit(true);
    }
    const userChat = this.chatsbubble.find(
      (user) => user?.data_chat?._id === event.chat._id
    );
    const chatIndex = this.chats.findIndex((x: any) => x._id === event.chat._id);
    let chat;
    if (chatIndex != -1) {chat = this.chats[chatIndex]; }
    if (userChat != undefined) {
      const message: ImessageChat = {
        text: event.message.text,
        type: event.message.type,
        files: event.message.files,
        created_at: event.message.created_at,
        author_user_id: event.message.author_user_id,
        readed: false,
      };
      if (!userChat?.messages) {userChat.messages = []; }
      userChat['messages'].push(message);
      if (chat != undefined) {
        if (!chat.last_message) {
          chat.last_message = {} as any;
        }
        chat.last_message.text = event.message.text;
        chat.last_message.files = Array.isArray(event.message.files);
        chat.last_message.author_user_id = event.message.author_user_id;
        chat.last_message.readed = event.message.readed;
        chat.last_message.created_at = event.message.created_at;
        if (chatIndex > 0) {
          this.chats = this.array_move(this.chats, chatIndex, 0);
        }
      }
    } else {
      //  chat = this.chats.find((x: any) => x._id === event.chat._id);
      console.log('burbuja no encotrada');

      if (chat != undefined) {
        if (!chat.last_message) {
          chat.last_message = {} as any;
        }
        chat.unread_messages_count++;
        chat.last_message.text = event.message.text;
        chat.last_message.author_user_id = event.message.author_user_id;
        chat.last_message.readed = event.message.readed;
        chat.last_message.created_at = event.message.created_at;
        if (chatIndex > 0) {
          this.chats = this.array_move(this.chats, chatIndex, 0);
        }
      }
    }
    // else {
    //   const is_group = event.chat.type == 'group';
    //     userChat = {
    //       id: is_group ? 10000000000 : event.chat.user.id,
    //       name: is_group ? event.chat.name : event.chat.user.info.name,
    //       data_chat: event.chat,
    //       messages: [
    //         {
    //           text: event.message.text,
    //           type: event.message.type,
    //           created_at: event.message.created_at,
    //           author_user_id: event.message.author_user_id,
    //           files: event.message.files,
    //           readed: false,
    //         },
    //       ],
    //     };
    //     this.chatsbubble.push(userChat);
    // }
  }

   array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
}

  getChatUserStatus(event: {
    event: string;
    user: { id: number; status: 'offline' | 'online'; _id: string };
  }): void {
    console.log(event);
    if (!this.chats) {
      return;
    }
    const chat = this.chats.find(
      (x) => x.participants[0].info.id == event.user.id
    );
    if (chat != undefined && chat.type == 'personal') {
      chat.participants[0].status = event.user.status;
    }
  }

  getMessageReaded(event): void {
    console.log({ 'reader_event: ': event });
    const userChat = this.chatsbubble.find((x) => x.data_chat._id === event.chat_id);
    if (userChat != undefined) {
      userChat['messages'].map((message) => {
        return (message.readed = 'true');
      });
    }
    const chat = this.chats.find((x) => x._id === event.chat_id);
    if (chat != undefined) {
      if (chat.last_message)
      {
        chat.last_message.readed = 'true';
      }
    }
  }

  getPhoto(user, isGroup = null): string {
    let img_path = 'assets/img/user.png';
    if (isGroup) {
      img_path = 'assets/img/user_group.png';
    }
    return SharedService.rediredImageNull(user, img_path);
  }

  getAllUsers(): void {
    this.s_standart.index('chats', this.page.toString(), '30').subscribe(
      (data: any) => {
        if (data.data.data.length < 1) {
          return;
        }
        this.users = this.users.concat(data.data.data);
        this.page++;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  typingUser(event): void {
    console.log(event);
  }

  openChat(user_id): void {
    const userChat = this.users.find((user) => user.id === user_id);
    const chatBubbleIndex = this.chatsbubble.findIndex(
      (user) => user.id === user_id
    );
    if (userChat !== undefined && chatBubbleIndex == -1) {
      this.chatsbubble.push(userChat);
    }
  }

  openChatOfChat(chat_id): void {
    const chat = this.chats.find((x) => x._id == chat_id);

    if (chat != undefined) {
      if (chat.type == 'personal') {
        const user = chat.participants[0].info;
        const userIndex = this.chatsbubble.findIndex((x) => x.id == user.id);
        if (userIndex !== -1) {
          return;
        }
        const { id, name } = user;
        const userChat: IuserChat = {
          id,
          name,
          data_chat: chat,
        };
        this.chatsbubble.push(userChat);
      } else if (chat.type == 'group') {
        const userIndex = this.chatsbubble.findIndex(
          (x) => x.id.toString() == chat._id
        );
        if (userIndex !== -1) {
          return;
        }
        const userChat: IuserChat = {
          id: chat._id,
          name: chat.name,
          data_chat: chat,
        };
        this.chatsbubble.push(userChat);
      }
    }
  }

  closeChatBubble(user_id): void {
    const userChatIndex = this.chatsbubble.findIndex(
      (user) => user.id === user_id
    );
    if (userChatIndex !== -1) {
      this.chatsbubble.splice(userChatIndex, 1);
    }
  }

  onScroll(): void {
    this.getAllUsers();
  }

  chatMethod(index, item): void {
    return item.id;
  }

  onSelectChats(event): void {
    this.s_standart.index(`chats/user-chats`).subscribe((res) => {
      this.chats = res.data.data;
    });
  }

  markReadMessage(chat_id): void {
    this.s_standart
      .updatePut(`chats/${chat_id}/mark-read`, {})
      .subscribe((res) => {
        console.log(res);
      });
  }

  upBubble(index): void {
    this.chatsbubble = this.array_move(this.chatsbubble, index, this.chatsbubble.length - 1);
  }
}
