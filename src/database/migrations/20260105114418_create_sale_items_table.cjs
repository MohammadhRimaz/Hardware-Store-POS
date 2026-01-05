exports.up = function (knex) {
  return knex.schema.createTable("sale_items", (table) => {
    table.increments("id").primary();

    table
      .integer("sale_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("sales")
      .onDelete("CASCADE");
    table
      .integer("product_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("products")
      .onDelete("RESTRICT");

    table.integer("quantity").notNullable().defaultTo(1);
    table.decimal("unit_price", 10, 2).notNullable();
    table.decimal("total_price", 10, 2).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("sale_items");
};
