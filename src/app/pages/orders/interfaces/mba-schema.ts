export interface MbaSchema<T>  {
  id: number;
  code: string;
  number: string;
  status: string;
  memo: string | null;
  data: T | null;
  created_at: string;
  updated_at: string;
}
