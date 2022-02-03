import { NextFunction, Request, Response } from "express";
import { ResponseService } from "../services/response/ResponseService";
import { TokenService } from "../services/token/TokenService";

export const validateTokenMiddleware = () => (request: Request, response: Response, next: NextFunction) => {
    const bearerToken = request.headers.authorization;
    if(bearerToken) {
        const token = bearerToken.replace('bearer ', '');
        try {
            TokenService.verify(token);
            next();
        } catch (error: any) {
            ResponseService.unauthorized(response, error.message);
            return;
        }
    }
    ResponseService.unauthorized(response, 'Token does not exist');
    return;
}