import { connection, poolConnection } from "../config/connection"
import { Insert } from "../library/database";
import sql from "sql-bricks";

async function register(param: any) : Promise<any> {
  const db = new Insert('login')
  db.fields = ['name', 'st']
  db.values = Object.values([param.name, param.status])

  const con = await connection()

  try {
    con.beginTransaction()

    await con.execute(db.insert)

    con.commit()

    return [true]
  } catch (errSql) {
    con.rollback()

    return [false, errSql]
  }
}

async function multiRegister(params:any) : Promise<any> {
  // sql.
}

export default {
  register,
  multiRegister
}