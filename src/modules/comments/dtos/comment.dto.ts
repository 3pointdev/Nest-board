import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CommentDto {
  @ApiProperty({
    description: '수정 할 댓글 내용',
    example: '댓글내용 댓글내용',
    required: true,
    type: String,
    minLength: 5,
  })
  @IsString()
  @MinLength(5)
  content: string;
}
