import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NeighborInfo, PlantType } from '../dto/create-plant.dto';

@Schema()
export class Neighbor {
  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: PlantType;

  @Prop({ required: true })
  preview: string;
}

export const NeighborSchema = SchemaFactory.createForClass(Neighbor);

@Schema()
export class PlantNeighbors {
  @Prop({ type: [NeighborSchema], default: [] })
  companion: NeighborInfo[];

  @Prop({ type: [NeighborSchema], default: [] })
  combative: NeighborInfo[];
}

export const PlantNeighborsSchema =
  SchemaFactory.createForClass(PlantNeighbors);
