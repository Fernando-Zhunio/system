export interface Permission {
    id: number;
    name: string;
    guard_name: string;
    title: string;
    description: string;
    group_permission_id: number;
    created_at: string;
    updated_at: string;
    group_permission: GroupPermission;
  }
  
  export interface GroupPermission {
    id: number;
    name: string;
    slug: string;
    position: number;
    created_at: string;
    updated_at: string;
  }