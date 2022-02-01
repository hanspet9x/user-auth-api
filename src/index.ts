import express from "express";
import { appConfigs } from './configs/app';

const app = express();

app.listen(appConfigs.PORT, () => {
    console.log('Listening on port ' + appConfigs.PORT);
});