import { Request, Response } from "express";

export class UserGroupController {
  static addUsersToGroup = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    const { groupId, userIds } = req.query;
    return res.send(
      await UserGroupController.addUsersToGroup(groupId, userIds)
    );
  };
}
