import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import { sequelize } from "./database/sequelize";
import { initRoutes } from "./routes";
import { checkToken } from "./middlwares/auth";

dotenv.config();

const app = express();

app.set("port", process.env.PORT || 3000); 
app.use(cors());
app.use(express.json());
app.use(checkToken);

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
