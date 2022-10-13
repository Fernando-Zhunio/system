
export interface DataNotification {
    body: string;
    icon: string;
    image: string;
    route: string;
    text: string;
    title: string;
    type: string;
    url: string;
    user: UserNotification;
}

export interface Notification {
    data: DataNotification;
    id?: string;
    type?: string;
    read_at?: string;
    created_at?: string;
}

export interface UserNotification {
    admin: number;
    created_at: string;
    deleted_at: string;
    email: string;
    id: number;
    info: number;
    last_activity: string;
    name: string;
    updated_at: string;
    person?: PersonNotification;
}

export interface PersonNotification {
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
    photo: PhotoNotification;
    position: PositionNotification;
    sex: string;
    start_date: string;
    status: string;
    updated_at: string;
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

interface PhotoNotification {
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
  
  interface PositionNotification {
    created_at: string;
    deleted_at: string;
    department: DepartmentNotification;
    department_id: number;
    employe_type: string;
    hierarchy_type: string;
    id: number;
    name: string;
    updated_at: string;
  }
  
  interface DepartmentNotification {
    boss_person_id: string;
    company_id: number;
    created_at: string;
    deleted_at: string;
    id: number;
    name: string;
    parent_department_id: number;
    updated_at: string;
  }