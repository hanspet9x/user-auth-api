import express, { Request, Response } from 'express';
import { AppRoutes } from '../../routes/routes';
;

const AuthContoller = express.Router();

AuthContoller.post(AppRoutes.login, (request: Request, response: Response) => {

})

AuthContoller.post(AppRoutes.regiser, (request: Request, response: Response) => {
    
});

AuthContoller.post(AppRoutes.resetPassword, (request: Request, response: Response) => {
    
});