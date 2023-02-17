import { Chat } from "../types/chat";

export class ChatRef {
    id: string
    chat: Chat;
    private closeCb: (id: string) => void;
    constructor(id: string, chat: Chat, closeCb: (id: string) => void) {
        this.id = id;
        this.closeCb = closeCb;
        this.chat = chat;
    }
    getChat(): Chat {
        return this.chat;
    }
    close(): void {
        this.closeCb(this.id);
    }
}