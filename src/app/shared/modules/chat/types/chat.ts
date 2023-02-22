// import { ChatMessage } from './../../../../interfaces/chats/ichats';
import { ChatParticipant } from './chat-event';
import { ChatMessage } from './chat-message';
// import { ChatEvent } from "../../../../interfaces/chats/ichats";
// import { Person } from '../../../interfaces/person';

export type Chat = {
    id: string;
    name: string;
    connected?: boolean;
    unreadMessages: number;
    index: number;
    img: string;
    lastMessage?: ChatMessage;
    typing: boolean;
    // type: string;
    participants?: ChatParticipant[];
  } & ({type:'group', info: {
    isAdmin: boolean;
  }} | {type:'personal'})