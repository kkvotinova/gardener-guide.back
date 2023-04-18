import { prop } from '@typegoose/typegoose';
import { PlantType } from './dto/create-plant.dto';

export class PlantQuickInfo {
  @prop({ required: true })
  type: PlantType;

  @prop({ required: true })
  value: string;

  @prop()
  description?: string;
}
