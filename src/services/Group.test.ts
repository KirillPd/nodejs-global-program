import { GroupService } from './group';
import SequelizeMock from 'sequelize-mock';

const testGroup = {
    "id": 1,
    "name": "admin",
    "permissions": "{READ,WRITE,DELETE}",
    "createdAt": "2020-02-24T17:42:48.824Z",
    "updatedAt": "2020-02-24T18:01:48.779Z"
};

let dbMock;

beforeEach(() => {
    dbMock = new SequelizeMock();
});

describe("Group service", () => {  
    it("should get the group", async () => {
        dbMock.define('group', testGroup);

        GroupService.Model = dbMock.models.group;
        const group = await GroupService.get('1');
        expect(group.name).toEqual('admin');
    })

    it("should add the group", async () => {
        dbMock.define('group');
        
        GroupService.Model = dbMock.models.group;
        const group = await GroupService.add(testGroup);
        expect(group.name).toEqual('admin');
        expect(group.id).toBeDefined();
    })

    it("should update the group", async () => {
        dbMock.define('group', testGroup);
        
        GroupService.Model = dbMock.models.group;
        const [_, [group]] = await GroupService.update("1", {name: "guest"});

        expect(group.name).toEqual('guest');
    })

    it("should delete the group", async () => {
        dbMock.define('group', testGroup);
        
        GroupService.Model = dbMock.models.group;
        const destroyedGroupId = await GroupService.delete(testGroup.id);

        expect(destroyedGroupId).toEqual(testGroup.id);
    })
  }
);