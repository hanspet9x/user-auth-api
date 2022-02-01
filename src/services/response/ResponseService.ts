import { Response } from "express";

export const ResponseService = {
    badRequest(response: Response, message: any){
        response.status(400).send(message);
    },

    unauthenticated(response: Response, message: any){
        response.status(401).send(message);
    },

    unauthorized(response: Response, message: any){
        response.status(404).send(message);
    },

    send(response: Response, message: any, status = 200){
        response.status(status).json(message);
    },
}