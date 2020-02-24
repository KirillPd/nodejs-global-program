import { Request, Response } from "express";

import { GroupService } from "../services/group";

export class GroupController {
  static add = async (req: Request, res: Response) => {
    const id = await GroupService.add(req.body);
    return res.send(id);
  };

  static update = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await GroupService.update(id, req.body);
    return res.send(user);
  };

  static get = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await GroupService.get(id);
    return res.send(user);
  };

  static delete = async (req: Request, res: Response) => {
    const { id } = req.params;
    await GroupService.delete(id);
    return res.sendStatus(200);
  };
}
