import { config } from "./conf";
import {createConnection, createPool} from "mysql2/promise";

export async function connection(sql: string, params?: object) : Promise<any> {
  const con = await createConnection(config.db)

  try {
    con.beginTransaction()

    const [result, ] = await con.execute(sql, params)

    con.commit()

    return [true, result]
  } catch (error) {
    con.rollback()

    return [false, error]
  }
}

export const poolConnection = createPool(config.poolConnection)