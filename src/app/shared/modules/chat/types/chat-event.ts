import { ChatMessage } from "./chat-message";
import { ChatInfo } from "./chat-tools";

export interface ChatEvent {
    channel_id: string;
    created_at: string;
    img?: string;
    last_message?: ChatMessage;
    last_message_id: string;
    name: string;
    participants: ChatParticipant[];
    privacity: 'private' | 'public';
    status: 'active' | 'offline' | 'online';
    type: 'personal' | 'group';
    unread_messages_count: number;
    updated_at: string;
    user_id: string;
    _id: string;
    admins: string[];
    owner_is_admin: boolean;
    user: ChatParticipant;
  }

  export interface ChatParticipant {
    _id: string;
    id: number | string;
    status: 'offline' | 'online';
    info: ChatInfo;
    last_seen: string;
    type?: string;
    connected: number;
  }