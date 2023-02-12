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
  readonly type: PossibleQuickInfo;
  readonly value: string;
  readonly description?: string;
}

export interface NeighborInfo {
  readonly id: string;
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
  private readonly id: string;
  private readonly name: string;
  private readonly type: PlantType;
  private readonly preview: string;
  private readonly description: string;
  private readonly gallery: string[];
  private readonly quickInfo: ApiPlantQuickInfo[];
  private readonly neighbors: ApiPlantNeighbors;
  private readonly fullInfo: ApiPlantFullInfo[];
}
