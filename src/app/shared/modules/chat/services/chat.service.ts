import { SocketsManagerService } from '../../../services/sockets-manager.service';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { EchoOptions } from '../../../../class/echo-manager';
import { environment } from '../../../../../environments/environment';
import { CHANNELS_CHAT } from '../tools/chats-tools';
import { ChatMessage } from '../../../../interfaces/chats/ichats';



@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socketManager: SocketsManagerService) { }

  chatsActive = new Map<string, Subject<ChatMessage>>();

  getChatActive(id: string): Subject<any> | null {
    if (!this.chatsActive.has(id)) {
      return null
    }
    return this.chatsActive.get(id) as Subject<any>;
  }

  hasChatActive(id: string) {
    return this.chatsActive.has(id);
  }

  setChatActive(id: string, data: any) {
    if (this.hasChatActive(id)) {
      this.getChatActive(id)?.next(data);
    }
    this.chatsActive.set(id, new Subject<any>());
  }

  deleteChatActive(id: string) {
    this.socketManager.deleteSocket(id,[CHANNELS_CHAT.chat,CHANNELS_CHAT.chatUsers]);
    this.chatsActive.clear();
  }

  initSocketChat(id: string) {
    const optionEcho: EchoOptions = {
      wsHost: environment.domain_serve_chat,
      wsPort: environment.portSocket_chat,
      wssPort: environment.portSocket_chat,
    }

    const socket = this.socketManager.generate(id, optionEcho);
    const channelChat = socket.private(CHANNELS_CHAT.chat)
    channelChat.listen('.message', this.getMessages.bind(this))
    channelChat.listen('.message_delivered', this.typingUserListen.bind(this))
    channelChat.listen('.message_readed', this.typingUserListen.bind(this))
    channelChat.listen('.message_deleted', this.typingUserListen.bind(this))
    const channelChatUsers = socket.private(CHANNELS_CHAT.chatUsers)

    return {
      channelChat,
      channelChatUsers,
    }

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
