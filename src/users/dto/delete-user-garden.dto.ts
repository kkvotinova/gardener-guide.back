import { IsNumber } from 'class-validator';

export class DeleteUserGardenDto {
  @IsNumber()
  plantIndex: number;
}
