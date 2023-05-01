import { prop } from '@typegoose/typegoose/lib/prop';
import { Base } from '@typegoose/typegoose/lib/defaultClasses';

export interface NewsFullInfoModel extends Base {}

export class NewsFullInfoModel {
  @prop()
  title?: string;

  @prop()
  preview?: string;

  @prop({ required: true })
  description: string;
}
