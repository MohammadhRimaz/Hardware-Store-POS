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
  // 1. Validate required fields
  if (!data.name.trim()) {
    throw new Error("Product name is required.");
  }

  if (data.sale_price < 0 || data.cost_price < 0) {
    throw new Error("Price cannot be negative.");
  }

  if (data.stock_quantity < 0) {
    throw new Error("Stock quantity cannot be negative.");
  }

  // 2. Ensure category exists
  const category = await db("categories")
    .where({ id: data.category_id })
    .first();

  if (!category) {
    throw new Error("Selected category does not exist");
  }

  // 3. Insert product into database
  return await db("products").insert(data);
}

export async function getAllProducts() {
  return db("products")
    .join("categories", "products.category_id", "categories.id")
    .select("products.*", "categories.name as category_name");
}

export async function updateProductStock(
  productId: number,
  quantityChange: number,
) {
  return db("products")
    .where({ id: productId })
    .increment("stock_quantity", quantityChange);
}
