import { Op } from "sequelize";

import { default as UserModel } from "../database/models/User";
import { User } from "../types/User";

export class UserService {
  static Model: any;
  
  static getUser = (id: string): Promise<User | undefined> => {
    return UserService.Model.findOne({
      where: {
        id
      }
    });
  };

  static addUser = (user: Omit<User, "id" | "isDeleted">): Promise<string> => {
    return UserService.Model.create({
      ...user,
      isDeleted: false
    });
  };

  static updateUser = (id: string, data: Partial<User>): Promise<User> => {
    return UserService.Model.update(data, {
      where: {
        id
      },
      returning: true
    });
  };

  static deleteUser = (id: string): Promise<any> => {
    return UserService.updateUser(id, { isDeleted: true });
  };

  static getAutoSuggestUsers = (
    loginSubstring: string,
    limit: number
  ): Promise<User[]> => {
    return UserService.Model.findAll({
      limit,
      order: [["login", "DESC"]],
      where: {
        login: {
          [Op.iLike]: `%${loginSubstring}%`
        }
      }
    });
  };
}
UserService.Model = UserModel;
