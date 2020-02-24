import {
  Model,
  Column,
  Table,
  BelongsToMany,
  CreatedAt,
  UpdatedAt,
  Scopes,
  DataType
} from "sequelize-typescript";

import UserGroup from "./usergroup";
import Group from "./group";

@Scopes(() => ({
  groups: {
    include: [
      {
        model: Group,
        through: { attributes: [] }
      }
    ]
  }
}))
@Table
export default class User extends Model<User> {
  @Column(DataType.TEXT)
  name!: string;

  @Column(DataType.NUMBER)
  age!: number;

  @Column(DataType.TEXT)
  login!: string;

  @Column(DataType.TEXT)
  password!: string;

  @Column(DataType.BOOLEAN)
  isDeleted!: boolean;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;

  @BelongsToMany(() => Group, () => UserGroup, "userId")
  groups?: Group[];
}
