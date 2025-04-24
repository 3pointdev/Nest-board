import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import CommentModel from 'src/modules/comments/models/comment.model';
import { AuthorModel } from 'src/modules/user/models/author.model';

export default class PostModel {
  @Expose({ name: 'id' })
  @ApiProperty({
    description: '게시글 ID',
    example: 1,
  })
  id: number;

  @Expose({ name: 'title' })
  @ApiProperty({
    description: '게시글 제목',
    example: '게시글 제목',
  })
  title: string;

  @Expose({ name: 'content' })
  @ApiProperty({
    description: '게시글 내용',
    example: '게시글 내용',
  })
  content: string;

  @Expose({ name: 'author' })
  @ApiProperty({
    description: '게시글 작성자',
    type: AuthorModel,
    example: new AuthorModel(),
  })
  @Type(() => AuthorModel)
  author: AuthorModel;

  @Expose({ name: 'comments' })
  @ApiProperty({
    description: '게시글 댓글 목록',
    type: CommentModel,
    isArray: true,
    example: [new CommentModel()],
  })
  @Type(() => CommentModel)
  comments: CommentModel[] = [];

  @Expose({ name: 'createdAt' })
  @ApiProperty({
    description: '게시글 생성일',
    example: '2023-10-01T00:00:00.000Z',
  })
  createdAt: string;

  @Expose({ name: 'updatedAt' })
  @ApiProperty({
    description: '게시글 수정일',
    example: '2023-10-01T00:00:00.000Z',
  })
  updatedAt: string;
}
