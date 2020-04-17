import { Request, Response } from "express";

import { UserService } from "../../services/user";

export class UserController {
  static add = async (req: Request, res: Response, next: any) => {
    try {
      const id = await UserService.addUser(req.body);

      if (!id) {
        return res.status(400).send("Bad request");
      }
      return res.send(id);
    } catch (error) {
      next({ log: true, error });
    }
  };

  static update = async (req: Request, res: Response, next: any) => {
    try {
      const { id } = req.params;
      const user = await UserService.updateUser(id, req.body);

      if (!user) {
        return res.status(400).send("Bad request");
      }
      return res.send(user);
    } catch (error) {
      next({ log: true, error });
    }
  };

  static get = async (req: Request, res: Response, next: any) => {
    try {
      const { id } = req.params;
      const user = await UserService.getUser(id);

      if (!user) {
        return res.status(400).send("Bad request");
      }
      return res.send(user);
    } catch (error) {
      next({ log: true, error });
    }
  };

  static delete = async (req: Request, res: Response, next: any) => {
    try {
      const { id } = req.params;
      const isDeleted = await UserService.deleteUser(id);

      if (!isDeleted) {
        return res.status(400).send("Bad request");
      }
      return res.send(isDeleted);
    } catch (error) {
      next({ log: true, error });
    }
  };

  static getAutoSuggest = async (req: Request, res: Response, next: any) => {
    try {
      const { loginSubstring, limit } = req.query;
      const users = await UserService.getAutoSuggestUsers(
        loginSubstring.replace(/"/g, ""),
        limit
      );

      if (!users) {
        return res.status(400).send("Bad request");
      }
      return res.send(users);
    } catch (error) {
      next({ log: true, error });
    }
  };
}
