export class Cperson {
  birthday: string;
  city_id: number;
  created_at: string;
  department_position_id: number;
  end_date: string;
  first_name: string;
  id: number;
  identification_number: string;
  identification_type: string;
  last_name: string;
  location_id: number;
  photo: Iphoto;
  position: Iposition;
  sex: string;
  start_date: string;
  status: string;
  updated_at: string;
  // user: Iuser;
  contact_info?: any;
  user_id: number;
  location: {
    id: number;
    name: string;
  };
  user?: {
    id: number;
    name: string;
    email?: string;
  };
  city: {
    id: number;
    name: string;
  };
}

export const TYPE_CORP_EMAIL = 'corp_email';

interface Iphoto {
  attributes: { width: number; height: number };
  created_at: string;
  ext: string;
  file: string;
  id: number;
  mime_type: string;
  permalink: string;
  type: string;
  updated_at: string;
}

interface Iposition {
  created_at: string;
  deleted_at: string;
  department: Idepartment;
  department_id: number;
  employe_type: string;
  hierarchy_type: string;
  id: number;
  name: string;
  updated_at: string;
}

interface Idepartment {
  boss_person_id: string;
  company_id: number;
  created_at: string;
  deleted_at: string;
  id: number;
  name: string;
  parent_department_id: number;
  updated_at: string;
}

interface Iuser {
  admin: number;
  api_token: string;
  created_at: string;
  deleted_at: string;
  email: string;
  id: number;
  last_activity: string;
  name: string;
  updated_at: string;
}
