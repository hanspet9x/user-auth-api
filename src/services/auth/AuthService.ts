import { IAuth } from "../../models/IAuth";
import { IUser } from "../../mongo/entities/user.entity";
import { AuthRepository } from "../../repo/auth/AuthRepository";
import { TokenService } from "../token/TokenService";
import AuthResponseDto from "./dto/AuthResponseDTO";
import AuthServiceDTO from "./dto/AuthServiceDTO";
import bcrypt from 'bcrypt';
import { IResetPassword } from "../../models/IResetPassword";
import { EmailService } from "../email/EmailService";

export const AuthService = {
  async confirmToken(token: string){
    const {email} = TokenService.verify<{email: string}>(token);
    return await AuthRepository.isTokenExists(email, token);
  },

  async regiser(user: IAuth) {
    try {
        //check email
      if(!(await AuthRepository.isEmailExists(user.email))){
          //save user
        const nUser: IUser = await AuthRepository.regiser(
            new AuthServiceDTO(user)
          );
          return AuthService.getResponse(nUser.email);
      }
      throw new Error('Credentials found.');
    } catch (error) {
      throw error;
    }
  },

  async login(nUser: IAuth) {
    const user: IUser | null = await AuthRepository.getByEmail(nUser.email);
    if(user){
        const valid = await bcrypt.compare(nUser.password, user.password);
        if(valid) {

            return AuthService.getResponse(user.email)
        }
        throw new Error(`${user.email} or password is not correct.`);
    }
    throw new Error(`${nUser.email} or password is not correct.`);
  },

  async initiatePasswordReset(email: string) {
    if((await AuthRepository.isEmailExists(email))){
        const sec = Math.floor(Math.floor(Math.random() * 10000));

        //send email with sec
        await AuthRepository.updateSecurity(email, sec);
        await EmailService.sendEmail({
          message: 'Security code: '+sec,
          subject: 'Password Reset',
          to: email
        });
        return 'A security code has been sent to your email. This should be used to reset your password.';
    }
    throw new Error(`${email} does not exist.`)
  },

  async resetPassword(auth: IResetPassword){
    const user: IUser | null = await AuthRepository.getByEmail(auth.email);
    if(user) {
        const valid = await bcrypt.compare(auth.password, user.password);
        if(valid) {
            throw new Error('Password does not need to be changed!');
        }

        if(auth.securityCode !== user.passwordResetCode) {
            throw new Error('Invalid Security code.');
        }

        //update user's password.
        const nAuth = new AuthServiceDTO(user);
        await AuthRepository.updatePassword(auth.email, nAuth.password);
        return AuthService.getResponse(nAuth.email);
    }
  },
  
  async getResponse(email: string){
    const token = TokenService.get({email});
    await AuthRepository.updateToken(email, token);
    return new AuthResponseDto(email, token);
  },
};
