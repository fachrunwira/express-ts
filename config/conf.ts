import 'dotenv/config'
export const config = {
  db: {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DB,
  },
  offset: 10
}