import type { ChatAutor, ChatFile, ChatInfo, ChatLink, ChatRead } from "./chat-tools";

export interface ChatMessage {
    _id: string;
    author_user_id: number;
    author: ChatAutor;
    channel_id?: string;
    created_at: string;
    delivered_to?: [];
    files: ChatFile[];
    info?: ChatInfo;
    read_for?: ChatRead[];
    is_readed_for_all: boolean;
    is_delivered_for_all: boolean;
    text: string;
    type: 'message' | 'info';
    updated_at?: string;
    links: ChatLink[];
  }

  