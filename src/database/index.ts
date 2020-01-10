import uuid from "uuid";
import find from "lodash.find";
import findIndex from "lodash.findIndex";
import sortBy from "lodash.sortBy";

import { User } from "../models/User";

interface DataBaseInterface {
  users: User[];
}

export class DataBase implements DataBaseInterface {
  users: User[] = [];

  getUser(id: string): Promise<User | undefined> {
    return Promise.resolve(find(this.users, { id }));
  }

  addUser(user: Omit<User, "id" | "isDeleted">): Promise<string> {
    const id: string = uuid();
    this.users.push({
      ...user,
      id,
      isDeleted: false
    });
    return Promise.resolve(id);
  }

  updateUser(id: string, data: Partial<User>): Promise<User> {
    const usersCopy = this.users.slice();
    const index = findIndex(this.users, { id });
    const user = find(this.users, { id });
    const updatedUser = { ...user, ...data };

    usersCopy.splice(index, 1, updatedUser);

    this.users = usersCopy;

    return Promise.resolve(updatedUser);
  }

  deleteUser(id: string): Promise<boolean> {
    return this.updateUser(id, { isDeleted: true }).then(() => true);
  }

  getAutoSuggestUsers(loginSubstring: string, limit: number): Promise<User[]> {
    return Promise.resolve(
      sortBy(this.users, (user: User) => user.login)
        .filter((user: User) => user.login.indexOf(loginSubstring) > -1)
        .slice(0, limit)
    );
  }
}
