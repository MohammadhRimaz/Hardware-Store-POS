exports.up = function (knex) {
  return knex.schema.createTable("customers", (table) => {
    table.increments("id").primary();

    table.string("name").notNullable();
    table.string("contact").nullable();

    // Credit book
    table.decimal("current_debt", 10, 2).notNullable().defaultTo(0);

    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("customers");
};
