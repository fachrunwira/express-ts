import { config } from "./conf";
import { createConnection, createPool } from "mysql2/promise";

export async function connection(sql: string, params: object) {
  const con = await createConnection(config.db)
  
  try {
    con.beginTransaction()

    const [result, ] = await con.execute(sql, params)

    con.commit()

    return result
  } catch (err) {
    con.rollback()
    
    return err
  }
}

export const poolConnection = createPool(config.poolConnection)