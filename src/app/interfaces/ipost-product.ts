export interface IpostProduct {
  available: number;
  brand_id: number;
  category_id: number;
  code: string;
  code_alt: string;
  created_at: string;
  deleted_at: null;
  description: string;
  facebook_posts: IfacebookPost[];
  id: number;
  instagram_posts: IinstagramPost[];
  last_prices: [];
  name: string;
  old_code: null;
  prefix_id: number; 
  sequence_id: number;
  updated_at: string;
  user_id: number;
}

export interface IfacebookPost {
  attachments: Iattachments[];
  comments_count: number;
  created_at: string;
  created_time: string;
  facebook_page_id: number;
  fb_id: string;
  full_picture: string;
  icon: string;
  id: number;
  is_expired: number;
  is_popular: number;
  is_published: number;
  message: string;
  permalink_url: string;
  pivot: { product_id: number; facebook_page_post_id: number };
  reactions_count: number;
  shares_count: number;
  timeline_visibility: string;
  updated_at: string;
  updated_time: string;
}

interface Iattachments {
  subattachments:{data:any};
  description: string;
  media_type?:string;
  media?: { image: { height: number; src: string; width: number }, source?:string};
  target: { id: string; url: string };
  type: string;
  url: string;
}

export interface IinstagramPost {
  caption: string;
  children: any[];
  comments_count: number;
  created_at: string;
  created_time: string;
  id: number;
  ig_id: string;
  instagram_account_id: number;
  like_count: number;
  media_type: string;
  media_url: string;
  permalink: string;
  pivot: { product_id: number; instagram_post_id: number };
  shortcode: string;
  updated_at: string;
}
