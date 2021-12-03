import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import Echo from 'laravel-echo';
import { EchoManager } from '../../class/echo-manager';
import { IchatBot, Ichats, ImessageChat, IuserChat } from '../../interfaces/chats/ichats';
import { SharedService } from '../../services/shared/shared.service';
import { StandartSearchService } from '../../services/standart-search.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-chat-template',
  templateUrl: './chat-template.component.html',
  styleUrls: ['./chat-template.component.css'],
  animations: [trigger('fade', [
    transition(
      ':leave', [
        style({ transform: 'translateY(0%)', opacity: '1' }),
        animate(500, style({ transform: 'translateY(110%)', opacity: '0' }))
      ]
    ),
    transition(':enter', [
      style({ transform: 'translateY(110%)', opacity: '0' }),
      animate(500)
    ]),
  ])],
})
export class ChatTemplateComponent implements OnInit, OnDestroy {
  constructor(
    private s_storage: StorageService,
    private s_standart: StandartSearchService
  ) {}

  @Input() openOrClose: boolean = false;
  @Output() newMessageEmit = new EventEmitter<boolean>();
  users: IuserChat[] = [];
  bots: IchatBot[] = [];
  chats: Ichats[] = [];
  chatsbubble: IuserChat[] = [];
  hideUsers: boolean = true;
  page: number = 1;
  myUser: any = null;
  index: number = 9999;
  echoChat: Echo;


  ngOnInit(): void {
    this.myUser = this.s_storage.getCurrentUser();
    this.echoChat = new EchoManager(this.s_storage).chat_echo;
    this.echoChat.private(`chat.${this.myUser.id}`)
      .listen(`.chat`, this.newChat.bind(this))
      .listen('.message', this.getMessages.bind(this))
      .listen('.typing', this.typingUser.bind(this))
      .listen('.message_readed', this.getMessageReaded.bind(this));
    this.echoChat
      .private(`chat_users`)
      .listen('.user', this.getChatUserStatus.bind(this));

  //   this.s_shared.echo.connector.pusher.connection.bind('connecting', (payload) => {
  //     /**
  //      * All dependencies have been loaded and Channels is trying to connect.
  //      * The connection will also enter this state when it is trying to reconnect after a connection failure.
  //      */
  //     console.log('connecting...');
  // });

  // this.s_shared.echo.connector.pusher.connection.bind('connected', (payload) => {
  //     /**
  //      * The connection to Channels is open and authenticated with your app.
  //      */
  //     console.log('connected!', payload);
  // });

  // this.s_shared.echo.connector.pusher.connection.bind('unavailable', (payload) => {
  //     /**
  //      *  The connection is temporarily unavailable. In most cases this means that there is no internet connection.
  //      *  It could also mean that Channels is down, or some intermediary is blocking the connection. In this state,
  //      *  pusher-js will automatically retry the connection every 15 seconds.
  //      */
  //     console.log('unavailable', payload);
  // });

  // this.s_shared.echo.connector.pusher.connection.bind('failed', (payload) => {
  //     /**
  //      * Channels is not supported by the browser.
  //      * This implies that WebSockets are not natively available and an HTTP-based transport could not be found.
  //      */
  
  //     console.log('failed', payload);
  
  // });
  
  // this.s_shared.echo.connector.pusher.connection.bind('disconnected', (payload) => {
  
  //     /**
  //      * The Channels connection was previously connected and has now intentionally been closed
  //      */
  
  //     console.log('disconnected', payload);
  
  // });
  
  // this.s_shared.echo.connector.pusher.connection.bind('message', (payload) => {
  
  //     /**
  //      * Ping received from server
  //      */
  
  //     console.log('message', payload);
  // });
    this.getAllUsers();
    this.onSelectChats(null);
    this.getAllBots();
  }

  ngOnDestroy(): void {
    this.echoChat.leave(`chat.${this.myUser.id}`);
  }

  newChat(event: { chat: Ichats; event: 'created'|'updated'|'deleted' }): void {
    if (event.event == 'created') {
      const chat = event.chat;
      const participantsIndex = chat.participants.findIndex(x => x.info.id == this.myUser.id);
      if ( participantsIndex != -1 ) {
        chat.participants.splice(participantsIndex, 1);
      }
      this.chats.unshift(event.chat);
      return;
    }
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
    console.log(event);
    
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
        author: event.message.author,
        type: event.message.type,
        files: event.message.files,
        created_at: event.message.created_at,
        author_user_id: event.message.author_user_id,
        is_readed_for_all: event.message.is_readed_for_all,
        links: event.message.links
      };
      if (!userChat?.messages) {userChat.messages = []; }
      userChat['messages'].push(message);
      // console.log({message, state: event.message.is_readed_for_all});

