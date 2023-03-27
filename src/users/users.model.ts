import { prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export interface UsersModel extends Base {}

export class UsersModel extends TimeStamps {
  @prop({ unique: true })
  email: string;

  @prop()
  password: string;
}
