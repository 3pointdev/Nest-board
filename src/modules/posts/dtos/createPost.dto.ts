import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class CreatePostDto {
  @IsString()
  @ApiProperty({
    description: '게시글 제목',
    example: '게시글 제목',
    required: true,
    type: String,
  })
  title: string;

  @IsString()
  @ApiProperty({
    description: '게시글 내용',
    example: '게시글 내용',
    required: true,
    type: String,
  })
  content: string;
}
