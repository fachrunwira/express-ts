import { config } from "./conf";
import {createConnection} from "mysql2/promise";
import { createPool } from "mysql2";

export async function connection() : Promise<any> {
  return await createConnection(config.db)
}

export const poolConnection = createPool(config.poolConnection)