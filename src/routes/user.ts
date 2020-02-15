import * as core from "express-serve-static-core";
import { UserController } from "../controllers/user";

export const initUserRoutes = (app: core.Express): void => {
  app.post("/users", UserController.add);
  app.patch("/users/:id", UserController.update);
  app.get("/users", UserController.getAutoSuggest);
  app.get("/users/:id", UserController.get);
  app.delete("/users/:id", UserController.delete);
};
