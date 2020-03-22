import * as core from "express-serve-static-core";

import { LoginController } from "../controllers/login";

export const initLoginRoutes = (app: core.Express): void => {
  app.post("/login", LoginController.login);
};
