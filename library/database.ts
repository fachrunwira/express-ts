import "dotenv/config";
import { connection, poolConnection } from "../config/connection";

export var Database = Object.create(null)

Database.table = function table(table:string) {
  return table
}

Database.insert = function insert(fields: object, values: object | undefined) {
  return fields
}
