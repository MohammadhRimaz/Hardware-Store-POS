exports.up = function (knex) {
  return knex.schema.createTable("products", (table) => {
    table.increments("id").primary();

    // Core identity
    table.string("name").notNullable();
    table.string("brand").nullable();

    // Classification
    table
      .integer("category_id")
      .unsigned()
      .references("id")
      .inTable("categories")
      .onDelete("RESTRICT");

    // Physical attributes
    table.string("size").nullable();
    table.string("height").nullable();
    table.string("color").nullable();

    // Pricing
    table.decimal("cost_price", 10, 2).notNullable();
    table.decimal("sale_price", 10, 2).notNullable();

    // Inventory
    table.integer("stock_quantity").notNullable().defaultTo(0);
    table.integer("reorder_level").notNullable().defaultTo(0);

    // Optional image reference (path or filename)
    table.string("image").nullable();

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("products");
};
