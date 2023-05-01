import { IsString } from 'class-validator';

export class NewsAddCommentDto {
  @IsString()
  description: string;
}
