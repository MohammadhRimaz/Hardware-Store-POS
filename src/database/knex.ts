import knex from "knex";
import path from "node:path";

if (!process.env.DB_PATH) {
  throw new Error("DB_PATH is not set. Electron must define it first.");
}

if (!process.env.APP_ROOT) {
  throw new Error("APP_ROOT is not set. Electron must define it first.");
}

const db = knex({
  client: "better-sqlite3",
  connection: {
    filename: process.env.DB_PATH,
  },
  useNullAsDefault: true,

  migrations: {
    directory: path.join(process.env.APP_ROOT, "src", "database", "migrations"),
  },
});

export default db;
