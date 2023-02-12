import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class PlantFullInfo {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;
}

export const PlantFullInfoSchema = SchemaFactory.createForClass(PlantFullInfo);
