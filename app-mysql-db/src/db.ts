import { configLogger, Client } from "../deps.ts";
import { printError } from "./utils.ts";
import cfg from "../cfg.json" assert { type: "json" };
import { TABLE_NAME } from "./consts.ts";

let dbConn: Client;

export async function addRecord(id: string, data: any) {
  await dbConn.execute(
    `INSERT INTO ${TABLE_NAME} 
      (ID, ORIGINAL_URL, TARGET_URL) 
      VALUES ($1, $2, $3)`,
    [id, data.originalUrl, data.targetUrl],
  );
}

export async function getRecord(id: string) {
  const result = await dbConn.execute(
    `SELECT * FROM ${TABLE_NAME} WHERE ID = $1`,
    [id],
  );

  if (result && result.rows && result.rows.length > 0) {
    const dbRec = result.rows[0] as any;
    return {
      originalUrl: dbRec.original_url,
      targetUrl: dbRec.target_url
    }
  }
}

async function checkTables() {
  try {
    await dbConn.execute(`SELECT * FROM ${TABLE_NAME}`);
  } catch (e) {
    await dbConn.execute(`CREATE TABLE ${TABLE_NAME} (
      ID VARCHAR(10) PRIMARY KEY,
      ORIGINAL_URL VARCHAR(100) NOT NULL,
      TARGET_URL VARCHAR(30) NOT NULL
    )`);
    console.log(
      `${TABLE_NAME} table is created in ${cfg.mysql.db} database`,
    );
  }
}

async function connectDatabase() {
  try {
    await configLogger({ enable: false });
    dbConn = await new Client().connect({
      username: cfg.mysql.user,
      password: cfg.mysql.password,
      hostname: cfg.mysql.host,
      port: Number(cfg.mysql.port),
      db: cfg.mysql.db,
    });
    console.log("Connected to mysql database");
    await checkTables();
  } catch (e) {
    printError("Unable to connect to database: " + e.message);
    Deno.exit(1);
  }
}

connectDatabase();
