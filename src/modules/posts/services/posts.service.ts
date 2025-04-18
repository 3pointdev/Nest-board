import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const { title, content } = createPostDto;
    if (!title || !content) {
      throw new NotFoundException(`No title or content.`);
    }

    if (content.length < 10) {
      throw new NotFoundException(`Content must be at least 10 characters.`);
    }

    const post = this.postsRepository.create(createPostDto);

    return this.postsRepository.save(post);
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

  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const { title, content } = updatePostDto;
    if (title && title.length < 5) {
      throw new NotFoundException(`Title must be at least 5 characters.`);
    }

    if (content && content.length < 10) {
      throw new NotFoundException(`Content must be at least 10 characters.`);
    }

    const post = await this.findOne(id);

    Object.assign(post, updatePostDto);
    return this.postsRepository.save(post);
  }

  async delete(id: number): Promise<void> {
    const post = await this.findOne(id);

    await this.postsRepository.update(id, { isDeleted: true });
  }
}
