import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Comment } from '../../comments/entities/comment.entity';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Post {
  @ApiProperty({
    description: '게시글 ID',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: '게시글 작성자 ID',
    example: 1,
  })
  @Column({ nullable: true })
  authorId: number;

  @ApiProperty({
    description: '게시글 제목',
    example: '게시글 제목',
    type: String,
  })
  @Column()
  title: string;

  @ApiProperty({
    description: '게시글 내용',
    example: '게시글 내용 게시글 내용',
    type: String,
  })
  @Column()
  content: string;

  @Column({ default: false })
  @Exclude()
  isDeleted: boolean;

  @ApiProperty({
    description: '게시글 내 댓글 목록',
    type: () => Comment,
    isArray: true,
  })
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];
}
