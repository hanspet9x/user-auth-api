export interface ITokenReponse<T>{
    error: boolean;
    status: string;
    data: T;
}