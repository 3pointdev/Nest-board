import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Type } from 'class-transformer';
import { AuthorModel } from 'src/modules/user/models/author.model';

export default class CommentModel {
  @Expose({ name: 'id' })
  @ApiProperty({
    description: '댓글 ID',
    example: 1,
  })
  id: number;

  @Expose({ name: 'content' })
  @ApiProperty({
    description: '댓글 내용',
    example: '댓글 내용',
  })
  content: string;

  @Expose({ name: 'author' })
  @Type(() => AuthorModel)
  @ApiProperty({
    description: '댓글 작성자',
    type: AuthorModel,
    example: new AuthorModel(),
  })
  author: AuthorModel;

  @Expose({ name: 'parent' })
  @Transform(({ obj }) => obj.id)
  @ApiProperty({
    description: '부모 댓글 ID',
    example: 1,
  })
  parentId: number;

  @Expose({ name: 'createdAt' })
  @Transform(({ obj }) => obj.createdAt.toISOString())
  @ApiProperty({
    description: '댓글 생성일',
    example: '2023-10-01T00:00:00.000Z',
  })
  createdAt: string;

  @Expose({ name: 'updatedAt' })
  @Transform(({ obj }) => obj.updatedAt.toISOString())
  @ApiProperty({
    description: '댓글 수정일',
    example: '2023-10-01T00:00:00.000Z',
  })
  updatedAt: string;
}
