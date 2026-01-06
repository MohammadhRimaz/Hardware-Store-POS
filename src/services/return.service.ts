import db from "../database/knex";

export async function processReturn(
  saleId: number,
  productId: number,
  quantity: number,
  refundAmount: number
) {
  return db.transaction(async (trx) => {
    await trx("returns").insert({
      sale_id: saleId,
      product_id: productId,
      quantity,
      refund_amount: refundAmount,
    });

    await trx("products")
      .where({ id: productId })
      .increment("stock_quantity", quantity);

    return true;
  });
}
