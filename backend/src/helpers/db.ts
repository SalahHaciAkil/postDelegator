import { Pool } from "pg";
import fs from "fs";
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  NODE_ENV,
} from "../config/env";
import logger from "../config/winston";

let pool: Pool;
if (NODE_ENV === "development") {
  pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_DATABASE,
    password: DB_PASSWORD,
    port: DB_PORT,
  });
} else {
  pool = new Pool({
    user: DB_USER,
    host: DB_HOST,
    database: DB_DATABASE,
    password: DB_PASSWORD,
  });
}
export const dbConnect = async () => {
  try {
    await pool.connect();
    logger.info("🚀 Connected to the database successfully");
  } catch (error) {
    logger.error("💣 Error connecting to the database", error);
  }
};

export const seedDatabase = async () => {
  try {
    const res = await pool.query(
      `SELECT * FROM information_schema.tables WHERE table_name = 'person' AND table_catalog = '${DB_DATABASE}'`
    );
    if (res.rows.length === 1) return console.log("🚀 Database already exist");
    const sql = fs.readFileSync("./src/seed.sql").toString();
    await pool.query(sql);
    console.log("🚀 SQL script seeded successfully");
  } catch (error) {
    console.error("💣 Error executing SQL script", error);
  }
};

export const dropTables = async () => {
  try {
    const res = await pool.query(
      `SELECT * FROM information_schema.tables WHERE table_name = 'person' AND table_catalog = '${DB_DATABASE}'`
    );
    if (res.rows.length === 0) return console.log("🚀 Tables already dropped");
    const sql = fs.readFileSync("./src/dropTables.sql").toString();
    await pool.query(sql);
    console.log("🚀 Database dropped successfully");
  } catch (error) {
    console.error("💣 Error dropping database", error);
  }
};

export { pool };
