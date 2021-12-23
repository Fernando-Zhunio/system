export interface IChatbot {
    _id: string;
    status: string;
    id: string;
    type: string;
    info: Info;
    api_token: string;
  }
  export interface Info {
    name: string;
    photo: string;
  }