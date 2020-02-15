import { Sequelize } from "sequelize-typescript";

import { development } from "./config/config.json";

export const sequelize = new Sequelize(
  Object.assign({}, development, { models: [__dirname + "/models"] })
);
