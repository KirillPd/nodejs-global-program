import { Request, Response } from "express";

import { GroupService } from "../../services/group";

export class GroupController {
  static add = async (req: Request, res: Response) => {
    const id = await GroupService.add(req.body);
    return res.send(id);
  };

  static update = async (req: Request, res: Response, next: any) => {
    const { id } = req.params;
    try {
      const user = await GroupService.update(id, req.body);
      if (!user) {
        return res.status(400).send("Bad request");
      }
      return res.send(user);
    } catch (error) {
      next({ log: true, error });
    }
  };

  static get = async (req: Request, res: Response, next: any) => {
    const { id } = req.params;
    try {
      const user = await GroupService.get(id);
      if (!user) {
        return res.status(400).send("Bad request");
      }
      return res.send(user);
    } catch (error) {
      next({ log: true, error });
    }
  };

  static delete = async (req: Request, res: Response, next: any) => {
    const { id } = req.params;
    try {
      const data = await GroupService.delete(id);
      if (!data) {
        return res.status(400).send("Bad request");
      }
      return res.sendStatus(200);
    } catch (error) {
      next({ log: true, error });
    }
  };
}
