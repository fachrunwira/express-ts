import { connection, poolConnection } from "../config/connection"
import { Insert, Update } from "../library/database";
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
  const db = new Insert('login');
  db.fields = ['name', 'st'];
  let val = Array()

  for (let i = 0; i < 10; i++) {
    if (i % 2 == 0) {
      val.push(['Harun_' + i, true, 124 + 1, 'sesuatu'])
    } else {
      val.push(['Harun_' + i, false, 124 - 1, 'somthing'])
    }
  }

  db.values = val;

  return db.multiInsert
}

async function prepareRegister(params:any) : Promise<any> {
  const db = new Insert('login');
  db.fields = ['name', 'st', 'created_at'];
  // db.fields = 'name, st';

  return db.prepareInsert;
}

async function update(params:any) : Promise<any> {
  const db = new Update('login');
  db.fields = 'name, st';
  db.values = ['harun', false];

  return db.update
}

export default {
  register,
  multiRegister,
  prepareRegister,
  update
}