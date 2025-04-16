import { IsString, MinLength, IsOptional } from 'class-validator';

export class UpdateCommentDto {
  @IsString()
  @MinLength(5)
  @IsOptional()
  content?: string;
}
