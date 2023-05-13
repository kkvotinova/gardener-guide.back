import { Type } from 'class-transformer';
import { IsString, IsArray, ValidateNested, IsEnum } from 'class-validator';

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
  @IsEnum(PossibleQuickInfo)
  readonly type: PossibleQuickInfo;

  @IsString()
  readonly value: string;

  @IsString()
  readonly description?: string;
}

export class NeighborInfo {
  @IsString()
  readonly name: string;

  @IsEnum(PlantType)
  readonly type: PlantType;

  @IsString()
  readonly preview: string;
}

export class ApiPlantNeighbors {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NeighborInfo)
  readonly companion: NeighborInfo[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NeighborInfo)
  readonly combative: NeighborInfo[];
}

export class ApiPlantFullInfo {
  @IsString()
  readonly title: string;

  @IsString()
  readonly description: string;
}

export class CreatePlantDto {
  @IsString()
  readonly name: string;

  @IsEnum(PlantType)
  readonly type: PlantType;

  @IsString()
  readonly preview: string;

  @IsString()
  readonly description: string;

  @IsArray()
  readonly gallery: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ApiPlantQuickInfo)
  readonly quickInfo: ApiPlantQuickInfo[];

  readonly neighbors: ApiPlantNeighbors;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ApiPlantFullInfo)
  readonly fullInfo: ApiPlantFullInfo[];
}
