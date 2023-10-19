import "dotenv/config";
import { connection, poolConnection } from "../config/connection";

class Database {
  #table: string

  constructor (table: string) {
    this.#table = table
  }
  
  public get table() : string {
    return this.#table
  }
  
}

class Insert extends Database {
  #fields: object

  constructor(table: string, fields: object) {
    super(table)
    this.#fields = fields
  }
}