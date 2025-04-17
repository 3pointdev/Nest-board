import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    description: '게시글 제목',
    example: '게시글 제목',
    required: true,
    type: String,
    minLength: 3,
  })
  @IsString()
  @MinLength(3)
  title: string;

  @ApiProperty({
    description: '게시글 내용',
    example: '게시글 내용',
    required: true,
    type: String,
    minLength: 10,
  })
  @IsString()
  @MinLength(10)
  content: string;
}
