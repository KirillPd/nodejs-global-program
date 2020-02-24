import { Request, Response } from "express";

import { UserGroupService } from "../services/UserGroup";

export class UserGroupController {
  static addUsersToGroup = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const {groupId, userIds} = req.query;
    
    return res.send(
      await UserGroupService.addUsersToGroup(groupId, userIds)
    );
  };
}
