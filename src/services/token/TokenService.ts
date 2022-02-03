import token from 'jsonwebtoken';
import { appConfigs } from './../../configs/app';


export const TokenService =  {

    get(payload: string){
        return token.sign(payload, appConfigs.jwtSecret, {expiresIn: appConfigs.jwtExpire})
    },

    verify<T>(nToken: string){
        try {
            const data = token.verify(nToken, appConfigs.jwtSecret) as T
            return data;
        } catch (error) {
            throw error;
        }
    }
}