exports.up = function (knex) {
  return knex.schema.createTable("returns", (table) => {
    table.increments("id").primary();

    table
      .integer("sale_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("sales")
      .onDelete("RESTRICT");
    table
      .integer("product_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("products")
      .onDelete("RESTRICT");

    table.integer("quantity").notNullable();
    table.decimal("refund_amount", 10, 2).notNullable();

    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("returns");
};
