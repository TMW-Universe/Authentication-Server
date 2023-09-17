import { DataTypes } from 'sequelize';
import {
  AllowNull,
  BelongsTo,
  Column,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { OmitIdAndTimestamps } from 'src/types/database/omit-id-and-timestamps.type';
import { OmitTimestamps } from 'src/types/database/omit-timestamps.type';
import { ITimestamps } from 'src/types/database/timestamps.interface';
import { uuid } from 'src/types/generic/uuid.type';
import { UserEntity } from './user.entity';

export interface UserProfileAttributes extends ITimestamps {
  id: uuid;
  userId: uuid;
  name: string;
  firstSurname: string;
  secondSurname: string;
  email: string;

  // Associations
  user?: UserEntity;
}
export interface UserProfileCreateAttributes
  extends OmitIdAndTimestamps<UserProfileAttributes> {}

@Table({
  tableName: 'user_profiles',
  paranoid: true,
  indexes: [
    {
      fields: ['userId'] satisfies (keyof UserProfileAttributes)[],
      unique: true,
    },
  ],
})
export class UserProfileEntity
  extends Model<UserProfileAttributes, UserProfileCreateAttributes>
  implements OmitTimestamps<UserProfileAttributes>
{
  @PrimaryKey
  @Default(DataTypes.UUIDV4)
  @Column(DataTypes.UUID)
  id: uuid;

  @AllowNull(false)
  @Column(DataTypes.STRING(64))
  email: string;

  @AllowNull(false)
  @Column(DataTypes.STRING(32))
  name: string;

  @AllowNull(false)
  @Column(DataTypes.STRING(64))
  firstSurname: string;

  @AllowNull(false)
  @Column(DataTypes.STRING(64))
  secondSurname: string;

  // Associations
  @AllowNull(false)
  @ForeignKey(() => UserEntity)
  @Column(DataTypes.UUID)
  userId: uuid;

  @BelongsTo(() => UserEntity)
  user?: UserEntity;
}