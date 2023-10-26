class Database {
  #tbl_name: string

  constructor (table: string) {
    this.#tbl_name = table
  }
  
  protected get table() : string {
    return this.#tbl_name
  }

  protected isUndefined(obj: any) : boolean {
    return (typeof obj === 'undefined') ? true : false
  }
}

export class Insert extends Database {
  #fields?: string | object
  #values?: object

  constructor(table: string) {
    super(table)
  }

  private joinVal(val: any) : string {
    let str = "";
    if (typeof val === 'object' && typeof val !== 'undefined') {
      const len = Object.keys(val).length;
      val.forEach((v: any, i: number) => {
        if ((len - 1) === i) {
          str += typeof v === 'number' || typeof v === 'boolean' ? v : `'${v}'`
        } else {
          str += typeof v === 'number' || typeof v === 'boolean' ? `${v},` : `'${v}',`
        }
      });
    }

    return str;
  }

  private setPreparedVal(val: object) : string {
    let str = "";
    Object.values(val).forEach((v, i) => {
      str += (Object.keys(val).length - 1) === i ? '?': '?,' ;
    });

    return str;
  }
  
  public set fields(v : string | object) {
    this.#fields = v
  }
  
  public set values(v : object) {
    this.#values = v
  }

  private get fieldsToString() : string {
    let field = "";
    if (typeof this.#fields === 'object' && typeof this.#fields !== 'undefined') {
      const val = Object.values(this.#fields);
      val.forEach((vl, i) => {
        field += val.length - 1 === i ? `\`${vl}\`` : `\`${vl}\`,`;
      });
    }

    if (typeof this.#fields === 'string' && typeof this.#fields !== 'undefined') {
      field = this.#fields;
    }

    return field;
  }

  private get valuesToString() : string {
    const val = typeof this.#values !== "undefined" ? Object.values(this.#values) : [];

    return this.joinVal(val)
  }

  private get multiValues() : string {
    let str = "";
    const val = typeof this.#values !== 'undefined' ? Object.values(this.#values) : []
    const lenVal = val.length

    if (typeof this.#values === 'object' && typeof this.#values !== 'undefined') {
      val.forEach((v, i) => {
        str += (lenVal - 1) === i ? `(${this.joinVal(v)})` : `(${this.joinVal(v)}),`;
      })
    }

    return str
  }

  private get prepareValues() : string {
    let str = "";
    if (typeof this.#fields === 'object' && typeof this.#fields !== 'undefined') {
      str = this.setPreparedVal(this.#fields);
    }

    if (typeof this.#fields === 'string' && typeof this.#fields !== 'undefined') {
      const val = this.#fields.split(',').map(function (vl:any) {return vl.trim()});
      str = this.setPreparedVal(val);
    }

    return str;
  }

  private get insert_sql() : string {
    return `INSERT INTO \`${this.table}\` (${this.fieldsToString})`;
  }

  public get insert() : string {
    return `${this.insert_sql} VALUE (${this.valuesToString});`
  }
  
  public get multiInsert() : string {
    return `${this.insert_sql} VALUES ${this.multiValues};`
  }

  public get prepareInsert() : string {
    return `${this.insert_sql} VALUE (${this.prepareValues});`;
  }
  
}

export class Update extends Database {
  #fields?: string | object
  #values?: object
  #condition? : string | object

  constructor(table: string) {
    super(table)
  }
  
  public set fields(v : string | object) {
    this.#fields = v;
  }
  
  public set values(v : object) {
    this.#values = v;
  }

  private get setKeyFields() : object | undefined {
    const arr = Array();
    if (typeof this.#fields === 'object' && typeof this.#fields !== 'undefined') {
      Object.values(this.#fields).map(function (val:any) {
        arr.push(val);
      });
    }

    if (typeof this.#fields === 'string' && typeof this.#fields !== 'undefined') {
      this.#fields.split(',').map(function (val: any) {
        arr.push(val.trim());
      });
    }

    return arr;
  }

  private get update_sql() : string {
    return `UPDATE \`${this.table}\` SET`;
  }
  
  public get update() : any {
    let str = "";
    const key = Object.values(this.setKeyFields || []);
    const val = Object.values(this.#values || [])
    
    key.map(function (k:any, idx: number) {
      let v = typeof val[idx] === 'number' || typeof val[idx] === 'boolean' ? val[idx] : `'${val[idx]}'`;
      str += (key.length - 1) === idx ? `\`${k}\` = ${v}` : `\`${k}\` = ${v},`;
    });

    return `${this.update_sql} ${str};`;
  }
  
  
}