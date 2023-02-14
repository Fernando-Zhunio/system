import { ChatMessage } from '../../../../interfaces/chats/ichats';
import { Subject } from 'rxjs';
import type { Chat } from '../types/chat';
import type { ChatEvent } from '../types/chat-event';
export class ChatEvents {
    chat = new Subject<{ event: 'created' | 'updated' | 'deleted', chat: Chat }>();
    messages = new Map<any,  Subject<{ message: ChatMessage, event: 'new'| 'delivery' | 'read' }>>();
    index = 0;
    chatsActive = new Map<string | number, Subject<ChatMessage>>();

    protected messagesListen({ chat, message }: { chat: ChatEvent, message: ChatMessage }): void {
        const chatSubject = this.chatsActive.get(chat.id);
        if (chatSubject) {
            chatSubject.next(message);
        }
        // this.message.next({ chat: this.convertChatEventToChat(chat), message });
    }

    protected typingListen({ chat, typing }: { chat: ChatEvent, typing: boolean }): void {
        this.chat.next({ event: 'updated', chat: { ...this.convertChatEventToChat(chat), typing } });
    }


    // convertChatEventToChat(chatEvent: ChatEvent): Chat {
    //     const { _id: id, name, type, img, last_message, participants } = chatEvent;
    //     return {
    //         id,
    //         name: name || participants[0]?.info.name,
    //         img: type == 'group' ? img || 'assets/img/user_group.png' : participants[0].info.photo || 'https://ui-avatars.com/api/?background=random&name=' + name,
    //         index: this.index,
    //         typing: false,
    //         last_message,
    //         connected: participants[0]?.connected,
    //     } as Chat
    // }
}