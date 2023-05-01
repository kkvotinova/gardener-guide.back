import { prop } from '@typegoose/typegoose/lib/prop';

export class PlantFullInfo {
  @prop({ required: true })
  title: string;

  @prop({ required: true })
  description: string;
}
