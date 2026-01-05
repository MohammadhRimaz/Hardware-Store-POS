exports.up = function (knex) {
  return knex.schema.createTable("sales", (table) => {
    table.increments("id").primary();

    // Link to customer (nullable for cash sales)
    table
      .integer("customer_id")
      .unsigned()
      .references("id")
      .inTable("customers")
      .onDelete("SET NULL");

    // Financial details
    table.decimal("subtotal", 10, 2).notNullable();
    table.decimal("discount", 10, 2).notNullable().defaultTo(0);
    table.decimal("total_amount", 10, 2).notNullable();

    // Payment details
    table.enu("paymnet_method", ["CASH", "CHEQUE", "CREDIT"]).notNullable();

    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("sales");
};
