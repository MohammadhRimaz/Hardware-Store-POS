export interface CreateProductInput {
  name: string;
  brand?: string;
  category_id: number;
  size?: string;
  height?: string;
  color?: string;
  cost_price: number;
  sale_price: number;
  stock_quantity: number;
  reorder_level: number;
  image?: string;
}
