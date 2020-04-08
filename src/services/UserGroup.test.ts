import { UserGroupService } from './UserGroup';
import SequelizeMock from 'sequelize-mock';

let dbMock;

beforeEach(() => {
    dbMock = new SequelizeMock();
});

describe("User group service", () => {  
    it("should get the user", async () => {
        dbMock.define('userGroup', {});

        UserGroupService.Model = dbMock.models.userGroup;
        const [userGroup1, userGroup2] = await UserGroupService.addUsersToGroup("1", ["2", "3"]);

        expect(userGroup1.dataValues.groupId).toEqual("1");
        expect(userGroup1.dataValues.userId).toEqual("2");

        expect(userGroup2.dataValues.groupId).toEqual("1");
        expect(userGroup2.dataValues.userId).toEqual("3");
    })
});