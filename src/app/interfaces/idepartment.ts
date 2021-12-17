export interface IDepartment {
    id: number;
    name: string;
    company_id: number;
    parent_department_id: number;
    boss_person_id?: null;
    created_at: string;
    updated_at: string;
    deleted_at?: string;
    parent: Parent;
  }
  export interface Parent {
    id: number;
    name: string;
    company_id: number;
    parent_department_id?: any;
    boss_person_id?: any;
    created_at: string;
    updated_at: string;
    deleted_at?: any;
  }
  
