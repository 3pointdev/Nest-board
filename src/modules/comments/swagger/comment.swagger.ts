import {
  applyDecorators,
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { ApiParam } from '@nestjs/swagger';
import { PaginatedResponseDto } from 'src/common/utils/pagination.util';
import { Comment } from 'src/modules/comments/entities/comment.entity';

export function CommentSwagger() {
  return applyDecorators(ApiTags('게시글'), ApiBearerAuth());
}

export function CommentCreateSwagger() {
  return applyDecorators(
    ApiOperation({ summary: '댓글 작성' }),
    ApiResponse({
      status: 201,
      description: '성공 (작성한 댓글이 포함된 리스트)',
      type: PaginatedResponseDto<Comment>,
      example: {
        list: [
          {
            id: 1,
            content: '댓글 내용',
            parentId: 1,
            createdAt: '2023-10-01T00:00:00.000Z',
            updatedAt: '2023-10-01T00:00:00.000Z',
          },
        ],
        total: 1,
        page: 1,
        limit: 5,
      },
    }),
    ApiResponse({
      status: 400,
      description: '요청 잘못됨',
      example: new BadRequestException('댓글 내용은 필수입니다.'),
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
export function CommentFindListSwagger() {
  return applyDecorators(
    ApiOperation({ summary: '댓글 리스트 (페이지네이션)' }),
    ApiResponse({
      status: 200,
      description: '성공',
      type: PaginatedResponseDto<Comment>,
      example: {
        list: [
          {
            id: 1,
            content: '댓글 내용',
            parentId: 1,
            createdAt: '2023-10-01T00:00:00.000Z',
            updatedAt: '2023-10-01T00:00:00.000Z',
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

export function CommentUpdateSwagger() {
  return applyDecorators(
    ApiOperation({ summary: '댓글 수정' }),
    ApiParam({
      name: 'parentId',
      description: '소속 된 게시물 ID',
      example: 1,
    }),
    ApiParam({ name: 'id', description: '댓글 ID', example: 1 }),
    ApiResponse({
      status: 200,
      description: '성공',
      type: Comment,
      example: {
        id: 1,
        content: '댓글 내용',
        parentId: 1,
        createdAt: '2023-10-01T00:00:00.000Z',
        updatedAt: '2023-10-01T00:00:00.000Z',
      },
    }),
    ApiResponse({
      status: 400,
      description: '요청 잘못됨',
      example: new BadRequestException('댓글 내용은 필수입니다.'),
      type: BadRequestException,
    }),
    ApiResponse({
      status: 403,
      description: '유저아이디와 작성자아이디가 일치하지 않음',
      example: new ForbiddenException(`댓글 삭제 권한이 없습니다.`),
      type: NotFoundException,
    }),
    ApiResponse({
      status: 404,
      description: '댓글 찾지 못함',
      example: new NotFoundException(
        `댓글이 존재하지 않거나 이미 삭제되었습니다.`,
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
export function CommentDeleteSwagger() {
  return applyDecorators(
    ApiOperation({ summary: '댓글 삭제' }),
    ApiParam({
      name: 'parentId',
      description: '소속 된 게시물 ID',
      example: 1,
    }),
    ApiParam({ name: 'id', description: '댓글 ID', example: 1 }),
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
      description: '댓글 찾지 못함',
      example: new NotFoundException(
        `댓글이 존재하지 않거나 이미 삭제되었습니다.`,
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
