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

export async function createProduct(input: CreateProductInput) {
  const data = {
    ...input,
    name: input.name.trim(),
    brand: input.brand?.trim() || null,
    size: input.size?.trim() || null,
    height: input.height?.trim() || null,
    color: input.color?.trim() || null,
    image: input.image?.trim() || null,
  };

  // 1. Validate required fields
  if (!data.name) {
    throw new Error("Product name is required.");
  }

  if (!Number.isFinite(data.sale_price) || data.sale_price <= 0) {
    throw new Error("Sale price must be greater than zero");
  }

  if (!Number.isFinite(data.cost_price) || data.cost_price < 0) {
    throw new Error("Cost price cannot be negative");
  }

  if (!Number.isInteger(data.stock_quantity) || data.stock_quantity < 0) {
    throw new Error("Stock quantity must be a non-negative integer");
  }

  if (!Number.isInteger(data.reorder_level) || data.reorder_level < 0) {
    throw new Error("Reorder level must be a non-negative integer");
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
