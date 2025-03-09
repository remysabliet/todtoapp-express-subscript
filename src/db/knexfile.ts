import { Knex } from "knex";
import dotenv from "dotenv";

// Load .env variables
dotenv.config();

const dbConfig: Knex.Config = {
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "./migrations",
  },
  seeds: { directory: "./data/seeds" },
};

export default dbConfig;

