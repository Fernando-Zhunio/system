export interface Irequest {
  id: number;
  comment: string;
  work_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  status_last: IstatusLast;
  current_status: IcurrentStatus;
  user: Iuser;
  work?: Iwork;
}

interface IstatusLast {
  id: number;
  name: string;
  type: string;
  type_action: string;
  created_at: string;
  updated_at: string;
  comment: string;
}
interface IcurrentStatus {
  id: number;
  name: string;
  type: string;
  type_action: string;
  created_at: string;
  updated_at: string;
  comment: string;
}

interface Iphoto {
  id: number;
  type: string;
  disk: string;
  file: string;
  mime_type: string;
  attributes: {
    width: number;
    height: number;
  };
  atachmentable_type: string;
  atachmentable_id: number;
  created_at: string;
  updated_at: string;
  file_name: string;
  ext: string;
  permalink: string;
  real_permalink: string;
}

interface Iresume {
  id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  attachment: {
    id: number;
    type: string;
    disk: string;
    file: string;
    mime_type: string;
    attributes: any[];
    atachmentable_type: string;
    atachmentable_id: number;
    created_at: string;
    updated_at: string;
    file_name: string;
    ext: string;
    permalink: string;
    real_permalink: string;
  };
}

interface Iuser {
  id: number;
  email: string;
  email_verified_at: null;
  first_name: string;
  last_name: string;
  identification_type: string;
  identification_number: string;
  birthday: string;
  birth_state_id: number;
  birth_city: string;
  resident_state_id: number;
  resident_city: string;
  information_percentage: number;
  created_at: string;
  updated_at: string;
  requests_count: number;
  profile_completed: true;
  photo: Iphoto;
  resume: Iresume;
}

export interface Iwork {
  id: number;
  title: string;
  description: string;
  tag_id: any;
  skills: string[];
  requiments: string[];
  time: string;
  department_position_id: number;
  city_id: number;
  created_at: string;
  updated_at: string;
  requests_count: number;
  status_last: IstatusLast;
  current_status: IcurrentStatus;
  requests?: Irequest[];
}



// :\s".+",