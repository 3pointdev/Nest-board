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
  UseGuards,
  Req,
} from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { ValidationPipe } from '../../../common/pipes/validation.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Post as PostEntity } from '../entities/post.entity';
import { PaginatedResponseDto } from 'src/common/utils/pagination.util';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/types/index';

@Controller('posts')
@ApiTags('게시글')
@UseGuards(JwtAuthGuard) // 모든 엔드포인트에 JWT 인증 적용
@ApiBearerAuth() // Swagger에 Bearer 토큰 요구 표시
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
  async create(
    @Req() req: AuthenticatedRequest,
    @Body() createPostDto: CreatePostDto,
  ) {
    const userId = req.user.sub;
    return this.postsService.create(userId, createPostDto);
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
  update(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    const userId = req.user.sub;
    return this.postsService.update(+id, userId, updatePostDto);
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
  delete(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    const userId = req.user.sub;
    return this.postsService.delete(+id, userId);
  }
}
