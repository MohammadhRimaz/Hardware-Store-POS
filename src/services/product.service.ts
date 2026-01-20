import db from "../database/knex";
import { CreateProductInput } from "../types/product";

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

  if (!Number.isInteger(data.category_id)) {
    throw new Error("Valid category is required");
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

  const cost = Number(data.cost_price);
  const sale = Number(data.sale_price);
  const stock = Number(data.stock_quantity);
  const reorder = Number(data.reorder_level);

  // 3. Insert product into database
  await db("products").insert({
    ...data,
    cost_price: cost,
    sale_price: sale,
    stock_quantity: stock,
    reorder_level: reorder,
  });
}

export async function getAllProducts() {
  return db("products")
    .join("categories", "products.category_id", "categories.id")
    .select("products.*", "categories.name as category_name");
}

// export async function updateProductStock(
//   productId: number,
//   quantityChange: number,
// ) {
//   return db("products")
//     .where({ id: productId })
//     .increment("stock_quantity", quantityChange);
// }

export async function reduceStock(
  productId: number,
  quantity: number,
  trx = db,
) {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new Error("Quantity to reduce must be a positive integer");
  }

  const product = await trx("products").where({ id: productId }).first();

  if (!product) {
    throw new Error("Product not found");
  }

  if (product.stock_quantity < quantity) {
    throw new Error(`Insufficient stock. Available: ${product.stock_quantity}`);
  }

  await trx("products")
    .where({ id: productId })
    .update({ stock_quantity: product.stock_quantity - quantity });
}

export async function increaseStock(
  productId: number,
  quantity: number,
  trx = db,
) {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new Error("Quantity to increase must be a positive integer");
  }

  const product = await trx("products").where({ id: productId }).first();

  if (!product) {
    throw new Error("Product not found");
  }

  await trx("products")
    .where({ id: productId })
    .update({ stock_quantity: product.quantity + quantity });
}
