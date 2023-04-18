import { prop } from '@typegoose/typegoose';
import { PlantType } from './dto/create-plant.dto';

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
