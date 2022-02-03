import { Response } from "express";
import { IResponse } from "./interface/response.types";

export const ResponseService = {
    badRequest(response: Response, message: any){
        const body: IResponse = {error: true, status: 400, message}
        response.status(400).json(body);
    },

    unauthenticated(response: Response, message: any){
        const body: IResponse = {error: true, status: 403, message}
        response.status(403).json(body);
    },

    unauthorized(response: Response, message: any){
        const body: IResponse = {error: true, status: 401, message}
        response.status(401).json(body);
    },    
    
    conflict(response: Response, message: any){
        const body: IResponse = {error: true, status: 409, message}
        response.status(409).json(body);
    },

    error(response: Response, message: any, status: number){
        const body: IResponse = {error: true, status, message}
        response.status(status).json(body);
    },

    send(response: Response, data: any, status = 200, message?: any){
        const body: IResponse = {error: false, data, status, message}
        response.status(status).send(body);
    },

    json(response: Response, data: any, status = 200, message?: any){
        const body: IResponse = {error: false, data, status, message}
        response.status(status).send(body);
    },
}