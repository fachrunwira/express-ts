import { connection } from "../config/connection"
// import { Database } from "../library/database";

// const db = new Database()

async function register(param: any) {
  return 'aha'
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