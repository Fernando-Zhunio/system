export interface Person {
  birthday: string;
  city: {
    id: number;
    name: string;
  };
  city_id: number;
  contact_info?: any;
  created_at: string;
  department_position_id: number;
  end_date: string;
  first_name: string;
  id: number;
  identification_number: string;
  identification_type: string;
  last_name: string;
  location: {
    id: number;
    name: string;
  };
  location_id: number;
  photo: Photo;
  position: Position;
  sex: string;
  start_date: string;
  status: string;
  updated_at: string;
  user_id: number;
  user?: {
    id: number;
    name: string;
    email?: string;
  };
}

interface Photo {
  attributes: { width: number; height: number };
  created_at: string;
  ext: string;
  file: string;
  id: number;
  mime_type: string;
  original_name: string;
  permalink: string;
  type: string;
  updated_at: string;
}

interface Position {
  created_at: string;
  deleted_at: string;
  department: Department;
  department_id: number;
  employe_type: string;
  hierarchy_type: string;
  id: number;
  name: string;
  updated_at: string;
}

interface Department {
  boss_person_id: string;
  company_id: number;
  created_at: string;
  deleted_at: string;
  id: number;
  name: string;
  parent_department_id: number;
  updated_at: string;
}
