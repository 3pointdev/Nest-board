import { IsString, MinLength, IsOptional } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  @MinLength(3)
  @IsOptional()
  title?: string;

  @IsString()
  @MinLength(10)
  @IsOptional()
  content?: string;
}
