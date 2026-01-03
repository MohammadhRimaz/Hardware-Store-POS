import knex from "knex";

const db = knex({
  client: "better-sqlite3",
  connection: {
    filename: process.env.DB_PATH!,
  },
  useNullAsDefault: true,
});

export default db;
