import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class CreateCommentDto {
  @IsString()
  @ApiProperty({
    description: '댓글 내용',
    example: '댓글 내용',
    required: true,
    type: String,
  })
  content: string;
}
