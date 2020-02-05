import { Sequelize, DataTypes } from "sequelize";

export const getUserModel = (sequelize: Sequelize) => {
  return sequelize.define(
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
