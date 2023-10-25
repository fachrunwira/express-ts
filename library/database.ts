class Database {
  #tbl_name: string

  constructor (table: string) {
    this.#tbl_name = table
  }
  
  public get table() : string {
    return this.#tbl_name
  }

  protected isUndefined(obj: any) : boolean {
    return (typeof obj === 'undefined') ? true : false
  }
}

export class Insert extends Database {
  #fields?: string | object
  #values?: object
  #multiValues? : object

  constructor(table: string) {
    super(table)
  }
  
  public set fields(v : string | object) {
    if (typeof v === 'object') {
      const val = Object.values(v);
      v = "";
      val.forEach((vl, i) => {
        v += ((val.length - 1) === i) ? `\`${vl}\`` : `\`${vl}\`,`;
      });
    }

    this.#fields = v
  }
  
  public set values(v : object) {
    this.#values = v
  }
  
  public set setMultiVal(v : object) {
    Object.values(this.#multiValues).push
  }
  

  private get valuesToString() : string {
    const val = typeof this.#values !== "undefined" ? Object.values(this.#values) : [];
    const lenVal = val.length
    let str = "";
    if ( typeof this.#values === "object" && typeof this.#values !== "undefined" ) {
      val.forEach((v, i) => {
        if (lenVal - 1 === i) {
          str += typeof v === "number" || typeof v === "boolean" ? v : `'${v}'`;
        } else {
          str += typeof v === "number" || typeof v === "boolean" ? `${v},` : `'${v}',`;
        }
      });
    }

    return str
  }

  private get multiValues() {
    let str = "";
    const val = typeof this.#values !== 'undefined' ? Object.values(this.#values) : []
    const lenVal = val.length

    return str;
  }

  public get insert() : string {
    return `INSERT INTO \`${this.table}\` (${this.#fields}) VALUE (${this.valuesToString});`
  }
  
  public get multiInsert() : any {
    return this.#values
    return `INSERT INTO \`${this.table}\` (${this.#fields}) VALUES `
  }
  
}

class Update extends Database {
  
  constructor(table: string) {
    super(table)
  }
}