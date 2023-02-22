import { Person } from "../../../shared/interfaces/person";

export interface UserChatGroup {
    id: number;
    name: string;
    email: string;
    api_token?: any;
    admin: number;
    isAdmin?: boolean;
    last_activity: string;
    created_at: string;
    updated_at: string;
    deleted_at?: any;
    person: Person;
}



