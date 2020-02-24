import { Group } from "../types/Group";
import { default as GroupModel } from "../database/models/Group";

export class GroupService {
  static get = (id?: string): Promise<Group | undefined> => {
    return id
      ? GroupModel.findOne({
          where: {
            id
          }
        })
      : GroupModel.findAll();
  };

  static add = (group: Omit<Group, "id">): Promise<Group> => {
    return GroupModel.create(group);
  };

  static update = (id: string, data: Partial<Group>): Promise<Group> => {
    return GroupModel.update(data, {
      where: {
        id
      }
    });
  };

  static delete = (id: string): Promise<number> => {
    return GroupModel.destroy({
      where: {
        id
      }
    });
  };
}
