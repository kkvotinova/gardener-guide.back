import { prop } from '@typegoose/typegoose/lib/prop';
import { PossibleQuickInfo } from './dto/create-plant.dto';
import { Base } from '@typegoose/typegoose/lib/defaultClasses';

export interface PlantQuickInfo extends Base {}

export class PlantQuickInfo {
  @prop({ required: true })
  type: PossibleQuickInfo;

  @prop({ required: true })
  value: string;

  @prop()
  description?: string;
}
