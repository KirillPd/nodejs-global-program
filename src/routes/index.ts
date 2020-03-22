import * as core from "express-serve-static-core";

import { initGroupRoutes } from "./group";
import { initUserRoutes } from "./user";
import { initUserGroupRoutes } from "./userGroup";
import { initLoginRoutes } from "./login";

export const initRoutes = (app: core.Express): void => {
  initLoginRoutes(app);
  initUserGroupRoutes(app);
  initUserRoutes(app);
  initGroupRoutes(app);
};
