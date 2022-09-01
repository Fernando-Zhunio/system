import { IProduct } from "../../../../interfaces/promotion";
import { Campaign } from "./campaign";

export interface Promotion extends Campaign {
  price: {
    price: number;
  },
  price_formatted: string;
  products: IProduct[];
}
