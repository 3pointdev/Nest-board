import {
  applyDecorators,
  BadRequestException,
  ForbiddenException,
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
import PostModel from '../models/post.model';
import PostListModel from '../models/postList.model';

export function PostSwagger() {
  return applyDecorators(ApiTags('게시글'), ApiBearerAuth());
}

export function PostCreateSwagger() {
  return applyDecorators(
    ApiOperation({ summary: '게시글 작성' }),
    ApiResponse({
      status: 201,
      description: '성공',
      type: PostModel,
      example: {
        id: 1,
        title: '게시글 제목',
        content: '게시글 내용',
        createdAt: '2023-10-01T00:00:00.000Z',
        updatedAt: '2023-10-01T00:00:00.000Z',
        author: {
          id: 1,
          account: '작성자 계정',
        },
        comments: [
          {
            id: 1,
            content: '댓글 내용',
            parentId: 1,
            createdAt: '2023-10-01T00:00:00.000Z',
            updatedAt: '2023-10-01T00:00:00.000Z',
          },
        ],
      },
    }),
    ApiResponse({
      status: 400,
      description: '요청 잘못됨',
      example: new BadRequestException('제목은 필수 입니다.'),
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
      type: PaginatedResponseDto<PostListModel>,
      example: {
        list: [
          {
            id: 1,
            title: '게시글 제목',
            createdAt: '2023-10-01T00:00:00.000Z',
            updatedAt: '2023-10-01T00:00:00.000Z',
            author: {
              id: 1,
              account: '작성자 계정',
            },
          },
        ],
        total: 10,
        page: 1,
        limit: 5,
      },
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
      type: PostModel,
      example: {
        id: 1,
        title: '게시글 제목',
        content: '게시글 내용',
        createdAt: '2023-10-01T00:00:00.000Z',
        updatedAt: '2023-10-01T00:00:00.000Z',
        author: {
          id: 1,
          account: '작성자 계정',
        },
        comments: [
          {
            id: 1,
            content: '댓글 내용',
            parentId: 1,
            createdAt: '2023-10-01T00:00:00.000Z',
            updatedAt: '2023-10-01T00:00:00.000Z',
          },
        ],
      },
    }),
    ApiResponse({
      status: 400,
      description: '요청 잘못됨',
      example: new BadRequestException('아이디는 필수 입니다.'),
      type: BadRequestException,
    }),
    ApiResponse({
      status: 404,
      description: '게시글 찾지 못함',
      example: new NotFoundException(
        `게시글이 존재하지 않거나 이미 삭제되었습니다.`,
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
      type: PostModel,
      example: {
        id: 1,
        title: '게시글 제목',
        content: '게시글 내용',
        createdAt: '2023-10-01T00:00:00.000Z',
        updatedAt: '2023-10-01T00:00:00.000Z',
        author: {
          id: 1,
          account: '작성자 계정',
        },
        comments: [
          {
            id: 1,
            content: '댓글 내용',
            parentId: 1,
            createdAt: '2023-10-01T00:00:00.000Z',
            updatedAt: '2023-10-01T00:00:00.000Z',
          },
        ],
      },
    }),
    ApiResponse({
      status: 400,
      description: '요청 잘못됨',
      example: new BadRequestException('제목은 필수 입니다.'),
      type: BadRequestException,
    }),
    ApiResponse({
      status: 403,
      description: '유저아이디와 작성자아이디가 일치하지 않음',
      example: new ForbiddenException(`게시글 삭제 권한이 없습니다.`),
      type: NotFoundException,
    }),
    ApiResponse({
      status: 404,
      description: '게시글 찾지 못함',
      example: new NotFoundException(
        `게시글이 존재하지 않거나 이미 삭제되었습니다.`,
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
      example: new BadRequestException('아이디는 필수 입니다.'),
      type: BadRequestException,
    }),
    ApiResponse({
      status: 404,
      description: '게시글 찾지 못함',
      example: new NotFoundException(
        `게시글이 존재하지 않거나 이미 삭제되었습니다.`,
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
