import { MethodsHttpService } from './../../services/methods-http.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChildren } from '@angular/core';
import Echo from 'laravel-echo';
import { environment } from '../../../environments/environment';
import { EchoManager, EchoOptions } from '../../class/echo-manager';
import { User } from '../../class/fast-data';
import { IchatBot, Chat, ChatEvent, ImessageChat, IparticipantChat, IuserChat, UserChatSearch } from '../../interfaces/chats/ichats';
import { SharedService } from '../../services/shared/shared.service';
// import { StandartSearchService } from '../../services/standart-search.service';
// import { StorageService } from '../../services/storage.service';
import { SwalService } from '../../services/swal.service';
import { CONST_ECHO_CHAT_CHANNEL_PRIVATE } from '../../shared/objects/constants';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from '../../modules/chats/services/chat.service';


interface IDeliveryMessageListen {
  chat_id: string;
  is_delivered_for_all: boolean;
  message_id: string;
  user: IparticipantChat;
}
@Component({
  selector: 'app-chat-template',
  templateUrl: './chat-template.component.html',
  styleUrls: ['./chat-template.component.scss'],
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
    // private s_storage: StorageService,
    // private s_standard: StandartSearchService
    private methodHttp: MethodsHttpService,
    private chatService: ChatService,
  ) { }

  @Input() openOrClose: boolean = false;
  @Output() newMessageEmit = new EventEmitter<boolean>();
  bots: Map<number | string, Chat> = new Map<number | string, Chat>();
  chats: Map<number | string, Chat> = new Map<number | string, Chat>();
  chatsbubble: Map<number | string, Chat> = new Map<number | string, Chat>();
  users: Map<number | string, UserChatSearch> = new Map();
  hideUsers: boolean = true;
  page: number = 1;
  myUser: any = null;
  index: number = 100;
  echoChat: Echo;
  current_chat_id: string | any = null;
  last_chat_id: string | any = null;
  is_status_connect_chat: boolean = true;
  first_connect: boolean = false;
  activeTab: 'chats' | 'users' | 'bots' = 'chats';
  @ViewChildren(ChatComponent) chatsComponent: ChatComponent[];

  ngOnInit(): void {
    this.myUser = User.getUser();
    this.connectionChat();
    this.echoChat.connector.pusher.connection.bind('connecting', () => {
      this.is_status_connect_chat = false;
    });

    this.echoChat.connector.pusher.connection.bind('state_change', () => {

    });

    this.echoChat.connector.pusher.connection.bind('connected', () => {
      this.is_status_connect_chat = true;
      if (!this.first_connect) {
        this.first_connect = true;
      }

    });
    this.getAllUsers();
    this.onSelectChats(null);
    this.getAllBots();
    this.markDoDeliveryAll();
  }


  connectionChat(): void {
    const optionEcho: EchoOptions = {
      wsHost: environment.domain_serve_chat,
      wsPort: environment.portSocket_chat,
      wssPort: environment.portSocket_chat,
    }
    this.echoChat = new EchoManager().set(optionEcho).get();
    this.echoChat.private(this.getChannelChat())
      .listen(`.chat`, this.chatListen.bind(this))
      .listen('.message', this.getMessages.bind(this))
      .listen('.typing', this.typingUserListen.bind(this))
      .listen('.message_delivered', this.messageDeliveredListen.bind(this))
      .listen('.message_readed', this.getMessageReaded.bind(this))
      .listen('.message_deleted', this.deleteMessage.bind(this));
    this.echoChat
      .private(`chat_users`)
      .listen('.user', this.getChatUserStatus.bind(this));
  }

  getChannelChat(): string {
    return CONST_ECHO_CHAT_CHANNEL_PRIVATE(User.getUser().id);
  }

  ngOnDestroy(): void {
    this.echoChat.leave(this.getChannelChat());
  }

  changeTab(tab: 'chats' | 'users' | 'bots'): void {
    this.activeTab = tab;
  }
  
  markDoDeliveryAll(): void {
    this.methodHttp.methodPut('chats/mark-delivered', {}).subscribe(() => {});
  }

  markDoDelivery(id: number | string): void {
    SharedService.disabled_loader = true;
    this.methodHttp.methodPut(`chats/${id}/mark-delivered`, {}).subscribe( () => {});
  }

  messageDeliveredListen(event: IDeliveryMessageListen): void {
    if (this.chats.has(event.chat_id)) {
      this.chats.get(event.chat_id)!.last_message!.is_delivered_for_all = event.is_delivered_for_all;
    }
    if (this.chatsbubble.has(event.chat_id)) {
      // const msm = this.chatsbubble.get(event.chat_id)!.messages;
      // const msmIndex = msm.findIndex(m => m._id === event.message_id);
      // msm[msmIndex].is_delivered_for_all = event.is_delivered_for_all;
    }
  }

  deleteMessage(event: { chat_id: string, message_id: string }) {
    if (this.chatsbubble.has(event.chat_id)) {
      // const messages = this.chatsbubble.get(event.chat_id)!.messages;
      // const indexMsm = messages.findIndex(msm => msm._id === event.message_id);
      // if (indexMsm > -1) {
      //   const msm = messages[indexMsm];
      //   msm.text = '🚫 Este mensaje fue eliminado por el remitente';
      //   msm.files = [];
      //   msm.links = [];
      // }
    }
  }

  chatListen(event: { chat: ChatEvent; event: 'created' | 'updated' | 'deleted' }): void {
    console.log('chatListen', event)
    if (event.event == 'created') {
      const chat = event.chat;
      // * Elimina mi usuario de la lista de participantes
      const participantsIndex = chat.participants.findIndex(x => x.info.id == this.myUser.id);
      if (participantsIndex != -1) {
        chat.participants.splice(participantsIndex, 1);
      }
      const name = chat.name || chat.participants[0].info.name;

      const newChat: Chat = {
        id: chat._id,
        person: null,
        connected: chat.participants[0].status == 'online' ? 1 : 0,
        data: chat,
        index: this.index,
        name,
        last_message: chat.last_message,
        typing: false,
        img: chat?.type == 'group' ? chat.img || 'assets/img/user_group.png' : chat.participants[0].info.photo || 'https://ui-avatars.com/api/?background=random&name=' + name,
      };
      this.chats.set(event.chat._id, newChat);
      return;
    }
    if (event.event == 'updated') {
      if (this.chats.has(event.chat._id)) {
        const chat = this.chats.get(event.chat._id)!;
        if (!this.chatsbubble.has(event.chat._id)) {
          chat.data.unread_messages_count = event.chat.unread_messages_count;
        } else if (event.chat._id != this.current_chat_id) {
          chat.data.unread_messages_count = event.chat.unread_messages_count;
        }
        if (chat.data.type != 'group') {
          const statusParticipant = event.chat.participants.find(x => x.id != this.myUser.id);
          chat.data.participants.find(x => x.id != this.myUser.id)!.status = statusParticipant!.status;
          chat.connected = statusParticipant!.status == 'online' ? 1 : 0;
          if (this.chatsbubble.has(event.chat._id)) {
            this.chatsbubble.get(event.chat._id)!.connected = chat.connected;
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
      if (this.chatsbubble.has(event.chat._id)) {
        this.chatsbubble.delete(event.chat._id);
        SwalService.swalFire({ icon: 'error', title: 'Error', text: 'El chat ha sido eliminado' });
      }
      return;
    }
  }

  getMessages(event: { chat: ChatEvent; message: ImessageChat }): void {
    // * si no esta abierto el panel de chat suma uno en el icono del chat
    if (!this.openOrClose) {
      this.newMessageEmit.emit(true);
    }
    const isExistChatBubble = this.chatsbubble.has(event.chat._id);
    // * si no existe el chat en el mapa de chats lo crea
    if (!this.chats.has(event.chat._id)) {
      this.generateChat(event.chat, event.message);
    }
    const _chat = this.chats.get(event.chat._id)!;
    // * si el chat del mensaje es diferente al chat abierto emite el sonido
    if (event.chat._id != this.current_chat_id) {
      this.reproducir();
    }
    // * captura  el chat en el mapa de chats lo actualiza
    _chat.last_message = event.message || null;
    _chat.typing = false;
    // * si existe una conversacion abierta actualiza el chat
    if (isExistChatBubble) {
      const _chat_bubble = this.chatsbubble.get(event.chat._id)!;
      // _chat_bubble.messages.push(event.message);
      _chat_bubble.typing = false;
    }


    this.markDoDelivery(event.chat._id);
  }

  generateChat(chat: ChatEvent, message): void {
    this.chats.set(chat._id, {
      id: chat._id,
      person: null,
      connected: chat.participants[0].status == 'online' ? 1 : 0,
      data: chat,
      index: this.index,
      img: chat.participants[0]?.info?.photo!,
      name: chat.participants[0]?.info?.name!,
      last_message: message,
      typing: false,
    });
  }

  reproducir() {
    const audio = new Audio('assets/audio/new_message.wav');
    audio.play();
  }

  // * función que escucha si se emite un evento de que el usuario esta conectado o no
  getChatUserStatus(event: {
    event: string;
    user: { id: number; status: 'offline' | 'online'; _id: string, last_seen: string };
  }): void {
    if (this.users.has(event.user._id)) {
      this.users.get(event.user.id)!.connected = event.user.status == 'online' ? true : false;
    }
  }

  // * funcion que escucha si se emite un evento de si el mensaje es leido o no
  getMessageReaded(event: { chat_id: string, is_readed_for_all: boolean, message_id: string, user: IuserChat }): void {

    if (!event.is_readed_for_all) { return; }
    this.chats.get(event.chat_id)!.last_message!.is_readed_for_all! = true;
    if (this.chatsbubble.has(event.chat_id)) {
      // const _chat = this.chatsbubble.get(event.chat_id)!;
      // _chat.messages.map((message) => {
      //   return (message.is_readed_for_all = true);
      // });
    }
  }

  getPhotoGroup(img): string {
      return img || 'assets/img/user_group.png';
    // let img_path = 'assets/img/user.png';
    // return img || 'https://ui-avatars.com/api/?name=' + name;
    // return SharedService.rediredImageNull(user, img_path);
  }

  getPhotoParticipant(img, name): string {
    return img || 'https://ui-avatars.com/api/?background=random&name=' + name;
  }


  // * funcion que trae todos los usuario de la base de datos
  getAllUsers(search: string | null = null): void {
    this.page = 1;
    const data_send = { search: search, page: this.page.toString(), pageSize: '30' };
    this.methodHttp.methodGet('chats', data_send).subscribe(
      (data: any) => {
        if (data.data.data.length < 1) {
          this.users.clear();
          return;
        }
        this.users.clear();
        data.data.data.map((x) => {
          const { connected, id, name, person, } = x;
          const _name = person ? `${person.first_name} ${person.last_name}` : name;
          this.users.set(x.id, { connected, id, name: _name, person, });
        });
        this.page++;
      }
    );
  }

  // * funcion que trae todos los bots de chats de la base de datos
  getAllBots(): void {
    this.methodHttp.methodGet('chats/bots', {page: this.page.toString() || 30}, ).subscribe(
      (data: any) => {
        if (data.data.data.length < 1) {
          return;
        }
        data.data.data.map((x: IchatBot) => {
          const { _id, info } = x;
          this.bots.set(_id, { connected: 1, id: _id, name: info.name, person: null, data: (null as any), img: info.photo, index: this.index, typing: false, });
        });
        this.page++;
      }
    );
  }

  typingUserListen(event): void {
    const _chat = this.chats.get(event.chat_id);
    _chat!.typing = true;
    const isChatBubble = this.chatsbubble.has(event.chat_id);
    if (isChatBubble) {
      const _chat_bubble = this.chatsbubble.get(event.chat_id);
      _chat_bubble!.typing = true;
    }
    setTimeout(() => {
      this.chats.get(event.chat_id)!.typing = false;
      if (isChatBubble) { this.chatsbubble.get(event.chat_id)!.typing = false; }
    }, 2000);
  }


  openChatUser(user_id, key): void {
    if (this.chatsbubble.has(key)) {
      this.upBubble(key);
      return;
    }
    this.methodHttp
      .methodPost(`chats/user`, { participants: [user_id] })
      .subscribe((data) => {
        const id = data.data.chats._id;
        if (this.chatsbubble.has(id)) {
          this.upBubble(id);
          this.users.get(user_id)!.id = id;
          return;
        }
        // const res = data.data as { chats: Ichats, messages: any[] };
        const _chat = this.users.get(user_id)!;
        // _chat.data = res.chats;
        // _chat.id = res.chats._id;
        // _chat.messages = [];
        // _chat.messages = data.data.messages.data.reverse();
        // this.chatsbubble.set(_chat.id, _chat);
        // _chat.index = this.index++;
        this.current_chat_id = _chat.id;
      });
  }

  openChatBot(bot_id, key): void {
    if (this.chatsbubble.has(key)) {
      this.upBubble(key);
      return;
    }

    this.methodHttp
      .methodPost(`chats/user`, { participants: [bot_id] })
      .subscribe((data) => {
        const id = data.data.chats._id;

        if (this.chatsbubble.has(id)) {
          this.upBubble(id);
          return;
        }
        const res = data.data as { chats: ChatEvent, messages: any[] };
        const _chat = this.bots.get(bot_id)!;
        _chat.data = res.chats;
        _chat.id = res.chats._id;
        // _chat.messages = data.data.messages.data.reverse();
        // _chat.messages = [];
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
      const chat = this.chats.get(chat_id)!;
      const _name = chat?.data.name || chat?.data.participants[0].info.name;

      const newChat: Chat = {
        id: chat.id,
        person: null,
        connected: chat?.data.participants[0].status == 'online' ? 1 : 0,
        data: chat.data,
        index: this.index++,
        img: chat?.data.type == 'group' ? this.getPhotoGroup(chat.img) : this.getPhotoParticipant(chat.data.participants[0].info.photo, _name),
        name: _name,
        // messages: [],
        typing: false,
      };
      this.current_chat_id = chat_id;
      this.chatsbubble.set(chat!.id, newChat);
    }
  }

  closeChatBubble(user_id): void {
    this.chatsbubble.delete(user_id);
    if (this.chatsbubble.size >= 1) {
      const key = this.chatsbubble.keys().next().value;
      this.upBubble(key);
    } else {
      this.current_chat_id = (null as any);
    }
  }

  onScroll(search = null): void {
    const data_send = { search, page: this.page.toString(), pageSize: '30' };
    this.methodHttp.methodGet('chats', data_send).subscribe(
      (data: any) => {
        if (data.data.data.length < 1) {
          return;
        }
        data.data.data.map((x) => {
          const { connected, id, name, person } = x;
          const fullName = person ? `${person.first_name} ${person.last_name}` : name;
          this.users.set(x.id, { connected, id, name: fullName, person });
        });
        this.page++;
      }
    );
  }

  chatMethod(_index, item): void {
    return item.key;
  }

  onSelectChats(_event): void {
    this.methodHttp.methodGet(`chats/user-chats`).subscribe((res) => {
      const data = res.data.data as ChatEvent[];
      const _chat: any = [];
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
      this.chats = new Map<string, Chat>(_chat.map((x) => x));
    });
  }

  markReadMessage(chat_id): void {
    SharedService.disabled_loader = true;
    this.methodHttp
      .methodPut(`chats/${chat_id}/mark-read`, {})
      .subscribe(() => {
        this.chats.get(chat_id)!.data.unread_messages_count = 0;
      });
  }

  upBubble(_id) {
    const chatBubble = this.chatsbubble.get(_id);
    this.current_chat_id = _id;
    SharedService.disabled_loader = true;
    if (this.chatsbubble.get(_id)?.data?.unread_messages_count! > 0) {
      this.markReadMessage(_id);
    }
    chatBubble!.index = this.index++;
  }

}
