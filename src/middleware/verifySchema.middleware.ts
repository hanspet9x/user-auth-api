
import { NextFunction, Response, Request } from "express";
import Joi from "joi";
export const validateSchemaMiddleware =
  (schema: Joi.Schema) => (req: Request, res: Response, next: NextFunction) => {
    const {error, value} = schema.validate(req.body);
    if(error) {
        next(error.details[0].message);
        return;
    }
    next();
    return;
  };