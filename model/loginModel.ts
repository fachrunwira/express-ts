import { query } from "../config/connection"

interface Param {
  id: number,
  name: string
}

async function register(param: Param) {
  const sql = `INSERT INTO login (nama) VALUE (?);`

  const res = query(sql, [param.name])

  return res.then(async () => {
    return [true, 'Berhasil']
  }).catch(async (err:any) => {
    return [false, err.message]
  })
}

export default {
  register
}