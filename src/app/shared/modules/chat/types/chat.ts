import { type ChatParticipant } from './chat-event';
import { type ChatMessage } from './chat-message';

export type Chat = {
    id: string;
    name: string;
    connected?: boolean;
    unreadMessages: number;
    index: number;
    img: string;
    lastMessage?: ChatMessage;
    typing: boolean;
    participants?: ChatParticipant[];
  } & ({type:'group', info: {
    isAdmin: boolean;
  }} | {type:'personal'})