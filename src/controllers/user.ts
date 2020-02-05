import { Request, Response } from "express";

import { DataBase } from "../database";
import { User } from "../types/User";

// TODO: Use async/await instead of then
export class UserController {
  db: DataBase;

  constructor(db: DataBase) {
    this.db = db;
  }

  addUser = (req: Request, res: Response) => {
    this.db.addUser(req.body).then((id: string) => res.send(id));
  };

  updateUser = (req: Request, res: Response) => {
    const { id } = req.params;
    this.db.updateUser(id, req.body).then((user: User) => res.send(user));
  };

  getUser = (req: Request, res: Response) => {
    const { id } = req.params;
    this.db.getUser(id).then((user: User) => res.send(user));
  };

  deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;
    this.db.deleteUser(id).then((isDeleted: boolean) => res.send(isDeleted));
  };

  getAutoSuggestUsers = (req: Request, res: Response) => {
    const { loginSubstring, limit } = req.query;
    this.db
      .getAutoSuggestUsers(loginSubstring.replace(/"/g, ''), limit)
      .then((users: User[]) => res.send(users));
  };
}
