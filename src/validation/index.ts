import Joi, { ObjectSchema } from "joi";
import { Request, Response, NextFunction } from "express";

const numbersAndLetters = /^(?=.*[a-zA-Z])(?=.*[0-9])/;

export const schema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string()
    .regex(numbersAndLetters)
    .required(),
  age: Joi.number()
    .min(4)
    .max(103)
    .required()
});

export const validate = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = Joi.validate(req.body, schema, { abortEarly: false });
    const isValid = error == null;

    if (isValid) {
      next();
    } else {
      const { details } = error;
      const message = details.map(i => i.message);

      console.log("error", message);
      res.status(400).json({ error: message });
    }
  };
};
