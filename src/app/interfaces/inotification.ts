import { Cperson } from '../class/cperson';

export interface InotificationData {
  // created_at: string;
  // data: {
  // icon: string;
  // text: string;
  // type: string;
  // url: string;
  // image?:string;
  body: string;
  icon: string;
  image: string;
  route: string;
  text: string;
  title: string;
  type: string;
  url: string;
  user: Iuser;
  // };
  // read_at: string;
}

export interface INotification {
   data: InotificationData; id: string; type: string;
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
