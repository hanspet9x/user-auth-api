import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import AppController from "./controllers/AppController";
import { setDbConnection } from "./configs/database";
import { appConfigs } from "./configs/app";
import { ResponseService } from "./services/response/ResponseService";

const App = express();

App.use(cors({ origin: [] }));
App.use(express.json());

//database connection;
(async () => {
  await setDbConnection(appConfigs.dbHost);
})();

//route registration.
App.use(AppController);

//error monitors
App.use(
  (error: any, request: Request, response: Response, next: NextFunction) => {
    if (response.headersSent) {
      next(error);
      return;
    }
    ResponseService.error(response, error.message, 500);
  }
);

//routes not found
App.use((request: Request, response: Response) => {
  ResponseService.badRequest(response, 'Route not found.');
  return;
});

export default App;
