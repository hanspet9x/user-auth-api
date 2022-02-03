import {Schema} from 'mongoose';
import { IUser } from '../entities/user.entity';

export const UserSchema = new Schema<IUser>({
    email: String,
    password: String,
    token: String,
    createdAt: Date
});
