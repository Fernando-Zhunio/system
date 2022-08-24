import { Cperson } from '../class/cperson';

export interface INotificationData {
  body: string;
  icon: string;
  image: string;
  route: string;
  text: string;
  title: string;
  type: string;
  url: string;
  user: Iuser;
}

export interface INotification {
  data: INotificationData;
  id?: string;
  type?: string;
  read_at?: string;
  created_at?: string;
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
  person?: Cperson;
}
