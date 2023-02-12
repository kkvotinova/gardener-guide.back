import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PlantType } from '../dto/create-plant.dto';

@Schema()
export class PlantQuickInfo {
  @Prop({ required: true })
  type: PlantType;

  @Prop({ required: true })
  value: string;

  @Prop()
  description?: string;
}

export const PlantQuickInfoSchema =
  SchemaFactory.createForClass(PlantQuickInfo);
