import { Request, Response } from "express";

import { UserService } from "../services/user";

export class UserController {
  static add = async (req: Request, res: Response) => {
    try {
      const id = await UserService.addUser(req.body);
      return res.send(id);
    } catch (error) {
      console.error(error);
      return res.status(400).send(error);
    }
  };

  static update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await UserService.updateUser(id, req.body);
    return res.send(user);
  };

  static get = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await UserService.getUser(id);
    return res.send(user);
  };

  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    const isDeleted = await UserService.deleteUser(id);
    return res.send(isDeleted);
  };

  static getAutoSuggest = async (req: Request, res: Response) => {
    const { loginSubstring, limit } = req.query;
    const users = await UserService.getAutoSuggestUsers(
      loginSubstring.replace(/"/g, ""),
      limit
    );
    return res.send(users);
  };
}