      if (chat != undefined) {
        if (!chat.last_message) {
          chat.last_message = {} as any;
        }
        chat.last_message.text = event.message.text;
        chat.last_message.files = Array.isArray(event.message.files);
        chat.last_message.author_user_id = event.message.author_user_id;
        chat.last_message.is_readed_for_all = event.message.is_readed_for_all;
        chat.last_message.created_at = event.message.created_at;
        if (chatIndex > 0) {
          this.chats = this.array_move(this.chats, chatIndex, 0);
        }
      }
    } else {
      // console.log('burbuja no encotrada');
      if (chat != undefined) {
        if (!chat.last_message) {
          chat.last_message = {} as any;
        }
        chat.unread_messages_count++;
        chat.last_message.text = event.message.text;
        chat.last_message.author_user_id = event.message.author_user_id;
        chat.last_message.is_readed_for_all = event.message.is_readed_for_all;
        chat.last_message.created_at = event.message.created_at;
        if (chatIndex > 0) {
          this.chats = this.array_move(this.chats, chatIndex, 0);
        }
      }
    }
    if (event.message.author_user_id != this.myUser.id) {
      this.reproducir();
    }
  }

   array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        let k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
}

reproducir() {
  const audio = new Audio('assets/audio/new_message.wav');
  audio.play();
}
  getChatUserStatus(event: {
    event: string;
    user: { id: number; status: 'offline' | 'online'; _id: string, last_seen: string };
  }): void {
    if (!this.chats) {
      return;
    }
    const chat = this.chats.find(
      (x) => x.participants[0].info.id == event.user.id
    );
    if (chat != undefined && chat.type == 'personal') {
      chat.participants[0].status = event.user.status;
      chat.participants[0].last_seen = event?.user?.last_seen || null;
    }
  }

  getMessageReaded(event: {chat_id: string, is_readed_for_all: boolean, message_id: string, user: IuserChat}): void {
    // console.log({ 'reader_event: ': event });
    const userChat = this.chatsbubble.find((x) => x.data_chat._id === event.chat_id);
    if (!event.is_readed_for_all) { return; }
    if (userChat != undefined) {
      userChat['messages'].map((message) => {
        return (message.is_readed_for_all = true);
      });
    }
    const chat = this.chats.find((x) => x._id === event.chat_id);
    if (chat != undefined) {
      if (chat.last_message) {
        chat.last_message.is_readed_for_all = true;
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

  getAllBots(): void {
    this.s_standart.index('chats/bots', this.page.toString(), '30').subscribe(
      (data: any) => {
        if (data.data.data.length < 1) {
          return;
        }
        console.log(data);
        
        this.bots = this.bots.concat(data.data.data);
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

  openChatBot(bot_id): void {
    const botChat = this.bots.find((bot) => bot._id === bot_id);
    const chatBubbleIndex = this.chatsbubble.findIndex(
      (bot) => bot.id === bot_id
    );
    if (botChat !== undefined && chatBubbleIndex == -1) {
      const userChat: IuserChat = {
        id: botChat._id,
        name: botChat.info.name,
        data_chat: null,
       
      };
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
          index: this.index
        };
        this.chatsbubble.push(userChat);
      } else if (chat.type == 'group') {
        const userIndex = this.chatsbubble.findIndex(
          (x) => x.id.toString() == chat._id
        );
        if (userIndex !== -1) {
          return;
        }
        chat.img = chat.img ? chat.img : 'assets/img/user_group.png';
        const userChat: IuserChat = {
          id: chat._id,
          name: chat.name,
          data_chat: chat,
          index: this.index,
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
        // console.log(res);
      });
  }

  // upBubble(index): void {
  //   this.chatsbubble = this.array_move(this.chatsbubble, index, this.chatsbubble.length - 1);
  // }
  upBubble(_id) {
    const chatBubble = this.chatsbubble.find((x) => x.data_chat._id == _id);
    if (chatBubble != undefined) {
      chatBubble.index = this.index++;

    }
  }


}
