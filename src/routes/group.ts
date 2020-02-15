import * as core from "express-serve-static-core";

import { GroupController } from "../controllers/group";

export const initGroupRoutes = (app: core.Express): void => {
  app.post("/group", GroupController.add);
  app.patch("/group/:id", GroupController.update);
  app.get("/group/:id?", GroupController.get);
  app.delete("/group/:id", GroupController.delete);
};
