import * as core from 'express-serve-static-core';
import { UserController } from './controllers/user';
import { schema, validate } from './validation';

export const initRoutes = (app: core.Express, userController: UserController): void => {
  app.post("/users", validate(schema), userController.addUser);
  app.patch("/users/:id", validate(schema), userController.updateUser);
  app.get("/users", userController.getAutoSuggestUsers);
  app.get("/users/:id", userController.getUser);
  app.delete("/users/:id", userController.deleteUser);
};
