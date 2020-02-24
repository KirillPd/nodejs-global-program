import express, { Request, Response } from "express";

import { sequelize } from "./database/sequelize";
import { initRoutes } from "./routes";

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(express.json());

(async () => {
  await sequelize.sync({ force: false });
  initRoutes(app);

  app.use((error: any, _req: Request, res: Response) => {
    if(error) {
      console.error(error);
      res.status(500).send();
    }
  });
})();

export default app;
