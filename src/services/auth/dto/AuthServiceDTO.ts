import { IAuth } from "../../../models/IAuth";
import { IUser } from "../../../mongo/entities/user.entity";
import bcrypt from 'bcrypt';
;

export default class AuthServiceDTO implements IUser{
    email: string;
    password: string;
    token:string;
    constructor(user: IAuth) {
        this.email = user.email.toLowerCase();
        this.password = bcrypt.hashSync(user.password, 10);
        this.token = '';
    }
}