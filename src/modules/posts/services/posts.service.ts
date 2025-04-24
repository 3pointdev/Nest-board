import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Comment } from 'src/modules/comments/entities/comment.entity';
import { plainToInstance } from 'class-transformer';
import PostModel from '../models/post.model';
import { paginate, PaginatedResponse } from 'src/common/utils/pagination.util';
import PostListModel from '../models/postList.model';
import CreatePostDto from '../dtos/createPost.dto';
import { User } from 'src/modules/user/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,

    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(
    userId: number,
    { title, content }: CreatePostDto,
  ): Promise<any> {
    if (!title) {
      throw new BadRequestException('제목은 필수 입니다.');
    }
    if (!content) {
      throw new BadRequestException('내용은 필수 입니다.');
    }

    const user = await this.userRepository.findOne({
      where: {
        id: userId,
        isDeleted: false,
      },
    });

    if (!user) {
      throw new NotFoundException(
        '탈퇴한 사용자 이거나 잘못된 사용자의 접근입니다.',
      );
    }

    const post = this.postRepository.create({
      title,
      content,
      author: user,
    });

    const response = await this.postRepository.save(post);

    return plainToInstance(PostModel, response, {
      excludeExtraneousValues: true,
    });
  }

  async findAll(
    paginationDto: PaginationDto,
  ): Promise<PaginatedResponse<PostListModel>> {
    const pagination = await paginate(this.postRepository, paginationDto);

    const response = {
      ...pagination,
      list: pagination.list.map((post) =>
        plainToInstance(PostListModel, post, {
          excludeExtraneousValues: true,
        }),
      ),
    };

    return response;
  }

  async findOne(id: number): Promise<PostModel> {
    if (!id) {
      throw new BadRequestException('아이디는 필수 입니다.');
    }

    const post = await this.postRepository.findOne({
      where: {
        id: id,
        isDeleted: false,
      },
      relations: ['author'],
    });

    if (!post) {
      throw new NotFoundException(
        '게시글이 존재하지 않거나 이미 삭제되었습니다.',
      );
    }

    const comments = await this.commentRepository.find({
      where: {
        parent: { id: id },
        isDeleted: false,
      },
      relations: ['author', 'parent'],
    });

    return plainToInstance(
      PostModel,
      { ...post, comments: comments },
      {
        excludeExtraneousValues: true,
      },
    );
  }

  async update(
    id: number,
    userId: number,
    { title, content }: CreatePostDto,
  ): Promise<any> {
    if (!title) {
      throw new BadRequestException('제목은 필수 입니다.');
    }

    if (!content) {
      throw new BadRequestException('내용은 필수 입니다.');
    }

    const user = await this.userRepository.findOne({
      where: {
        id: userId,
        isDeleted: false,
      },
    });

    if (!user) {
      throw new ForbiddenException(
        '탈퇴한 사용자 이거나 잘못된 사용자의 접근입니다.',
      );
    }

    const post = await this.postRepository.findOne({
      where: {
        id: id,
        isDeleted: false,
      },
      relations: ['author', 'comments'],
    });

    if (!post) {
      throw new NotFoundException('게시글이 존재하지 않거나 삭제되었습니다.');
    }

    if (post.author.id !== userId) {
      throw new ForbiddenException('게시글 수정 권한이 없습니다.');
    }

    const updatedPost = await this.postRepository.save({
      ...post,
      title,
      content,
    });

    return plainToInstance(PostModel, updatedPost, {
      excludeExtraneousValues: true,
    });
  }

  async delete(id: number, userId: number): Promise<void> {
    if (!id) {
      throw new BadRequestException('아이디는 필수 입니다.');
    }

    const user = await this.userRepository.findOne({
      where: {
        id: userId,
        isDeleted: false,
      },
    });

    if (!user) {
      throw new ForbiddenException(
        '탈퇴한 사용자 이거나 잘못된 사용자의 접근입니다.',
      );
    }

    const post = await this.postRepository.findOne({
      where: {
        id: id,
        isDeleted: false,
      },
      relations: ['author'],
    });

    if (!post) {
      throw new NotFoundException(
        '게시글이 존재하지 않거나 이미 삭제되었습니다.',
      );
    }

    if (post.author.id !== userId) {
      throw new ForbiddenException('게시글 삭제 권한이 없습니다.');
    }

    await this.postRepository.save({
      ...post,
      isDeleted: true,
    });

    return;
  }
}
