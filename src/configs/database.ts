import mongoose from 'mongoose';
import { LogService } from '../services/log/LogService';

export const setDbConnection = async (host: string) => {
    try {
        await mongoose.connect(host)
    } catch (error) {
        LogService.log(error);
    }
}
