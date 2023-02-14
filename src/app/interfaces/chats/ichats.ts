// import { Person } from '../../shared/interfaces/person';
import { Iperson } from './../iperson';


export interface Chat {
  id: number | string;
  data: ChatEvent;
  name: string;
  person?: Iperson | null;
  connected?: number;
  // messages: ImessageChat[];
  index: number;
  img: string;
  last_message?: ImessageChat;
  typing: boolean;
}


// export interface UserChatSearch {
//   connected: boolean;
//   id: number;
//   name: string;
//   person: Person
// }

export interface ChatMessage {
  _id: string;
  author_user_id: number;
  author: ChatAutor;
  channel_id?: string;
  created_at: string;
  delivered_to?: [];
  files: ChatFile[];
  info?: Iinfo;
  read_for?: ChatRead[];
  // readed: string | boolean;
  is_readed_for_all: boolean;
  is_delivered_for_all: boolean;
  text: string;
  type: 'message' | 'info';
  updated_at?: string;
  links: Ilink[];
}

export interface ChatEvent {
  channel_id: string;
  created_at: string;
  img?: string;
  last_message?: ChatMessage;
  last_message_id: string;
  name: string;
  participants: IparticipantChat[];
  privacity: 'private' | 'public';
  status: 'active' | 'offline' | 'online';
  type: 'personal' | 'group';
  unread_messages_count: number;
  updated_at: string;
  user_id: string;
  _id: string;
  admins: string[];
  owner_is_admin: boolean;
  user: IparticipantChat;
}

export interface IparticipantChat {
  _id: string;
  id: number | string;
  status: 'offline' | 'online';
  info: Iinfo;
  last_seen: string;
  type?: string;
  // user?: IuserChat;
}

interface Iinfo { id: number | string; name: string; photo?: string; position: { id: number; name: string; department_id: number }; }


export interface IchatBot {
  id: string;
  info: {
    name: string;
    photo: string;
  };

  status: string;
  type: string;
  _id: string;
}
export interface IuserChat {
  id: number | string;
  last_activity?: string;
  name: string;
  person?: Iperson;
  connected?: number;
  data_chat: ChatEvent;
  messages?: ImessageChat[];
  index?: number;
}

export interface ImessageChat {
  _id?: string;
  author_user_id: number;
  author: ChatAutor;
  channel_id?: string;
  created_at: string;
  delivered_to?: [];
  files: ChatFile[];
  info?: Iinfo;
  read_for?: ChatRead[];
  // readed: string | boolean;
  is_readed_for_all: boolean;
  is_delivered_for_all: boolean;
  text: string;
  type: 'message' | 'info';
  updated_at?: string;
  links: Ilink[];
}

interface Ilink {
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

interface ChatAutor {
  id: number;
  info: Iinfo;
  status: 'online' | 'offline';
  type: 'user';
  _id: number;
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

export interface ChatChannel {
  chats: ChatEvent[];
  name: null;
  privacity: 'private' | 'private';
  type: 'personal' | 'group';
  updated_at: string;
  user_ids: string[];
  _id: string;
}

export interface ChatRead {
  user: {
    _id: string;
    id: number;
    status: 'offline' | 'online';
  };
  read_at: string;
}

export interface ChatList {
  chat_id: string;
  channel_id: string;
  last_message: ImessageChat;
  type: 'personal' | 'group';
  participants: IparticipantChat[];
}
