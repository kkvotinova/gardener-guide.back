import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import { prop } from '@typegoose/typegoose/lib/prop';

export interface PlantFullInfo extends Base {}

export class PlantFullInfo {
  @prop({ required: true })
  title: string;

  @prop({ required: true })
  description: string;
}
