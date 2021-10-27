import { Cperson } from '../class/cperson';

export interface IuserSystem {
  id: number,
  name: string,
  email: string,
  api_token: string,
  admin: string,
  last_activity: string,
  created_at: string,
  updated_at: string,
  deleted_at: string,
  info: {
      id: number,
      user_id: number,
      city_id: number,
      department_position_id: number,
      location_id: number,
      sex: string,
      created_at: string,
      updated_at: string,
      deleted_at: string,
  },
  companies?: Icompany[]
  roles?: Irole[]
  person?:Cperson
}

interface Irole{
    id: number,
    name: string,
    guard_name: string,
    title: string,
    description: string,
    created_at: string,
    updated_at: string,
    pivot: {
        model_id: number,
        role_id: number,
        model_type: string,
    }
}

interface Icompany{
  id: number,
  name: string
  country_id: number,
  created_at: string
  updated_at: string
  deleted_at: string
  pivot: {
      accessible_id: number,
      company_id: number,
      accessible_type: string
  }
}
