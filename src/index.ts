
import App from './app';
import { appConfigs } from './configs/app';

App.listen(appConfigs.PORT, () => {
    console.log('Listening on port= ' + appConfigs.PORT+ ' | db info = '+appConfigs.dbHost);
});