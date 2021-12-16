import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChildren } from '@angular/core';
import Echo from 'laravel-echo';
import { EchoManager } from '../../class/echo-manager';
import { IchatBot, IchatBubble, Ichats, ImessageChat, IparticipantChat, IuserChat } from '../../interfaces/chats/ichats';
import { SharedService } from '../../services/shared/shared.service';
import { StandartSearchService } from '../../services/standart-search.service';
import { StorageService } from '../../services/storage.service';
import { SwalService } from '../../services/swal.service';
import { ChatComponent } from './chat/chat.component';


interface IDeliveryMessageListen {
  chat_id: string;
  is_delivered_for_all: boolean;
  message_id: string;
  user: IparticipantChat;
}
@Component({
  selector: 'app-chat-template',
  templateUrl: './chat-template.component.html',
  styleUrls: ['./chat-template.component.css'],
  animations: [trigger('fade', [
    transition(
      ':leave', [

      style({ transform: 'scale(1)', opacity: '1' }),
      animate(300, style({ transform: 'scale(0)', opacity: '0' }))
    ]
    ),
    transition(':enter', [
      style({ transform: 'scale(0)', opacity: '0' }),
      animate(300)
    ]),
  ])],
})
export class ChatTemplateComponent implements OnInit, OnDestroy {
  constructor(
    private s_storage: StorageService,
    private s_standard: StandartSearchService
  ) { }

  @Input() openOrClose: boolean = false;
  @Output() newMessageEmit = new EventEmitter<boolean>();
  bots: Map<number | string, IchatBubble> = new Map<number | string, IchatBubble>();
  chats: Map<number | string, IchatBubble> = new Map<number | string, IchatBubble>();
  chatsbubble: Map<number | string, IchatBubble> = new Map<number | string, IchatBubble>();
  users: Map<number | string, IchatBubble> = new Map<number | string, IchatBubble>();
  hideUsers: boolean = true;
  page: number = 1;
  myUser: any = null;
  index: number = 9999;
  echoChat: Echo;
  current_chat_id: string = null;
  last_chat_id: string = null;
  is_status_connect_chat: boolean = true;
  first_connect: boolean = false;
  @ViewChildren(ChatComponent) chatsComponent: ChatComponent[];

  ngOnInit(): void {
    this.myUser = this.s_storage.getCurrentUser();
    this.echoChat = new EchoManager(this.s_storage).chat_echo;
    this.echoChat.private(`chat.${this.myUser.id}`)
      .listen(`.chat`, this.modificationChatListen.bind(this))
      .listen('.message', this.getMessages.bind(this))
      .listen('.typing', this.typingUserListen.bind(this))
      .listen('.message_delivered', this.messageDeliveredListen.bind(this))
      .listen('.message_readed', this.getMessageReaded.bind(this))
      .listen('.message_deleted', this.deleteMessage.bind(this));
    this.echoChat
      .private(`chat_users`)
      .listen('.user', this.getChatUserStatus.bind(this));

    this.echoChat.connector.pusher.connection.bind('connecting', (payload) => {
      /**
       * All dependencies have been loaded and Channels is trying to connect.
       * The connection will also enter this state when it is trying to reconnect after a connection failure.
       */
      console.log('connecting...');
      this.is_status_connect_chat = false;
    });

    this.echoChat.connector.pusher.connection.bind('connected', (payload) => {
      /**
       * The connection to Channels is open and authenticated with your app.
       */
      console.log('connected!', payload);
      this.is_status_connect_chat = true;
      if (!this.first_connect) {
        this.first_connect = true;
      } else {
        console.log('new connection');
        this.onSelectChats(null);
        if (this.chatsComponent.length > 0) {
          console.log(this.chatsComponent.length > 0);
          this.chatsComponent.forEach(chat => {
            chat.getMessageReconnected();
          });
        }

      }

    });

    // this.echoChat.connector.pusher.connection.bind('unavailable', (payload) => {
    //     /**
    //      *  The connection is temporarily unavailable. In most cases this means that there is no internet connection.
    //      *  It could also mean that Channels is down, or some intermediary is blocking the connection. In this state,
    //      *  pusher-js will automatically retry the connection every 15 seconds.
    //      */
    //     console.log('unavailable', payload);
    // });

    // this.echoChat.connector.pusher.connection.bind('failed', (payload) => {
    //     /**
    //      * Channels is not supported by the browser.
    //      * This implies that WebSockets are not natively available and an HTTP-based transport could not be found.
    //      */

    //     console.log('failed', payload);

    // });

    // this.echoChat.connector.pusher.connection.bind('disconnected', (payload) => {

    //     /**
    //      * The Channels connection was previously connected and has now intentionally been closed
    //      */

    //     console.log('disconnected', payload);

    // });

    // this.echoChat.connector.pusher.connection.bind('message', (payload) => {

    //     /**
    //      * Ping received from server
    //      */
    //     console.log('message', payload);
    // });
    this.getAllUsers();
    this.onSelectChats(null);
    this.getAllBots();
    this.markDoDeliveryAll();
  }

