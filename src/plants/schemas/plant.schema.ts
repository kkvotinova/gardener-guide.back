import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {
  ApiPlantFullInfo,
  ApiPlantNeighbors,
  ApiPlantQuickInfo,
  PlantType,
} from '../dto/create-plant.dto';
import { PlantFullInfoSchema } from './plant-fullI-nfo-schema';
import { PlantNeighborsSchema } from './plant-neighbors-schema';
import { PlantQuickInfoSchema } from './plant-quick-info.schema';

export type PlantDocument = HydratedDocument<Plant>;

@Schema()
export class Plant {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: PlantType;

  @Prop({ required: true })
  preview: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  gallery: string[];

  @Prop({ type: [PlantQuickInfoSchema], default: [] })
  quickInfo: ApiPlantQuickInfo[];

  @Prop({ type: PlantNeighborsSchema })
  neighbors: ApiPlantNeighbors;

  @Prop({ type: [PlantFullInfoSchema], default: [] })
  fullInfo: ApiPlantFullInfo[];
}

export const PlantSchema = SchemaFactory.createForClass(Plant);
