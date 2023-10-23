export class Response {
  #res: any
  #status?: any
  #code?: number
  #content?: any | []
  #msg?: string | ""

  constructor(res: any) {
    this.#res = res
  }

  public set code(v : number) {
    this.#code = v;
  }

  public set content(v : any) {
    this.#content = v;
  }
  
  public set message(v : string) {
    this.#msg = v;
  }

  public set status(v : any) {
    this.#status = v;
  }
  
  public get json() : any {
    return this.#res.status(this.#code).json({
      status: this.#status,
      message: this.#msg,
      content: this.#content
    })
  }
  
}