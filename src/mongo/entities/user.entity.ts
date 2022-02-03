export interface IUser {
    email: string;
    password: string;
    token: string;
    passwordResetCode?: number;
    createdAt?: Date;
}