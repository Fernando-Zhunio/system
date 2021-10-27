import { Iperson } from './../iperson';

export interface Ichats {
  channel_id: string;
  created_at: string;
  last_message?: ImessageChat;
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
  user: {
    id: number;
    info: { id: number; name: string; photo?: string };
    status: 'online' | 'offline';
    _id: string;
  };
  img?: string;
}

export interface IparticipantChat {
  _id: string;
  id: number;
  status: 'offline' | 'online';
  info: {
    id: 116;
    name: string;
    photo: string;
    position: { id: number; name: string; department_id: number };
  };
  // user?: IuserChat;
}

export interface IuserChat {
  // admin: number;
  // api_token?: string;
  // created_at: string;
  // deleted_at: string;
  // email: string;
  id: number | string;
  last_activity?: string;
  name: string;
  person?: Iperson;
  connected?: number;
  // updated_at: string;
  data_chat: Ichats;
  messages?: ImessageChat[];
}

export interface ImessageChat {
  _id?: string;
  author_user_id: number;
  channel_id?: string;
  created_at: string | Date;
  delivered_to?: [];
  files: IfileChat[];
  info?: any;
  read_for?: IreadForChat[];
  readed: string | boolean;
  text: string;
  type: 'message' | 'info';
  updated_at?: string;
}

export interface IfileChat {
  attributes: {width: number, height: number}
created_at: string;
ext: string;
file: string;
id: number;
mime_type: string;
permalink: string;
type: string;
updated_at: string;
}

export interface Ichannel {
  chats: Ichats[];
  name: null;
  privacity: 'private' | 'private';
  type: 'personal' | 'group';
  updated_at: string;
  user_ids: string[];
  _id: string;
}

export interface IreadForChat {
  user: {
    _id: string;
    id: number;
    status: 'offline' | 'online';
  };
  read_at: string;
}

export interface IchatList {
  chat_id: string;
  channel_id: string;
  last_message: ImessageChat;
  type: 'personal' | 'group';
  participants: IparticipantChat[];
}
