import { UserService } from './user';
import SequelizeMock from 'sequelize-mock';

const testUser = {
    "id": "1",
    "name": "John",
    "age": 20,
    "login": "test",
    "password": "root",
    "createdAt": "2020-02-24T17:42:48.824Z",
    "updatedAt": "2020-02-24T18:01:48.779Z"
};

let dbMock;

beforeEach(() => {
    dbMock = new SequelizeMock();
});

describe("User service", () => {  
    it("should get the user", async () => {
        dbMock.define('user', testUser);

        UserService.Model = dbMock.models.user;
        const user = await UserService.getUser('1');
        expect(user.name).toEqual('John');
    })

    it("should add the user", async () => {
        dbMock.define('user');
        
        UserService.Model = dbMock.models.user;
        const user = await UserService.addUser(testUser);
        expect(user.name).toEqual('John');
        expect(user.id).toBeDefined();
        expect(user.isDeleted).toBeDefined();
    })

    // This test doesn't work for some reason
    it("should update the user", async () => {
        dbMock.define('user', testUser);
        
        UserService.Model = dbMock.models.user;
        const [_, [user]] = await UserService.updateUser("1", {name: "Richard"});

        expect(user.name).toEqual('Richard');
    })

    it("should delete the user", async () => {
        dbMock.define('user', testUser);
        
        UserService.Model = dbMock.models.user;
        const [_, [user]] = await UserService.deleteUser(testUser.id);
        expect(user.isDeleted).toBeTruthy();
    })
  }
);