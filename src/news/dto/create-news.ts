import { Type } from 'class-transformer';
import { IsString, IsArray, ValidateNested, IsOptional } from 'class-validator';

export class CreateNewsFullInfoDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  preview?: string;

  @IsString()
  description: string;
}

export class CreateNewsDto {
  @IsString()
  title: string;

  @IsString()
  preview: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateNewsFullInfoDto)
  fullInfo: CreateNewsFullInfoDto[];
}
