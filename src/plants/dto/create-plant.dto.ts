import { IsString, IsArray } from 'class-validator';

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

export class ApiPlantQuickInfo {
  @IsString()
  readonly _id: string;

  @IsString()
  readonly type: PossibleQuickInfo;

  @IsString()
  readonly value: string;

  @IsString()
  readonly description?: string;
}

export class NeighborInfo {
  @IsString()
  readonly _id: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly type: PlantType;

  @IsString()
  readonly preview: string;
}

export class ApiPlantNeighbors {
  readonly companion: NeighborInfo[];
  readonly combative: NeighborInfo[];
}

export class ApiPlantFullInfo {
  @IsString()
  readonly title: string;

  @IsString()
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

  @IsArray()
  readonly gallery: string[];
  readonly quickInfo: ApiPlantQuickInfo[];
  readonly neighbors: ApiPlantNeighbors;
  readonly fullInfo: ApiPlantFullInfo[];
}
