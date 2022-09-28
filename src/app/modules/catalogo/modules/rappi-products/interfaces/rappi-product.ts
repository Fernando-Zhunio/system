export interface RappiProduct {
  id: number,
  sku: string,
  name: string,
  description: null,
  ean: string,
  trademark: string,
  price: number,
  discount_price: string | null,
  is_available: number,
  stock: number,
  created_at: string,
  updated_at: string
}
