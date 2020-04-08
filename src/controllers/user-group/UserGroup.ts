import { Request, Response } from "express";

import { UserGroupService } from "../../services/UserGroup";

export class UserGroupController {
  static addUsersToGroup = async (
    req: Request,
    res: Response,
    next: any
  ): Promise<any> => {
    try {
      const { groupId, userIds } = req.query;
      const data = await UserGroupService.addUsersToGroup(groupId, userIds);

      if (!data) {
        return res.status(400).send("Bad request");
      }
      return res.send(data);
    } catch (error) {
      next({ log: true, error });
    }
  };
}
