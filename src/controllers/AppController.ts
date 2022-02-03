import express from 'express';
import { AppRoutes } from '../routes/routes';
import AuthContoller from './auth/AuthController';

const AppController = express.Router();

AppController.use(AppRoutes.auth, AuthContoller);

export default AppController;