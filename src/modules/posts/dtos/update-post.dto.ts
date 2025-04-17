import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsOptional } from 'class-validator';

export class UpdatePostDto {
  @ApiProperty({
    description: '게시글 제목',
    example: '게시글 제목',
    required: false,
    type: String,
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: '게시글 내용',
    example: '게시글 내용',
    required: false,
    type: String,
    minLength: 10,
  })
  @IsString()
  @MinLength(10)
  @IsOptional()
  content?: string;
}
