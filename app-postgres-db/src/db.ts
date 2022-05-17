import { Client } from "../deps.ts";
import { printError } from "./utils.ts";
import cfg from "../cfg.json" assert { type: "json" };
import { ShortenedData, TABLE_NAME } from "./consts.ts";

let dbConn: Client;

export async function addRecord(id: string, data: any) {
  await dbConn.queryObject(
    `INSERT INTO ${TABLE_NAME} 
      (ID, ORIGINAL_URL, TARGET_URL) 
      VALUES ($1, $2, $3)`,
    [id, data.originalUrl, data.targetUrl],
  );
}

export async function getRecord(id: string) {
  const result = await dbConn.queryObject(
    `SELECT * FROM ${TABLE_NAME} WHERE ID = $1`,
    [id],
  );
  if (result && result.rows && result.rows.length > 0) {
    return result.rows[0] as ShortenedData;
  }
}

async function checkTables() {
  try {
    await dbConn.queryObject(`SELECT * FROM ${TABLE_NAME}`);
  } catch (e) {
    await dbConn.queryObject(`CREATE TABLE ${TABLE_NAME} (
      ID VARCHAR(10) PRIMARY KEY,
      ORIGINAL_URL VARCHAR(100) NOT NULL,
      TARGET_URL VARCHAR(30) NOT NULL
    )`);
    console.log(
      `${TABLE_NAME} table is created in ${cfg.postgres.db} database`,
    );
  }
}

async function connectDatabase() {
  try {
    dbConn = new Client({
      user: cfg.postgres.user,
      password: cfg.postgres.password,
      hostname: cfg.postgres.host,
      port: cfg.postgres.port,
      database: cfg.postgres.db,
    });
    await dbConn.connect();
    console.log("Connected to postgres database");
    await checkTables();
  } catch (e) {
    printError("Unable to connect to database: " + e.message);
    Deno.exit(1);
  }
}

connectDatabase();
