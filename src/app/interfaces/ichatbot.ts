export interface IChatbot {
    _id: string;
    status: 'online' | 'offline';
    id: number;
    type: 'bot' | 'user';
    info: Info;
    api_token: string;
  }
  export interface Info {
    name: string;
    photo: string;
  }

  export interface IChatWebhook {
    _id: string;
    endpoint: string;
    user_id: string;
    updated_at: string;
    created_at: string;
  }
