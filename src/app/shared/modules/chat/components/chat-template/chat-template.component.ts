import { FormControl } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { MethodsHttpService } from '../../../../../services/methods-http.service';
// import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { User } from '../../../../../class/fast-data';
import { SharedService } from '../../../../../services/shared/shared.service';
import { ChatService } from '../../services/chat.service';
import { ChatEvent } from '../../types/chat-event';
import { Chat } from '../../types/chat';
import { CreateHostDirective } from '../../../../directives/create-host.directive';
import moment from 'moment';


@Component({
  selector: 'app-chat-template',
  templateUrl: './chat-template.component.html',
  styleUrls: ['./chat-template.component.scss'],
  // animations: [trigger('fade', [
  //   transition(
  //     ':leave', [

  //     style({ transform: 'scale(1)', opacity: '1' }),
  //     animate(300, style({ transform: 'scale(0)', opacity: '0' }))
  //   ]
  //   ),
  //   transition(':enter', [
  //     style({ transform: 'scale(0)', opacity: '0' }),
  //     animate(300)
  //   ]),
  // ])],
})
export class ChatTemplateComponent implements OnInit, AfterViewInit, OnDestroy {

  constructor(
    private methodHttp: MethodsHttpService,
    private chatService: ChatService,
  ) { }

  @Input() isOpen = false;
  @Output() newMessageEmit = new EventEmitter<boolean>();
  bots: Chat[] = [];
  chats: Map<number | string, Chat> = new Map<number | string, Chat>();
  hideUsers: boolean = true;
  page: number = 1;
  myUser: any = null;
  socketName = 'chats';
  tabActive: 'chats' | 'users' = 'chats';

  now: string;
  destroy$ = new Subject();

  @ViewChild(CreateHostDirective) chatHost: CreateHostDirective;
  formSearch = new FormControl(null);

  ngOnInit(): void {
    this.myUser = User.getUser();
    this.convertNow();
    this.init();
    this.chatListen();
    this.getBots();
  }

  ngAfterViewInit(): void {
    this.chatService.setHostChat(this.chatHost);
  }

  convertNow(): void {
    const a = moment(new Date());
    a.set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
    console.log(a.toISOString());
    this.now = a.toISOString();
  }

  toggleChatAndUser(): void {
    this.tabActive = this.tabActive === 'chats' ? 'users' : 'chats';
  }

  chatListen(): void {
    this.chatService.chat$.pipe(takeUntil(this.destroy$)).subscribe(({ event, chat }) => {
      if (event === 'created') {
        this.chats.set(chat.id, chat);
        return;
      }
      if (event === 'updated' && this.chats.has(chat.id)) {
        const chatOld = this.chats.get(chat.id)!;
        chatOld.lastMessage = chat.lastMessage;
        chatOld.unreadMessages = chat.unreadMessages;
        // chatOld.
        return;
      }
      if (event === 'deleted') {
        this.chats.delete(chat.id);
      }
    });
  }

  connectedChat(): void {
    this.chatService.initSocketChat(this.socketName);
  }

  trackByChat(_index: number, item: Chat): string | number {
    return item.id;
  }

  init(): void {
    this.methodHttp.methodGet(`chats/user-chats`).subscribe((res) => {
      const chatsEvent = res.data.data as ChatEvent[];
      chatsEvent.map((x) => {
        const chat = this.chatService.convertChatEventToChat(x);
        this.chats.set(x._id, chat);
      });
      this.connectedChat();
    });
  }

  trackByChatsBubble(_index: number, item: Chat): string | number {
    return item.id;
  }

  ngOnDestroy(): void {
    this.chatService.deleteChatSocket(this.socketName);
  }

  markDoDeliveryAll(): void {
    this.methodHttp.methodPut('chats/mark-delivered', {}).subscribe(() => { });
  }

  markDoDelivery(id: number | string): void {
    SharedService.disabled_loader = true;
    this.methodHttp.methodPut(`chats/${id}/mark-delivered`, {}).subscribe(() => { });
  }

  getBots(): void {
    this.methodHttp.methodGet('chats/bots').subscribe(
      (response: any) => {
        if (response.data.data.length < 1) {
          return;
        }
        const bots = response.data.data.map((x) => {
          return {
            id: x._id,
            img: x.info.photo,
            name: x.info.name,
            unreadMessages: 0,
            index: 0,
            typing: false,
            type: 'personal',
            connected: true,
          }
        });
        this.bots = bots
      }
    );
  }


  openChatUser(user_id): void {
    this.methodHttp
      .methodPost<{ chats: ChatEvent }>(`chats/user`, { participants: [user_id] })
      .subscribe((data) => {
        const chat = this.chatService.convertChatEventToChat(data.data.chats);
        this.chatService.openChat(chat);
      });
  }

  openChatOfChat(chatId): void {
    this.chatService.openChat(this.chats.get(chatId)!);
  }

  openChatBot(bot_id): void {
    this.openChatUser(bot_id);
  }

  markReadMessage(chat_id): void {
    SharedService.disabled_loader = true;
    this.methodHttp
      .methodPut(`chats/${chat_id}/mark-read`, {})
      .subscribe(() => {
        this.chats.get(chat_id)!.unreadMessages = 0;
      });
  }

}
