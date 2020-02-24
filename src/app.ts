import express from "express";

import { sequelize } from "./database/sequelize";
import { initRoutes } from "./routes";

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.json());

(async () => {
  try {
    await sequelize.sync({ force: false });
    initRoutes(app);
  } catch(error) {
    console.log(error);
  }
})();

export default app;
