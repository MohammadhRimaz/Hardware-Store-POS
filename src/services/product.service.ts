import db from "../database/knex";

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

export async function createProduct(data: CreateProductInput) {
  return db("products").insert(data);
}

export async function getAllProducts() {
  return db("products")
    .join("categories", "products.category_id", "categories.id")
    .select("products.*", "categories.name as category_name");
}

export async function updateProductStock(
  productId: number,
  quantityChange: number
) {
  return db("products")
    .where({ id: productId })
    .increment("stock_quantity", quantityChange);
}
