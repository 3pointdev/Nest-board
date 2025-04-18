import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { paginate, PaginatedResponse } from 'src/common/utils/pagination.util';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async create(userId: number, createPostDto: CreatePostDto): Promise<Post> {
    const { title, content } = createPostDto;
    if (!title || !content) {
      throw new BadRequestException(`No title or content.`);
    }

    if (content.length < 10) {
      throw new BadRequestException(`Content must be at least 10 characters.`);
    }

    const post = this.postsRepository.create({
      ...createPostDto,
      authorId: userId,
    });

    const savedPost = this.postsRepository.save(post);
    return savedPost;
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginatedResponse<Post>> {
    return paginate<Post>(this.postsRepository, paginationDto, {
      where: { isDeleted: false },
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postsRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.comments', 'comments')
      .where('post.id = :id', { id })
      .andWhere('post.isDeleted = :isDeleted', { isDeleted: false })
      .andWhere('comments.isDeleted = :commentIsDeleted', {
        commentIsDeleted: false,
      })
      .getOne();

    if (!post) {
      throw new NotFoundException(
        `This post does not exist or has already been deleted.`,
      );
    }

    return post;
  }

  async update(
    id: number,
    userId: number,
    updatePostDto: UpdatePostDto,
  ): Promise<Post> {
    const { title, content } = updatePostDto;
    const post = await this.findOne(id);

    if (post.authorId !== userId) {
      throw new ForbiddenException('게시물을 수정할 권한이 없습니다.');
    }

    if (title && title.length < 5) {
      throw new BadRequestException(`Title must be at least 5 characters.`);
    }

    if (content && content.length < 10) {
      throw new BadRequestException(`Content must be at least 10 characters.`);
    }

    Object.assign(post, updatePostDto);
    return this.postsRepository.save(post);
  }

  async delete(id: number, userId: number): Promise<void> {
    const post = await this.findOne(id);

    if (post.authorId !== userId) {
      throw new ForbiddenException('게시물을 삭제할 권한이 없습니다.');
    }

    await this.postsRepository.update(id, { isDeleted: true });
  }
}
