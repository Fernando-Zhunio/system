import { ChatMessage } from './../../../../interfaces/chats/ichats';
// import { ChatEvent } from "../../../../interfaces/chats/ichats";
// import { Person } from '../../../interfaces/person';

export interface Chat {
    id: number | string;
    // data: ChatEvent;
    name: string;
    // person?: Person | null;
    connected?: boolean;
    unreadMessages: number;
    index: number;
    img: string;
    lastMessage?: ChatMessage;
    typing: boolean;
  }