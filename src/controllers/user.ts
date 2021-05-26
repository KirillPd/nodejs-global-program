import { Request, Response } from "express";

import { DataBase } from "../database";
import { User } from "../models/User";

const db = new DataBase();

export const addUser = (req: Request, res: Response) => {
  db.addUser(req.body).then((id: string) => res.send(id));
};

export const updateUser = (req: Request, res: Response) => {
  const { id, ...rest } = req.body;
  db.updateUser(id, rest).then((user: User) => res.send(user));
};

export const getUser = (req: Request, res: Response) => {
  const { id } = req.params;
  db.getUser(id).then((user: User) => res.send(user));
};

export const deleteUser = (req: Request, res: Response) => {
  const { id } = req.params;
  db.deleteUser(id).then((isDeleted: boolean) => res.send(isDeleted));
};

export const getAutoSuggestUsers = (req: Request, res: Response) => {
  const { loginSubstring, limit } = req.query;
  db.getAutoSuggestUsers(loginSubstring, limit).then((users: User[]) => res.send(users));
};