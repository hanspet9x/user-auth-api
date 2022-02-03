import { IUser } from "../../../mongo/entities/user.entity";

export default class AuthResponseDto {

    email: string;
    token: string;

    constructor(email: string, token: string) {
        this.email = email;
        this.token = token;
    }
}