  ngOnDestroy(): void {
    this.echoChat.leave(`chat.${this.myUser.id}`);
  }

  markDoDeliveryAll(): void {
    this.s_standard.updatePut('chats/mark-delivered', {}).subscribe(
      (res: any) => {
        console.log(res);
      }
    );
  }

  markDoDelivery(id: number | string): void {
    SharedService.disabled_loader = true;
    this.s_standard.updatePut(`chats/${id}/mark-delivered`, {}).subscribe(
      (res: any) => {
        console.log(res);
      }
    );
  }

  messageDeliveredListen(event: IDeliveryMessageListen): void {
    // console.log('message_delivered', event);
    if (this.chats.has(event.chat_id)) {
      this.chats.get(event.chat_id).last_message.is_delivered_for_all = event.is_delivered_for_all;
    }
    if (this.chatsbubble.has(event.chat_id)) {
      const msm = this.chatsbubble.get(event.chat_id).messages;
      const msmIndex = msm.findIndex(m => m._id === event.message_id);
      msm[msmIndex].is_delivered_for_all = event.is_delivered_for_all;
    }
    // if (!event.is_readed_for_all) { return; }
    // this.chats.get(event.chat_id).last_message.is_readed_for_all = true;
    // if (this.chatsbubble.has(event.chat_id)) {
    //   const _chat = this.chatsbubble.get(event.chat_id);
    //   _chat.messages.map((message) => {
    //     return (message.is_readed_for_all = true);
    //   });
    // }
  }

  deleteMessage(event: { chat_id: string, message_id: string }) {
    console.log('deleteMessage', event);
    if (this.chatsbubble.has(event.chat_id)) {
      const messages = this.chatsbubble.get(event.chat_id).messages;
      const indexMsm = messages.findIndex(msm => msm._id === event.message_id);
      if (indexMsm > -1) {
        const msm = messages[indexMsm];
        msm.text = '🚫 Este mensaje fue eliminado por el remitente';
        msm.files = [];
        msm.links = [];
      }
    }
    const _chat = this.chats.get(event.chat_id);
    _chat.last_message.text = '🚫 Este mensaje fue eliminado por el remitente';
    _chat.last_message.files = [];
    _chat.last_message.links = [];
  }

