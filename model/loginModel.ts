import { connection, poolConnection } from "../config/connection"
import { Insert } from "../library/database";

async function register(param: any) {
  const db = new Insert('login')
  db.fields = ['naa', 'st']
  db.values = Object.values([param.name, param.status])

  const result = await connection(db.insert)
  return result[0]
  try {

    if (!result[0]) {
      throw new Error(result[1]);
    }
    
    return result[1]
  } catch (error) {
    return error
  }
}

export default {
  register
}