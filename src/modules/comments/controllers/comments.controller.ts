import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  Query,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { CommentDto } from '../dtos/comment.dto';
import { ValidationPipe } from '../../../common/pipes/validation.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Comment } from '../entities/comment.entity';
import { PaginatedResponseDto } from 'src/common/utils/pagination.util';
import { AuthenticatedRequest } from 'src/types/index';

@Controller('posts/:parentId/comments')
@ApiTags('댓글')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: '댓글 작성' })
  @ApiResponse({
    status: 201,
    description: '성공',
    example: { id: 1, content: '생성한 댓글 내용' },
    type: Comment,
  })
  @ApiResponse({
    status: 400,
    description: '요청 잘못됨',
    example: new BadRequestException('No content.'),
    type: BadRequestException,
  })
  @ApiResponse({
    status: 500,
    description: '서버에러',
    example: new InternalServerErrorException(),
    type: InternalServerErrorException,
  })
  create(
    @Req() req: AuthenticatedRequest,
    @Param('parentId') parentId: number,
    @Body() createCommentDto: CommentDto,
  ) {
    const userId = req.user.sub;
    return this.commentsService.create(+parentId, +userId, createCommentDto);
  }

  @Get()
  @ApiOperation({ summary: '댓글 리스트 (페이지네이션)' })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: PaginatedResponseDto<Comment>,
  })
  @ApiResponse({
    status: 400,
    description: '요청 잘못됨',
    example: new BadRequestException('Id is required.'),
    type: BadRequestException,
  })
  @ApiResponse({
    status: 404,
    description: '댓글 찾지 못함',
    example: new NotFoundException(
      `This comment does not exist or has already been deleted.`,
    ),
    type: NotFoundException,
  })
  @ApiResponse({
    status: 500,
    description: '서버에러',
    example: new InternalServerErrorException(),
    type: InternalServerErrorException,
  })
  findAll(
    @Param('parentId') parentId: number,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.commentsService.findAll(+parentId, paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: '댓글 조회 (단일)' })
  @ApiParam({ name: 'parentId', description: '소속 된 게시물 ID', example: 1 })
  @ApiParam({ name: 'id', description: '댓글 ID', example: 1 })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: Comment,
  })
  @ApiResponse({
    status: 400,
    description: '요청 잘못됨',
    example: new BadRequestException('Id is required.'),
    type: BadRequestException,
  })
  @ApiResponse({
    status: 404,
    description: '댓글 찾지 못함',
    example: new NotFoundException(
      `This comment does not exist or has already been deleted.`,
    ),
    type: NotFoundException,
  })
  @ApiResponse({
    status: 500,
    description: '서버에러',
    example: new InternalServerErrorException(),
    type: InternalServerErrorException,
  })
  findOne(@Param('parentId') parentId: number, @Param('id') id: number) {
    return this.commentsService.findOne(+parentId, +id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: '댓글 수정' })
  @ApiParam({ name: 'parentId', description: '소속 된 게시물 ID', example: 1 })
  @ApiParam({ name: 'id', description: '댓글 ID', example: 1 })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: Comment,
  })
  @ApiResponse({
    status: 400,
    description: '요청 잘못됨',
    example: new BadRequestException('No title or content.'),
    type: BadRequestException,
  })
  @ApiResponse({
    status: 404,
    description: '댓글 찾지 못함',
    example: new NotFoundException(
      `This comment does not exist or has already been deleted.`,
    ),
    type: NotFoundException,
  })
  @ApiResponse({
    status: 500,
    description: '서버에러',
    example: new InternalServerErrorException(),
    type: InternalServerErrorException,
  })
  update(
    @Req() req: AuthenticatedRequest,
    @Param('parentId') parentId: number,
    @Param('id') id: number,
    @Body() updateCommentDto: CommentDto,
  ) {
    const userId = req.user.sub;
    return this.commentsService.update(
      +parentId,
      +id,
      +userId,
      updateCommentDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: '댓글 삭제' })
  @ApiParam({ name: 'parentId', description: '소속 된 게시물 ID', example: 1 })
  @ApiParam({ name: 'id', description: '댓글 ID', example: 1 })
  @ApiResponse({
    status: 204,
    description: '성공',
  })
  @ApiResponse({
    status: 400,
    description: '요청 잘못됨',
    example: new BadRequestException('Id is required.'),
    type: BadRequestException,
  })
  @ApiResponse({
    status: 404,
    description: '댓글 찾지 못함',
    example: new NotFoundException(
      `This comment does not exist or has already been deleted.`,
    ),
    type: NotFoundException,
  })
  @ApiResponse({
    status: 500,
    description: '서버에러',
    example: new InternalServerErrorException(),
    type: InternalServerErrorException,
  })
  delete(
    @Req() req: AuthenticatedRequest,
    @Param('parentId') parentId: number,
    @Param('id') id: number,
  ) {
    const userId = req.user.sub;
    return this.commentsService.delete(+parentId, +id, +userId);
  }
}
