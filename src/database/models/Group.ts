import {
  Model,
  Column,
  Table,
  BelongsToMany,
  CreatedAt,
  UpdatedAt,
  DataType
} from "sequelize-typescript";

import User from "./user";
import UserGroup from "./usergroup";

@Table
export default class Group extends Model<Group> {
  @Column(DataType.TEXT)
  name!: string;

  @Column({ type: DataType.ARRAY(DataType.STRING) })
  permissions!: string[];

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;

  @BelongsToMany(() => User, () => UserGroup, "groupId")
  users?: User[];
}
