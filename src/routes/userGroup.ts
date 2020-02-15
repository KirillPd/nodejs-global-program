import * as core from "express-serve-static-core";

import { UserGroupController } from "../controllers/userGroup";

export const initUserGroupRoutes = (app: core.Express): void => {
  app.post("/user-groups", UserGroupController.addUsersToGroup);
};
