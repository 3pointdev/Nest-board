import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Post } from 'src/modules/posts/entities/post.entity';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Comment {
  @ApiProperty({
    description: '댓글 ID',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: '댓글 내용',
    example: '댓글 내용 댓글 내용',
    type: String,
  })
  @Column()
  content: string;

  @Column({ default: false })
  @Exclude()
  isDeleted?: boolean;

  @ApiProperty({
    description: '댓글이 속한 게시글',
    type: () => Post,
  })
  @ManyToOne(() => Post, (post) => post.comments)
  post?: Post;
}
