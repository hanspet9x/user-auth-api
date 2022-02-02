import { IUser } from "../../mongo/entities/user.entity";
import { UserModel } from "../../mongo/models/user.model";

export const AuthContoller = {
  async regiser(user: IUser) {
    await UserModel.create(user);
  },

  async getByUsername(username: string) {
    return UserModel.findOne({ email: username }).lean();
  },

  async updatePassword(user: IUser) {
      return UserModel.findOneAndUpdate({email: user.email}, {password: user.password});
  }
};
