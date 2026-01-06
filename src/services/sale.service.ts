import db from "../database/knex";

export interface SaleItemInput {
  product_id: number;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface CreateSaleInput {
  customer_id?: number;
  subtotal: number;
  discount: number;
  total_amount: number;
  payment_method: "CASH" | "CHEQUE" | "CREDIT";
  items: SaleItemInput[];
}

export async function createSale(data: CreateSaleInput) {
  return db.transaction(async (trx) => {
    const [saleId] = await trx("sales").insert({
      customer_id: data.customer_id ?? null,
      subtotal: data.subtotal,
      discount: data.discount,
      total_amount: data.total_amount,
      payment_method: data.payment_method,
    });

    for (const item of data.items) {
      await trx("sale_items").insert({
        sale_id: saleId,
        ...item,
      });

      await trx("products")
        .where({ id: item.product_id })
        .decrement("stock_quantity", item.quantity);
    }

    if (data.payment_method === "CREDIT" && data.customer_id) {
      await trx("customers")
        .where({ id: data.customer_id })
        .increment("current_debt", data.total_amount);
    }

    return saleId;
  });
}
