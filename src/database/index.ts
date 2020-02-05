import uuid from "uuid";
import { Op, Options, Sequelize } from "sequelize";
import { getUserModel } from '../models/User';

import { User } from "../types/User";

interface DataBaseInterface {
  sequelize?: Sequelize;
}

interface DataBaseInit {
  config: Options;
  tableName: string;
}

export class DataBase implements DataBaseInterface {
  sequelize: Sequelize;
  tableName: string;
  UserModel: any;

  init = async ({ config, tableName }: DataBaseInit) => {
    if (this.sequelize) {
      return console.error("Database is already connected");
    }

    this.sequelize = new Sequelize(config);

    try {
      await this.sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }

    this.createModel();
    this.tableName = tableName;
  };

  private createModel = () => {
    this.UserModel = getUserModel(this.sequelize);
  };

  getUser = (id: string): Promise<User | undefined> => {
    return this.UserModel.findOne({
      where: {
        id
      }
    });
  };

  addUser = (user: Omit<User, "id" | "isDeleted">): Promise<string> => {
    const id: string = uuid();

    return this.UserModel.create({
      ...user,
      id,
      isDeleted: false
    });
  };

  updateUser = (id: string, data: Partial<User>): Promise<User> => {
    return this.UserModel.update(data, {
      where: {
        id
      }
    });
  };

  deleteUser = (id: string): Promise<boolean> => {
    // TODO: To force delete
    // this.UserModel.destroy({
    //   where: {
    //     id
    //   }
    // });
    return this.updateUser(id, { isDeleted: true }).then(() => true);
  };

  getAutoSuggestUsers = (
    loginSubstring: string,
    limit: number
  ): Promise<User[]> => {
    console.log(loginSubstring);
    return this.UserModel.findAll({
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
