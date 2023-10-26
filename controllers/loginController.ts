import handler from "express-async-handler";
import multer from "multer";
import model from "../model/loginModel";
import joi, { boolean } from "joi";
import { Response } from "../library/response"
const body = multer().none();

const register = handler(async (req, res, next) => {
  return body(req, res, async (err: any) => {
    const response = new Response(res)

    const schema = joi
      .object({
        name: joi.string().label("Nama").required().messages({
          "any.required": "{#label} is required",
        }),
        status: joi.boolean().label("Status").required(),
      })
      .validateAsync(req.body, { abortEarly: true });

    return schema
      .then(async (result) => {
        const resul = await model.register(result);

        if (resul[0] === true) {
          response.code = 200
          response.message = "Berhasil"
        } else {
          response.code = 500
          response.message = "Terjadi Kesalahan"
          response.content = resul[1].message
        }

        response.status = resul[0]
        response.json
      })
      .catch((error) => {
        return res.status(400).json({
          status: false,
          data: error.message,
          fullErr: error,
        });
      });
  });
});

const multiRegister = handler(async (req, res, next) => {
  return body(req, res, async (err: any) => {
    const result = await model.multiRegister([])

    res.status(200).json({
      status: true,
      message: result
    })
  })
});

const prepareRegister = handler(async (req, res, next) => {
  return body(req, res,async (err:any) => {
    const result = await model.prepareRegister('');

    res.status(200).json({
      status: true,
      message: result
    });
  });
});

const update = handler(async (req, res, next) => {
  return body(req, res,async (err: any) => {
    const result = await model.update('');

    res.status(200).json({
      status: true,
      message: result
    });
  });
});

export default {
  register, multiRegister, prepareRegister, update
}