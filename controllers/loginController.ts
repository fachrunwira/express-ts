import handler from "express-async-handler";
import multer from "multer";
import model from "../model/loginModel";
import joi from "joi";
const body = multer().none();

export const register = handler(async (req, res, next) => {
  return body(req, res, async (err: any) => {
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
        const resul = model.register(result);

        return resul
          .then((msg) => {
            return res.status(200).json({
              status: true,
              message: msg,
            });
          })
          .catch((error) => {
            return res.status(500).json({
              status: false,
              message: error,
            });
          });
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
