
import { NextFunction, Response, Request } from "express";
import Joi from "joi";
import { ResponseService } from "../services/response/ResponseService";
export const validateSchemaMiddleware =
  (schema: Joi.Schema) => (req: Request, res: Response, next: NextFunction) => {
    const {error, value} = schema.validate(req.body);
    if(error) {
        ResponseService.badRequest(res, error.details[0].message)
        return;
    }
    next();
    return;
  };