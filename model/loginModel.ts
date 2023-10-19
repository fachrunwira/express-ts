import { connection } from "../config/connection"
import { Database } from "../library/database";

async function register(param: any) {
  return Database.insert([1,2,3,4])

  // const sql = `INSERT INTO login (nama) VALUE (?);`

  // const res = query(sql, [param.name])

  // return res.then(async () => {
  //   return [true, 'Berhasil']
  // }).catch(async (err:any) => {
  //   return [false, err.message]
  // })
}

export default {
  register
}