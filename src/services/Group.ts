import { Group } from "../types/Group";
import { default as GroupModel } from "../database/models/Group";

export class GroupService {
  static Model: any;

  static get = (id?: string): Promise<Group | undefined> => {
    return id
      ? GroupService.Model.findOne({
          where: {
            id
          }
        })
      : GroupService.Model.findAll();
  };

  static add = (group: Omit<Group, "id">): Promise<Group> => {
    return GroupService.Model.create(group);
  };

  static update = (id: string, data: Partial<Group>): Promise<Group> => {
    return GroupService.Model.update(data, {
      where: {
        id
      },
      returning: true
    });
  };

  static delete = (id: string): Promise<number> => {
    return GroupService.Model.destroy({
      where: {
        id
      }
    });
  };
}

GroupService.Model = GroupModel;