  modificationChatListen(event: { chat: Ichats; event: 'created' | 'updated' | 'deleted' }): void {
    if (event.event == 'created') {
      const chat = event.chat;
      // * Elimina mi usuario de la lista de participantes
      const participantsIndex = chat.participants.findIndex(x => x.info.id == this.myUser.id);
      if (participantsIndex != -1) {
        chat.participants.splice(participantsIndex, 1);
      }
      const _name = chat.name || chat.participants[0].info.name;

      const newChat: IchatBubble = {
        id: chat._id,
        person: null,
        connected: chat.participants[0].status == 'online' ? 1 : 0,
        data: chat,
        messages: [],
        index: this.index,
        name: chat.name || chat.participants[0].info.name,
        last_message: chat.last_message,
        typing: false,
        img: chat?.type == 'group' ? this.getPhotoGroup(chat.img) : this.getPhotoParticipant(chat.participants[0].info.photo, _name),
      };
      this.chats.set(event.chat._id, newChat);
      return;
    }
    if (event.event == 'updated') {
      if (this.chats.has(event.chat._id)) {
        const chat = this.chats.get(event.chat._id);
        if (!this.chatsbubble.has(event.chat._id)) {
          chat.data.unread_messages_count = event.chat.unread_messages_count;
        } else if (event.chat._id != this.current_chat_id) {
          chat.data.unread_messages_count = event.chat.unread_messages_count;
        }
        if (chat.data.type != 'group') {
          const statusParticipant = event.chat.participants.find(x => x.id != this.myUser.id);
          chat.data.participants.find(x => x.id != this.myUser.id).status = statusParticipant.status;
          chat.connected = statusParticipant.status == 'online' ? 1 : 0;
          if (this.chatsbubble.has(event.chat._id)) {
            this.chatsbubble.get(event.chat._id).connected = chat.connected;
          }
        } else {
          chat.data.owner_is_admin = event.chat.owner_is_admin;
          chat.name = event.chat.name;
          chat.data.name = event.chat.name;
          chat.img = event.chat.img || 'assets/img/user_group.png';
        }
        chat.data.participants = event.chat.participants.filter(x => x.id != this.myUser.id);
      }
      return;
    }
    if (event.event == 'deleted') {
      this.chats.delete(event.chat._id);
      if(this.chatsbubble.has(event.chat._id)) {
        this.chatsbubble.delete(event.chat._id);
        SwalService.swalFire({icon: 'error', title: 'Error', text: 'El chat ha sido eliminado'});
      }
      return;
    }
  }

  getMessages(event: { chat: Ichats; message: ImessageChat }): void {
    // * si no esta abierto el panel de chat suma uno en el icono del chat
    console.log('getMessages', event);
    if (!this.openOrClose) {
      this.newMessageEmit.emit(true);
    }
    const isExistChatBubble = this.chatsbubble.has(event.chat._id);
    // * si no existe el chat en el mapa de chats lo crea
    if (!this.chats.has(event.chat._id)) {
      // if (isExistChatBubble) {
      //   event.chat.unread_messages_count = 0;
      // }
      this.chats.set(event.chat._id, {
        id: event.chat._id,
        person: null,
        connected: event.chat.participants[0].status == 'online' ? 1 : 0,
        data: event.chat,
        messages: [],
        index: this.index,
        img: event.chat.participants[0]?.info?.photo,
        name: event.chat.participants[0]?.info?.name,
        last_message: event.message,
        typing: false,
      });
    }
    const _chat = this.chats.get(event.chat._id);
    // * si el chat del mensaje es diferente al chat abierto emite el sonido
    if (event.chat._id != this.current_chat_id) {
      this.reproducir();
    }
    // * captura  el chat en el mapa de chats lo actualiza
    _chat.last_message = event.message || null;
    _chat.typing = false;
    // * si existe una conversacion abierta actualiza el chat
    if (isExistChatBubble) {
      const _chat_bubble = this.chatsbubble.get(event.chat._id);
      _chat_bubble.messages.push(event.message);
      _chat_bubble.typing = false;
    }


    this.markDoDelivery(event.chat._id);
  }

  reproducir() {
    const audio = new Audio('assets/audio/new_message.wav');
    audio.play();
  }

  // * funcion que escucha si se emite un evento de que el usuario esta conectado o no
  getChatUserStatus(event: {
    event: string;
    user: { id: number; status: 'offline' | 'online'; _id: string, last_seen: string };
  }): void {
    if (this.users.has(event.user._id)) {
      this.users.get(event.user.id).connected = event.user.status == 'online' ? 1 : 0;
    }
  }

