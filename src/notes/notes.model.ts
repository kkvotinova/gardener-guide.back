import { prop } from '@typegoose/typegoose';
import { Base } from '@typegoose/typegoose/lib/defaultClasses';

export interface NotesModel extends Base {}

export class NotesModel {
  @prop()
  title: string;

  @prop()
  userId: string;

  @prop()
  description: string;
}
