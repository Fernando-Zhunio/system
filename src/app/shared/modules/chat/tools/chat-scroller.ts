import { ChatMessage } from './../types/chat-message';
import { Observable } from 'rxjs';
import { ResponsePaginateApi } from '../../../interfaces/response-api';
import { type Chat } from '../types/chat';
export abstract class ChatScroller {

    abstract getMessagesObservable(params): Observable<ResponsePaginateApi<ChatMessage>>;
    abstract myId: number;
    abstract chat: Chat;
    abstract messages: ChatMessage[];
    page = 1;
    hasNewMessages = false;
    elementMessages: HTMLElement | null = null;
    notMoreOldMessages = false;
    readonly MESSAGES_PER_PAGE = 50;

    getPreviousMessages(): void {
        this.page++;
        this.getMessagesObservable({page: this.page}).subscribe({
            next: (response) => {
                if (response.data.data.length < 1) return;
                const elementContentScroll = this.getElementContainerMessages();
                elementContentScroll.scrollTop+=10;
                if (response.data.data.length < this.MESSAGES_PER_PAGE) {
                    this.notMoreOldMessages = true;
                }
                this.messages.unshift(...response.data.data?.reverse());
            }
        });
    }

    goBackScroll(): void {
        const elementChat = this.getElementContainerMessages();
        if (!elementChat) return;
        this.hasNewMessages = false;
        setTimeout(() => {
            elementChat.scrollTop = elementChat.scrollHeight;
        }, 0);
    }

    getElementContainerMessages(): HTMLElement {
        return this.elementMessages ||= document.getElementById(this.chat.id)!;
    }
}