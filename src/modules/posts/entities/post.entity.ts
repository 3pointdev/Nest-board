import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/modules/user/entities/user.entity';
import { Comment } from 'src/modules/comments/entities/comment.entity';

@Entity()
export class Post {
  @ApiProperty({
    description: '게시글 ID',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

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
  @Exclude({ toPlainOnly: true })
  content: string;

  @ManyToOne(() => User, (user) => user.posts, { eager: true })
  author: User;

  @OneToMany(() => Comment, (comment) => comment.parent)
  comments: Comment[];

  @Column({ nullable: true })
  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: false })
  @Exclude()
  isDeleted: boolean;
}
