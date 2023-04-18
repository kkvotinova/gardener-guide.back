import { prop } from '@typegoose/typegoose';

export class PlantFullInfo {
  @prop({ required: true })
  title: string;

  @prop({ required: true })
  description: string;
}
