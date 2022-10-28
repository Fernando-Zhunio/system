

export interface Roles {
    id: number;
    name: string;
    guard_name: string;
    title: string;
    description?: null;
    created_at: string;
    updated_at: string;
    pivot: Pivot;
  }
  export interface Pivot {
    model_id: number;
    role_id: number;
    model_type: string;
  }
