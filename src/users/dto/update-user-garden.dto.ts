import { IsNumber, IsString } from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';
import { PlantType } from 'src/plants/dto/create-plant.dto';

export class UpdateUserGardenDto {
  @IsNumber()
  plantIndex: number;

  @IsObjectId()
  plantId: string;

  @IsString()
  plantType: PlantType;
}
