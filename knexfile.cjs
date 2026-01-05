module.exports = {
  development: {
    client: "better-sqlite3",
    connection: {
      filename: process.env.DB_PATH || "./store.dev.db",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./src/database/migrations",
    },
  },
};