  // * funcion que escucha si se emite un evento de si el mensaje es leido o no
  getMessageReaded(event: { chat_id: string, is_readed_for_all: boolean, message_id: string, user: IuserChat }): void {

    if (!event.is_readed_for_all) { return; }
    this.chats.get(event.chat_id).last_message.is_readed_for_all = true;
    if (this.chatsbubble.has(event.chat_id)) {
      const _chat = this.chatsbubble.get(event.chat_id);
      _chat.messages.map((message) => {
        return (message.is_readed_for_all = true);
      });
    }
  }

  getPhotoGroup(img): string {
    if (!img) {
      return 'assets/img/user_group.png';
    }
    return img;
    // let img_path = 'assets/img/user.png';
    // return img || 'https://ui-avatars.com/api/?name=' + name;
    // return SharedService.rediredImageNull(user, img_path);
  }

  getPhotoParticipant(img, name): string {
    return img || 'https://ui-avatars.com/api/?name=' + name;
  }


  // * funcion que trae todos los usuario de la base de datos
  getAllUsers(search: string = null): void {
    this.page = 1;
    const data_send = { search: search, page: this.page.toString(), pageSize: '30' };
    this.s_standard.search2('chats', data_send).subscribe(
      (data: any) => {
        if (data.data.data.length < 1) {
          this.users.clear();
          return;
        }
        this.users.clear();
        data.data.data.map((x) => {
          const { connected, id, name, person, } = x;
          const _name = person ? `${person.first_name} ${person.last_name}` : name;
          this.users.set(x.id, { connected, id, name: _name, person, data: null, img: this.getPhotoParticipant(person?.photo?.permalink, _name), index: this.index, messages: [], typing: false, });
        });
        this.page++;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // * funcion que trae todos los bots de chats de la base de datos
  getAllBots(): void {
    this.s_standard.index('chats/bots', this.page.toString(), '30').subscribe(
      (data: any) => {
        if (data.data.data.length < 1) {
          return;
        }
        console.log(data);
        data.data.data.map((x: IchatBot) => {
          const { _id, info } = x;
          this.bots.set(_id, { connected: 1, id: _id, name: info.name, person: null, data: null, img: info.photo, index: this.index, messages: [], typing: false, });
        });
        this.page++;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  typingUserListen(event): void {
    const _chat = this.chats.get(event.chat_id);
    _chat.typing = true;
    console.log(event, this.chats.get(event.chat_id));
    const isChatBubble = this.chatsbubble.has(event.chat_id);
    if (isChatBubble) {
      const _chat_bubble = this.chatsbubble.get(event.chat_id);
      _chat_bubble.typing = true;
    }
    setTimeout(() => {
      this.chats.get(event.chat_id).typing = false;
      if (isChatBubble) { this.chatsbubble.get(event.chat_id).typing = false; }
    }, 2000);
  }


  openChatUser(user_id, key): void {
    console.log({ key })
    if (this.chatsbubble.has(key)) {
      this.upBubble(key);
      return;
    }
    this.s_standard
      .store(`chats/user`, { participants: [user_id] })
      .subscribe((data) => {
        const id = data.data.chats._id;
        if (this.chatsbubble.has(id)) {
          this.upBubble(id);
          this.users.get(user_id).id = id;
          return;
        }
        const res = data.data as { chats: Ichats, messages: any[] };
        const _chat = this.users.get(user_id);
        // console.log({ _chat });
        _chat.data = res.chats;
        _chat.id = res.chats._id;
        _chat.messages = data.data.messages.data.reverse();
        this.chatsbubble.set(_chat.id, _chat);
        _chat.index = this.index++;
        this.current_chat_id = _chat.id;
      });
  }

  openChatBot(bot_id, key): void {
    if (this.chatsbubble.has(key)) {
      this.upBubble(key);
      return;
    }

    this.s_standard
      .store(`chats/user`, { participants: [bot_id] })
      .subscribe((data) => {
        const id = data.data.chats._id;

        if (this.chatsbubble.has(id)) {
          this.upBubble(id);
          return;
        }
        const res = data.data as { chats: Ichats, messages: any[] };
        const _chat = this.bots.get(bot_id);
        _chat.data = res.chats;
        _chat.id = res.chats._id;
        _chat.messages = data.data.messages.data.reverse();
        _chat.index = this.index++;
        this.current_chat_id = _chat.id;
        this.chatsbubble.set(_chat.id, _chat);
      });
  }


  openChatOfChat(chat_id): void {
    if (this.chatsbubble.has(chat_id)) {
      this.upBubble(chat_id);
      return;
    }
    if (this.chats.has(chat_id)) {
      const chat = this.chats.get(chat_id);
      // console.log(chat);
      const _name = chat.data.name || chat.data.participants[0].info.name;

      const newChat: IchatBubble = {
        id: chat.id,
        person: null,
        connected: chat.data.participants[0].status == 'online' ? 1 : 0,
        data: chat.data,
        index: this.index++,
        // img: chat.data.type == 'group' chat.data.participants[0].info.photo,
        img: chat.data.type == 'group' ? this.getPhotoGroup(chat.img) : this.getPhotoParticipant(chat.data.participants[0].info.photo, _name),
        name: _name,
        messages: [],
        typing: false,
      };
      this.current_chat_id = chat_id;
      // console.log(this.chatsbubble.entries());

      this.chatsbubble.set(chat.id, newChat);
      console.log(this.chatsbubble);

    }
  }

  closeChatBubble(user_id): void {
    this.chatsbubble.delete(user_id);
    if (this.chatsbubble.size >= 1) {
      const key = this.chatsbubble.keys().next().value;
      this.upBubble(key);
    } else {
      this.current_chat_id = null;
    }
  }

  onScroll(search = null): void {
    const data_send = { search, page: this.page.toString(), pageSize: '30' };
    this.s_standard.search2('chats', data_send).subscribe(
      (data: any) => {
        if (data.data.data.length < 1) {
          return;
        }
        data.data.data.map((x) => {
          const { connected, id, name, person } = x;
          const _name = person ? `${person.first_name} ${person.last_name}` : name;
          this.users.set(x.id, { connected, id, name: _name, person, data: null, img: this.getPhotoParticipant(person?.photo?.permalink, _name), index: this.index, messages: [], typing: false });
        });
        this.page++;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  chatMethod(index, item): void {
    return item.key;
  }

  onSelectChats(event): void {
    this.s_standard.index(`chats/user-chats`).subscribe((res) => {
      const data = res.data.data as Ichats[];
      const _chat = [];
      data.map((x) => {
        const participant = x.participants[0] as IparticipantChat;
        const _name = x.name || participant.info.name;
        _chat.push([x._id,
        {
          connected: participant.status == 'online' ? 1 : 0,
          id: x._id,
          name: _name,
          person: null,
          data: x,
          img: x?.type == 'group' ? this.getPhotoGroup(x.img) : this.getPhotoParticipant(participant.info.photo, _name),
          index: this.index, messages: [],
          last_message: x.last_message
        }]);
      });
      this.chats = new Map<string, IchatBubble>(_chat.map((x) => x));
      console.log(this.chats);
    });
  }

  // markReadMessage(chat_id): void {
  //   this.s_standard
  //     .updatePut(`chats/${chat_id}/mark-read`, {})
  //     .subscribe((res) => {
  //     });
  // }

  markReadMessage(chat_id): void {
    SharedService.disabled_loader = true;
    this.s_standard
      .updatePut(`chats/${chat_id}/mark-read`, {}, false)
      .subscribe((res) => {
        // console.log(res);
        this.chats.get(chat_id).data.unread_messages_count = 0;
      });
  }

  upBubble(_id) {
    const chatBubble = this.chatsbubble.get(_id);
    this.current_chat_id = _id;
    SharedService.disabled_loader = true;
    if (this.chatsbubble.get(_id).data?.unread_messages_count > 0) {
      this.markReadMessage(_id);
    }
    chatBubble.index = this.index++;
  }



  // valueOrder = (a: KeyValue<number, IchatBubble>, b: KeyValue<number, IchatBubble>): number => {

  //   return b.value.data.last_message.created_at.localeCompare(a.value.data.last_message.created_at);
  // }


}
