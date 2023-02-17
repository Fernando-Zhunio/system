import type { Subject } from "rxjs";
import type { Person } from "../../../interfaces/person";
import { Chat } from "./chat";
import type { ChatParticipant } from "./chat-event";
import type { ChatMessage } from "./chat-message";

export interface ChatAutor {
    id: number;
    info: ChatInfo;
    status: 'online' | 'offline';
    type: 'user';
    _id: number;
}

export interface ChatInfo {
    id: number | string;
    name: string;
    photo?: string;
    position: {
        id: number;
        name: string;
        department_id: number
    };
}

export interface ChatLink {
    page:
    {
        description?: string;
        title: string
        type: string
        url: string
        image?: { url }
    };
    site:
    {
        author: string;
        generator: string;
        icon: string;
        language: string;
        name: string;
        responsive: boolean
        secure: boolean
        url: string;
    };
}

export interface ChatFile {
    attributes: { width: number, height: number };
    created_at: string;
    ext: string;
    file: string;
    id: number;
    original_name: string;
    mime_type: string;
    permalink: string;
    type: string;
    updated_at: string;
    isload?: boolean;
    progress?: number;
}

export interface ChatRead {
    user: {
        _id: string;
        id: number;
        status: 'offline' | 'online';
    };
    read_at: string;
}

export interface ChatUserSearch {
    connected: boolean;
    id: number;
    name: string;
    person: Person
}


export interface ChatBot {
    id: string;
    info: {
      name: string;
      photo: string;
    };
  
    status: string;
    type: string;
    _id: string;
  }

export interface ChatDeliveryMessage {
    chat_id: string;
    is_delivered_for_all: boolean;
    message_id: string;
    user: ChatParticipant;
}

export interface ChatReadMessage {
    chat_id: string;
    is_readed_for_all: boolean;
    message_id: string;
    user: ChatParticipant;
}

export type ChatMessageService = 
{ message: ChatMessage, event: 'new' } | { id: string, event: 'delivery' | 'read', all: boolean  };

export type ChatOpen = {
    chat: Chat;
    componentRef: any;
    messagesOrTyping$: Subject<ChatMessageService | 'typing'>;
}