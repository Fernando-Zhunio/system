// :\s".+",

export interface Iperson {
  id: number;
  status: string;
  first_name: string;
  last_name: string;
  identification_type: string;
  identification_number: string;
  birthday: string;
  sex: string;
  start_date: string;
  end_date: null;
  city_id: number;
  department_position_id: number;
  location_id: number;
  user_id: null;
  created_at: string;
  updated_at: string;
  position: Iposition;
  photo: Iphoto;
}

interface Iphoto {
  id: number;
  type: string;
  file: string;
  mime_type: string;
  attributes: {
    width: number;
    height: number;
  };
  created_at: string;
  updated_at: string;
  ext: string;
  permalink: string;
  real_permalink?: string;
}

interface Iposition {
  id: number;
  name: string;
  department_id: number;
  employe_type: string;
  hierarchy_type: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}
