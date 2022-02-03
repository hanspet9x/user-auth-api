import express, { Request, Response } from 'express';
import { validateTokenMiddleware } from '../../middleware/token.middleware';
import { validateSchemaMiddleware } from '../../middleware/verifySchema.middleware';
import { IAuth } from '../../models/IAuth';
import { IResetPassword } from '../../models/IResetPassword';
import { AppRoutes } from '../../routes/routes';
import { AuthService } from '../../services/auth/AuthService';
import { ResponseService } from '../../services/response/ResponseService';
import { authValidation } from './auth.joi';

const AuthContoller = express.Router();

AuthContoller.post(AppRoutes.login, 
    validateSchemaMiddleware(authValidation.auth),
    async (request: Request, response: Response) => {
        const body: IAuth = request.body;
        try {
            const res = await AuthService.login(body);
            ResponseService.json(response, res);
            return;
        } catch (error: any) {
            ResponseService.unauthenticated(response, error.message);
            return;
        }
})

AuthContoller.post(AppRoutes.regiser,
    validateSchemaMiddleware(authValidation.auth),
    async (request: Request, response: Response) => {
        const body: IAuth = request.body;
        try {
            const res = await AuthService.regiser(body);
            ResponseService.json(response, res, 201);
            return;
        } catch (error: any) {
            ResponseService.conflict(response, error.message);
            return;
        }
    
});

AuthContoller.post(AppRoutes.initiatePasswordReset, 
    validateSchemaMiddleware(authValidation.initiatePassword),
    async (request: Request, response: Response) => {
        const email: string = request.body.email;
        try {
            const res = await AuthService.initiatePasswordReset(email);
            ResponseService.json(response, res, 200, res);
            return;
        } catch (error: any) {
            ResponseService.error(response, error.message, 403);
            return;
        }
});

AuthContoller.post(AppRoutes.resetPassword, 
    validateSchemaMiddleware(authValidation.resetPassword),
    async (request: Request, response: Response) => {
        const body: IResetPassword = request.body.email;
        try {
            const res = await AuthService.resetPassword(body);
            ResponseService.json(response, res, 200, res);
            return;
        } catch (error: any) {
            ResponseService.error(response, error.message, 403);
            return;
        }
});

AuthContoller.post(AppRoutes.confirmToken, 
    validateSchemaMiddleware(authValidation.token),
    async (request: Request, response: Response) => {
        const body: string = request.body.token;
        try {
            const res = await AuthService.confirmToken(body);
            ResponseService.json(response, res, 200, res);
            return;
        } catch (error: any) {
            ResponseService.error(response, error.message, 403);
            return;
        }
});

export default AuthContoller;