import { Timestamp } from "../../../../shared/interfaces/Timestamp";

export interface Department extends Timestamp {
    id: number;
    name: string;
    company_id: number;
    parent_department_id: number;
    boss_person_id?: any;
    parent: Parent;
  }

  type Parent = Omit<Department, 'parent'>;
  