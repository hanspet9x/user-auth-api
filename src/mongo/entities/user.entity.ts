export interface IUser {
    email: string;
    password: string;
    passwordResetCode?: number;
    createdAt?: Date;
}