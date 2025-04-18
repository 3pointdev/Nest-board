import {
  applyDecorators,
  BadRequestException,
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

export function CommentSwagger() {
  return applyDecorators(ApiTags('게시글'), ApiBearerAuth());
}

export function CommentCreateSwagger() {
  return applyDecorators(
    ApiOperation({ summary: '댓글 작성' }),
    ApiResponse({
      status: 201,
      description: '성공',
      example: { id: 1, content: '생성한 댓글 내용' },
      type: Comment,
    }),
    ApiResponse({
      status: 400,
      description: '요청 잘못됨',
      example: new BadRequestException('No content.'),
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
    }),
    ApiResponse({
      status: 400,
      description: '요청 잘못됨',
      example: new BadRequestException('Id is required.'),
      type: BadRequestException,
    }),
    ApiResponse({
      status: 404,
      description: '댓글 찾지 못함',
      example: new NotFoundException(
        `This comment does not exist or has already been deleted.`,
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
export function CommentFindOneSwagger() {
  return applyDecorators(
    ApiOperation({ summary: '댓글 조회 (단일)' }),
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
    }),
    ApiResponse({
      status: 400,
      description: '요청 잘못됨',
      example: new BadRequestException('Id is required.'),
      type: BadRequestException,
    }),
    ApiResponse({
      status: 404,
      description: '댓글 찾지 못함',
      example: new NotFoundException(
        `This comment does not exist or has already been deleted.`,
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
    }),
    ApiResponse({
      status: 400,
      description: '요청 잘못됨',
      example: new BadRequestException('No title or content.'),
      type: BadRequestException,
    }),
    ApiResponse({
      status: 404,
      description: '댓글 찾지 못함',
      example: new NotFoundException(
        `This comment does not exist or has already been deleted.`,
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
      example: new BadRequestException('Id is required.'),
      type: BadRequestException,
    }),
    ApiResponse({
      status: 404,
      description: '댓글 찾지 못함',
      example: new NotFoundException(
        `This comment does not exist or has already been deleted.`,
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
