export interface Inotification {
    icon: string;
    text: string;
    type: string;
    url: string;
    user:Iuser;
    image:string;
}

export interface Iuser {
  admin: number;
  created_at: string;
  deleted_at: string;
  email: string;
  id: number;
  info: number;
  last_activity: string;
  name: string;
  updated_at: string;
}
