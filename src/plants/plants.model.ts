import { prop } from '@typegoose/typegoose/lib/prop';
import { Base } from '@typegoose/typegoose/lib/defaultClasses';
import { PlantType } from './dto/create-plant.dto';
import { PlantQuickInfo } from './plant.quick-info.model';
import { PlantNeighbors } from './plant.quick-neighbors.model';
import { PlantFullInfo } from './plant.quick-full-info.model';

export interface PlantsModel extends Base {}

export class PlantsModel {
  @prop({ required: true })
  name: string;

  @prop({ required: true })
  type: PlantType;

  @prop({ required: true })
  preview: string;

  @prop({ required: true })
  description: string;

  @prop({ required: true })
  gallery: string[];

  @prop()
  quickInfo: PlantQuickInfo[];

  @prop()
  neighbors: PlantNeighbors;

  @prop()
  fullInfo: PlantFullInfo[];

  @prop()
  videoId?: string;
}
