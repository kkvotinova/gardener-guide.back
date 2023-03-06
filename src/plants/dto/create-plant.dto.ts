import { IsString } from 'class-validator';

export enum PlantType {
  vegetable = 'vegetable',
  herb = 'herb',
}

export enum PossibleQuickInfo {
  DEPTH = 'DEPTH',
  SUN = 'SUN',
  WATER = 'WATER',
  SEASON = 'SEASON',
  FROST = 'FROST',
  GERMINATION = 'GERMINATION',
  SPROUT_TO_HARVEST = 'SPROUT_TO_HARVEST',
}

export interface ApiPlantQuickInfo {
  readonly _id: string;
  readonly type: PossibleQuickInfo;
  readonly value: string;
  readonly description?: string;
}

export interface NeighborInfo {
  readonly _id: string;
  readonly name: string;
  readonly type: PlantType;
  readonly preview: string;
}

export interface ApiPlantNeighbors {
  readonly companion: NeighborInfo[];
  readonly combative: NeighborInfo[];
}

export interface ApiPlantFullInfo {
  readonly title: string;
  readonly description: string;
}

export class CreatePlantDto {
  readonly _id: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly type: PlantType;

  @IsString()
  readonly preview: string;

  @IsString()
  readonly description: string;

  readonly gallery: string[];
  readonly quickInfo: ApiPlantQuickInfo[];
  readonly neighbors: ApiPlantNeighbors;
  readonly fullInfo: ApiPlantFullInfo[];
}
