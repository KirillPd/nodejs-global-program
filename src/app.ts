import express from "express";

import { sequelize } from "./database/sequelize";
import { initRoutes } from "./routes";

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.json());

(async () => {
  await sequelize.sync({ force: false });
  initRoutes(app);
})();

export default app;
