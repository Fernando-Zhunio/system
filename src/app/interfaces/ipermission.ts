export interface IPermission {
    created_at: string;
    description: string;
    group_permission?: null;
    group_permission_id?: null;
    guard_name: string;
    id: number;
    name: string;
    title: string;
    updated_at: string;
}

export interface IGroupPermission {
    id: number;
    name: string;
    slug: string;
    created_at: string;
    updated_at: string;
}

