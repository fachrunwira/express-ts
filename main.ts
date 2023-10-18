import express from "express"
import bodyParser from "body-parser"
import morgan from "morgan"
import createError from "http-errors"

import { login } from "./routes/login";

export const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/auth', login)

app.use((req, res, next) => {
  next(createError(404, "Cannot find url..."))
})

app.use((data: any, req: any, res: any, next: any) => {
  const st_code = data.statusCode || 500

  res.status(st_code).json({
    status: true,
    message: data.msg
  })
})