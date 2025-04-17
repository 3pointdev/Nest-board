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
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { ValidationPipe } from '../../../common/pipes/validation.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Post as PostEntity } from '../entities/post.entity';
import { PaginatedResponseDto } from 'src/common/utils/pagination.util';

@Controller('posts')
@ApiTags('게시글')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiOperation({ summary: '게시글 작성' })
  @ApiResponse({ status: 201, description: '성공', type: PostEntity })
  @ApiResponse({
    status: 400,
    description: '요청 잘못됨',
    example: new BadRequestException('No title or content.'),
    type: BadRequestException,
  })
  @ApiResponse({
    status: 500,
    description: '서버에러',
    example: new InternalServerErrorException(),
    type: InternalServerErrorException,
  })
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @Get()
  @ApiOperation({ summary: '게시글 리스트 (페이지네이션)' })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: PaginatedResponseDto<PostEntity>,
  })
  @ApiResponse({
    status: 500,
    description: '서버에러',
    example: new InternalServerErrorException(),
    type: InternalServerErrorException,
  })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.postsService.findAll(paginationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: '게시글 조회 (단일)' })
  @ApiParam({ name: 'id', description: '게시글 ID', example: 1 })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: PostEntity,
  })
  @ApiResponse({
    status: 400,
    description: '요청 잘못됨',
    example: new BadRequestException('Id is required.'),
    type: BadRequestException,
  })
  @ApiResponse({
    status: 404,
    description: '게시글 찾지 못함',
    example: new NotFoundException(
      `This post does not exist or has already been deleted.`,
    ),
    type: NotFoundException,
  })
  @ApiResponse({
    status: 500,
    description: '서버에러',
    example: new InternalServerErrorException(),
    type: InternalServerErrorException,
  })
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: '게시글 수정' })
  @ApiParam({ name: 'id', description: '게시글 ID', example: 1 })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: PostEntity,
  })
  @ApiResponse({
    status: 400,
    description: '요청 잘못됨',
    example: new BadRequestException('No title or content.'),
    type: BadRequestException,
  })
  @ApiResponse({
    status: 404,
    description: '게시글 찾지 못함',
    example: new NotFoundException(
      `This post does not exist or has already been deleted.`,
    ),
    type: NotFoundException,
  })
  @ApiResponse({
    status: 500,
    description: '서버에러',
    example: new InternalServerErrorException(),
    type: InternalServerErrorException,
  })
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '게시글 삭제' })
  @ApiParam({ name: 'id', description: '게시글 ID', example: 1 })
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
    description: '게시글 찾지 못함',
    example: new NotFoundException(
      `This post does not exist or has already been deleted.`,
    ),
    type: NotFoundException,
  })
  @ApiResponse({
    status: 500,
    description: '서버에러',
    example: new InternalServerErrorException(),
    type: InternalServerErrorException,
  })
  delete(@Param('id') id: string) {
    return this.postsService.delete(+id);
  }
}
