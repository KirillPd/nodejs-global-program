import { UserGroup } from "../types/UserGroup";
import { default as UserGroupModel } from "../database/models/UserGroup";

const generateUsersToGroupData = (groupId: string, userIds: string[]) =>
  userIds.map(userId => ({
    userId,
    groupId
  }));

export class UserGroupService {
  static addUsersToGroup = (
    groupId: string,
    userIds: string[]
  ): Promise<UserGroup[]> => {
    return UserGroupModel.bulkCreate(
      generateUsersToGroupData(groupId, userIds)
    );
  };
}
