import { SocketsManagerService } from '../../../services/sockets-manager.service';
// import { Subject } from 'rxjs';
import { Injectable, Injector, Provider, Renderer2, RendererFactory2 } from '@angular/core';
import { EchoOptions } from '../../../../class/echo-manager';
import { environment } from '../../../../../environments/environment';
// import { ChatMessage } from '../../../../interfaces/chats/ichats';
import { ChatMethodsEvents } from '../tools/chat-methods-event';
import { User } from '../../../../class/fast-data';
// import { ChatMessageService } from '../types/chat-tools';
import { Chat } from '../types/chat';
// import { TemplatePortal } from '@angular/cdk/portal';
import { DynamicGeneratorComponent } from '../../../class/dynamic-generator-components';
import { CreateHostDirective } from '../../../directives/create-host.directive';
import { ChatComponent } from '../components/chat/chat.component';
import { ChatRef } from '../class/chat-ref';
import { ChatMessageService, ChatOpen } from '../types/chat-tools';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChatService extends ChatMethodsEvents {

  dynamicComponent = new DynamicGeneratorComponent();
  renderer2: Renderer2;
  constructor(
    private socketManager: SocketsManagerService,
    private rendererFactory2: RendererFactory2,
    ) {
      super();
      this.renderer2 = this.rendererFactory2.createRenderer(null, null);
  }

  readonly Z_INDEX = 1000;
  zIndexCurrent = this.Z_INDEX;

  CHANNELS_CHAT = {
    chat: `chat.${User.getUser().id}`,
    chatUsers: 'chat_users'
  }

  setHostChat(host: CreateHostDirective) {
    this.dynamicComponent.setCreateHostDirective(host);
  }

  getChatOpen(id: string): ChatOpen | null {
    if (!this.chatsOpens.has(id)) {
      return null
    }
    return this.chatsOpens.get(id) as ChatOpen;
  }

  hasChatActive(id: string) {
    return this.chatsOpens.has(id);
  }

  openChat(chat: Chat) {
    if (this.hasChatActive(chat.id)) {
      this.upperChat(chat.id);
      return
    }
    const idChat = chat.id;
    const injector = this.generateInjector(idChat, chat);
    const componentRef = this.dynamicComponent.createComponent(ChatComponent, injector);
    this.zIndexCurrent += 1;
    this.renderer2.setProperty(componentRef.location.nativeElement, 'style', `z-index: ${this.zIndexCurrent}`);

    chat.index = this.zIndexCurrent;
    const chatOpen: ChatOpen = {
      chat,
      componentRef,
      messagesOrTyping$: new Subject<ChatMessageService | 'typing'>()
    }
    this.chatsOpens.set(idChat, chatOpen);
  }

  upperChat(id: string) {
    const componentRef = this.getChatOpen(id)?.componentRef;
    if (componentRef) {
      this.zIndexCurrent += 1;
      this.renderer2.setProperty(componentRef.location.nativeElement, 'style', `z-index: ${this.zIndexCurrent}`);

    }
  }


  closeChat(id: string) {
    const chatOpen = this.chatsOpens.get(id);
    if (!chatOpen) {
      return
    }
    chatOpen.componentRef.destroy();
    this.chatsOpens.delete(id);
    if (this.chatsOpens.size === 0) {
      this.zIndexCurrent = this.Z_INDEX;
    }
  }

  generateInjector(id: string, chat: Chat): Injector {
    const chatRef = new ChatRef(id, chat, this.closeChat.bind(this));
    const providers: Provider = [
      {
        provide: ChatRef,
        useValue: chatRef
      }
    ]
    return Injector.create({ providers });
  }


  deleteChatSocket(id: string) {
    this.socketManager.deleteSocket(id, [this.CHANNELS_CHAT.chat, this.CHANNELS_CHAT.chatUsers]);
    this.chatsOpens.clear();
  }

  initSocketChat(id: string) {
    const optionEcho: EchoOptions = {
      wsHost: environment.domain_serve_chat,
      wsPort: environment.portSocket_chat,
      wssPort: environment.portSocket_chat,
    }

    const socket = this.socketManager.generate(id, optionEcho);
    const channelChat = socket.private(this.CHANNELS_CHAT.chat)
    channelChat.listen(`.chat`, this.chatsListen.bind(this))
    channelChat.listen('.typing', this.typingListen.bind(this))
    channelChat.listen('.message', this.messagesListen.bind(this))
    channelChat.listen('.message_delivered', this.messageDeliveredListen.bind(this))
    channelChat.listen('.message_readed', this.messageReadListen.bind(this))
    // channelChat.listen('.message_deleted', this.mess.bind(this))
    // const channelChatUsers = socket.private(this.CHANNELS_CHAT.chatUsers)

    // this.templatePortal = new TemplatePortal(templateRef, viewContainerRef);

    // .listen(`.chat`, this.chatListen.bind(this))
    // .listen('.message', this.getMessages.bind(this))
    // .listen('.typing', this.typingUserListen.bind(this))
    // .listen('.message_delivered', this.messageDeliveredListen.bind(this))
    // .listen('.message_readed', this.getMessageReaded.bind(this))
    // .listen('.message_deleted', this.deleteMessage.bind(this));

    // socket.private(CHANNELS_CHAT.chatUsers)
    //   .listen('.user', this.getChatUserStatus.bind(this));

    // socket.connector.pusher.connection.bind('connecting', () => {
    //   this.is_status_connect_chat = false;
    // });

    // // socket.connector.pusher.connection.bind('state_change', () => {});

    // socket.connector.pusher.connection.bind('connected', () => {
    //   this.is_status_connect_chat = true;
    //   if (!this.first_connect) {
    //     this.first_connect = true;
    //   }
    // });
  }
}
