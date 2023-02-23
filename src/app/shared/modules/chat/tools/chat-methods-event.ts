// import { ChatMessage } from '../../../../interfaces/chats/ichats';
import { Subject } from 'rxjs';
import type { Chat } from '../types/chat';
import type { ChatEvent } from '../types/chat-event';
import { ChatMessage } from '../types/chat-message';
import { ChatDeliveryMessage, ChatMessageService, ChatOpen, ChatReadMessage } from '../types/chat-tools';

export class ChatMethodsEvents {
    chat$ = new Subject<{ event: 'created' | 'updated' | 'deleted', chat: Chat }>();
    chatMessages$ = new Subject<ChatMessageService>();
    index = 0;
    public chatsOpens = new Map<string, ChatOpen>();


    chatsListen({ chat: chatEvent, event }: { chat: ChatEvent; event: 'created' | 'updated' | 'deleted' }): void {
        const chat = this.convertChatEventToChat(chatEvent);
        console.log('chat', {chat, event});
        this.chat$.next({ event, chat });
    }

    protected messagesListen({ chat, message }: { chat: ChatEvent, message: ChatMessage }): void {
        if (this.chatsOpens.has(chat._id)) {
            const chatOpen$ = this.chatsOpens.get(chat._id)?.messagesOrTyping$!;
            chatOpen$.next({message, event: 'new'});
        }
        this.chatMessages$.next({message, event: 'new'});
    }

    protected messageDeliveredListen(event: ChatDeliveryMessage): void {
        if(this.chatsOpens.has(event.chat_id)) {
            this.chatsOpens.get(event.chat_id)?.messagesOrTyping$!.
            next({ id: event.message_id, event: 'delivery', all: event.is_delivered_for_all });
        }
        this.chatMessages$.next({ id: event.message_id, event: 'delivery', all: event.is_delivered_for_all });
    }

    protected messageReadListen(event: ChatReadMessage): void {
        if(this.chatsOpens.has(event.chat_id)) {
            this.chatsOpens.get(event.chat_id)?.messagesOrTyping$!.
            next({ id: event.message_id, event: 'read', all: event.is_readed_for_all });
        }
        this.chatMessages$.next({ id: event.message_id, event: 'read', all: event.is_readed_for_all });
    }

    protected typingListen({ chat }: { chat: ChatEvent }): void {

        if (this.chatsOpens.has(chat._id)) {
            this.chatsOpens.get(chat._id)?.messagesOrTyping$?.next('typing');
        }
        // this.chat$.next({ event: 'updated', chat: { ...this.convertChatEventToChat(chat), typing } });
    }

    convertChatEventToChat(chatEvent: ChatEvent): Chat {
        const { _id: id, name, type, img, last_message: lastMessage, participants, unread_messages_count } = chatEvent;
        const chatAux = {
            id,
            name: name || participants[0]?.info.name,
            img: type == 'group' ? img || 'assets/img/user_group.png' : participants[0].info.photo || 'https://ui-avatars.com/api/?background=random&name=' + name,
            index: this.index,
            typing: false,
            lastMessage,
            participants,
            unreadMessages: unread_messages_count || 0,
            connected: Boolean(participants[0]?.status === 'online'),
        }
        const chat: Chat = type === 'group' ? 
        { ...chatAux, type, info: { isAdmin: chatEvent.owner_is_admin } } : {...chatAux, type};
        return chat;
    }
}