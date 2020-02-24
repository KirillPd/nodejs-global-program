import {
  Model,
  Column,
  Table,
  ForeignKey,
  CreatedAt,
  UpdatedAt, DataType,
} from "sequelize-typescript";

import User from "./user";
import Group from "./group";

@Table
export default class UserGroup extends Model<UserGroup> {
  @ForeignKey(() => User)
  @Column(DataType.NUMBER)
  userId!: number;

  @ForeignKey(() => Group)
  @Column(DataType.NUMBER)
  groupId!: number;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;
}
