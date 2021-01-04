import { User } from "./user";

export class Session {
    token:string;
    user:User;
    expires_at:string;
    token_type:string;
}
