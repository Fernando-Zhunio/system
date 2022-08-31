import { Person } from "./person";

export interface User {
  id: number;
  name: string;
  email: string;
  // permission?: any;
  // companies?: any;
  // company_company_id?: string;
  person: Person;
}
