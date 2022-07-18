
export interface IStore {
  [key: string]: IItemStore[];
}

export interface IItemStore {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  schedule: string;
}
