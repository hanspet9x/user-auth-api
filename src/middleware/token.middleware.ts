import { NextFunction, Request, Response } from "express";
import { ResponseService } from "../services/response/ResponseService";
import { TokenService } from "../services/token/TokenService";

export const validateTokenMiddleware =
  () => (request: Request, response: Response, next: NextFunction) => {
    const bearerToken = request.headers.authorization;
    if (bearerToken) {
      const token = bearerToken.replace("Bearer ", "");
      try {
        const { email } = TokenService.verify<{ email: string }>(token);
        if (request.body.email === email) {
          next();
        }
        ResponseService.unauthorized(response, "Invalid token.");
      } catch (error: any) {
        ResponseService.unauthorized(response, error.message);
        return;
      }
    }
    ResponseService.unauthorized(
      response,
      "Bearer Token authorization is required."
    );
    return;
  };
