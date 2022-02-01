import express, { NextFunction, Request, Response} from 'express';
import cors from 'cors';
import AppController from '../../controllers/AppController';

const App = express.Router();

App.use(cors({origin: []}));
App.use(express.json());

App.use(AppController);

App.use((error: any, request: Request, response: Response, next: NextFunction) => {
    if(response.headersSent) {
        next(error);
        return;
    }
    response.send()
})

App.use((request: Request, response: Response) => {
    response.status(400).send('sent');
});

export default App;