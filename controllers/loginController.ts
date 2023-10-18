import handler from "express-async-handler";
import multer from "multer"
import model from "../model/loginModel"
const body = multer().none()

export const register = handler(async (req, res, next) => {
  return body(req, res, async (err:any) => {
    const resul = await model.register(req.body)

    return res.status(200).json({
      status: true,
      data: resul
    })
  })
})