import { Person } from "../../../interfaces/person";

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