import { IUser } from "../../mongo/entities/user.entity";
import { UserModel } from "../../mongo/models/user.model";

export const AuthRepository = {
  async regiser(user: IUser) {
    return UserModel.create(user);
  },

  async getByEmail(username: string) {
    return UserModel.findOne({ email: username }).lean();
  },

  async updateSecurity(email: string, passwordResetCode: number) {
      return UserModel.findOneAndUpdate({email}, {passwordResetCode}).lean();
  },  
  
  async updatePassword(email: string, password: string) {
      return UserModel.findOneAndUpdate({email}, {password, passwordResetCode: 0}).lean();
  },  
  
  async updateToken(email: string, token: string) {
      return UserModel.findOneAndUpdate({email}, {token}).lean();
  },

  async isEmailExists(email: string) {
    return UserModel.exists({ email});
  },

  async isTokenExists(email: string, token: string) {
    return UserModel.exists({ email, token});
  },
};
