import { UserGroup } from "../types/UserGroup";
import { default as UserGroupModel } from "../database/models/UserGroup";

const generateUsersToGroupData = (groupId: string, userIds: string[]) =>
  userIds.map(userId => ({
    userId,
    groupId
  }));

export class UserGroupService {
  static Model: any;

  static addUsersToGroup = (
    groupId: string,
    userIds: string[]
  ): Promise<UserGroup[]> => {
    return UserGroupService.Model.bulkCreate(
      generateUsersToGroupData(groupId, userIds)
    );
  };
}

UserGroupService.Model = UserGroupModel;
