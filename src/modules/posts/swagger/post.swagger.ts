import {
  applyDecorators,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { PaginatedResponseDto } from 'src/common/utils/pagination.util';
import { Post } from '../entities/post.entity';

export function PostSwagger() {
  return applyDecorators(ApiTags('게시글'), ApiBearerAuth());
}

export function PostCreateSwagger() {
  return applyDecorators(
    ApiOperation({ summary: '게시글 작성' }),
    ApiResponse({ status: 201, description: '성공', type: Post }),
    ApiResponse({
      status: 400,
      description: '요청 잘못됨',
      example: new BadRequestException('No title or content.'),
      type: BadRequestException,
    }),
    ApiResponse({
      status: 500,
      description: '서버에러',
      example: new InternalServerErrorException(),
      type: InternalServerErrorException,
    }),
  );
}

export function PostFindListSwagger() {
  return applyDecorators(
    ApiOperation({ summary: '게시글 리스트 (페이지네이션)' }),
    ApiResponse({
      status: 200,
      description: '성공',
      type: PaginatedResponseDto<Post>,
    }),
    ApiResponse({
      status: 500,
      description: '서버에러',
      example: new InternalServerErrorException(),
      type: InternalServerErrorException,
    }),
  );
}

export function PostFindOneSwagger() {
  return applyDecorators(
    ApiOperation({ summary: '게시글 조회 (단일)' }),
    ApiParam({ name: 'id', description: '게시글 ID', example: 1 }),
    ApiResponse({
      status: 200,
      description: '성공',
      type: Post,
    }),
    ApiResponse({
      status: 400,
      description: '요청 잘못됨',
      example: new BadRequestException('Id is required.'),
      type: BadRequestException,
    }),
    ApiResponse({
      status: 404,
      description: '게시글 찾지 못함',
      example: new NotFoundException(
        `This post does not exist or has already been deleted.`,
      ),
      type: NotFoundException,
    }),
    ApiResponse({
      status: 500,
      description: '서버에러',
      example: new InternalServerErrorException(),
      type: InternalServerErrorException,
    }),
  );
}

export function PostUpdateSwagger() {
  return applyDecorators(
    ApiOperation({ summary: '게시글 수정' }),
    ApiParam({ name: 'id', description: '게시글 ID', example: 1 }),
    ApiResponse({
      status: 200,
      description: '성공',
      type: Post,
    }),
    ApiResponse({
      status: 400,
      description: '요청 잘못됨',
      example: new BadRequestException('No title or content.'),
      type: BadRequestException,
    }),
    ApiResponse({
      status: 404,
      description: '게시글 찾지 못함',
      example: new NotFoundException(
        `This post does not exist or has already been deleted.`,
      ),
      type: NotFoundException,
    }),
    ApiResponse({
      status: 500,
      description: '서버에러',
      example: new InternalServerErrorException(),
      type: InternalServerErrorException,
    }),
  );
}

export function PostDeleteSwagger() {
  return applyDecorators(
    ApiOperation({ summary: '게시글 삭제' }),
    ApiParam({ name: 'id', description: '게시글 ID', example: 1 }),
    ApiResponse({
      status: 204,
      description: '성공',
    }),
    ApiResponse({
      status: 400,
      description: '요청 잘못됨',
      example: new BadRequestException('Id is required.'),
      type: BadRequestException,
    }),
    ApiResponse({
      status: 404,
      description: '게시글 찾지 못함',
      example: new NotFoundException(
        `This post does not exist or has already been deleted.`,
      ),
      type: NotFoundException,
    }),
    ApiResponse({
      status: 500,
      description: '서버에러',
      example: new InternalServerErrorException(),
      type: InternalServerErrorException,
    }),
  );
}
