import { prop } from '@typegoose/typegoose/lib/prop';
import { PlantType } from './dto/create-plant.dto';
import { Base } from '@typegoose/typegoose/lib/defaultClasses';

export interface Neighbor extends Base {}

export class Neighbor {
  @prop({ required: true })
  name: string;

  @prop({ required: true })
  type: PlantType;

  @prop({ required: true })
  preview: string;
}

export class PlantNeighbors {
  @prop()
  companion: Neighbor[];

  @prop()
  combative: Neighbor[];
}
