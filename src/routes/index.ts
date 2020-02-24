import * as core from "express-serve-static-core";

import { initGroupRoutes } from "./group";
import { initUserRoutes } from "./user";
import { initUserGroupRoutes } from "./userGroup";

export const initRoutes = (app: core.Express): void => {
  initUserGroupRoutes(app);
  initUserRoutes(app);
  initGroupRoutes(app);
};
