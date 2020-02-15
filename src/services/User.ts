import uuid from "uuid";
import { Op } from "sequelize";

import { default as UserModel } from "../database/models/User";
import { User } from "../types/User";

export class UserService {
  static getUser = (id: string): Promise<User | undefined> => {
    return UserModel.findOne({
      where: {
        id
      }
    });
  };

  static addUser = (user: Omit<User, "id" | "isDeleted">): Promise<string> => {
    const id: string = uuid();

    return UserModel.create({
      ...user,
      id,
      isDeleted: false
    });
  };

  static updateUser = (id: string, data: Partial<User>): Promise<User> => {
    return UserModel.update(data, {
      where: {
        id
      }
    });
  };

  static deleteUser = (id: string): Promise<boolean> => {
    // TODO: To force delete
    // UserModel.destroy({
    //   where: {
    //     id
    //   }
    // });
    return UserService.updateUser(id, { isDeleted: true }).then(() => true);
  };

  static getAutoSuggestUsers = (
    loginSubstring: string,
    limit: number
  ): Promise<User[]> => {
    return UserModel.findAll({
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
