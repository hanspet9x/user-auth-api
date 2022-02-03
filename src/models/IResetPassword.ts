export interface IResetPassword {
    email: string;
    password: string;
    securityCode?: number;
}