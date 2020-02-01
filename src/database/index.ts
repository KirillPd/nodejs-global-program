import uuid from "uuid";
import { DataTypes, Op, Options, Sequelize } from "sequelize";

import { User } from "../models/User";

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

  init = ({ config, tableName }: DataBaseInit) => {
    if (this.sequelize) {
      return console.error("Database is already connected");
    }

    this.sequelize = new Sequelize(config);
    this.createModel();
    this.tableName = tableName;
  };

  private createModel = () => {
    this.UserModel = this.sequelize.define(
      "user",
      {
        id: {
          type: DataTypes.STRING,
          allowNull: false,
          primaryKey: true
        },
        login: {
          type: DataTypes.STRING,
          allowNull: false
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        age: {
          type: DataTypes.NUMBER,
          allowNull: false
        },
        isDeleted: {
          type: DataTypes.BOOLEAN,
          allowNull: false
        }
      },
      {
        timestamps: false
      }
    );
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
