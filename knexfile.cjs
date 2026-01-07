const path = require("path");
const os = require("os");

const userDataPath = path.join(
  os.homedir(),
  "AppData",
  "Roaming",
  "Hardware Store POS",
  "store.db"
);

module.exports = {
  development: {
    client: "better-sqlite3",
    connection: {
      filename: process.env.DB_PATH || userDataPath,
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./src/database/migrations",
    },
  },
};
