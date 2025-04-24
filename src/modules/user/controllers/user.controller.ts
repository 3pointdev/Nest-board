import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Delete,
  UseGuards,
  Req,
  Get,
  Query,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserDto } from '../dtos/user.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/types';
import { User } from '../entities/user.entity';
import {
  CheckDuplicateAccountSwagger,
  DeleteUserSwagger,
  FindMeSwagger,
  RegisterSwagger,
} from '../swagger/user.swagger';
import { TokenModel } from 'src/common/models/token.model';

@ApiTags('사용자')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @RegisterSwagger()
  async register(@Body() userDto: UserDto): Promise<TokenModel> {
    const { accessToken, refreshToken } =
      await this.userService.createUser(userDto);
    return { accessToken, refreshToken };
  }

  @Get('duplicate/account')
  @HttpCode(HttpStatus.OK)
  @CheckDuplicateAccountSwagger()
  async checkDuplicateAccount(
    @Query() params: { account: string },
  ): Promise<{ result: boolean }> {
    const result = await this.userService.checkDuplicateAccount(params.account);
    return { result };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @FindMeSwagger()
  async findMe(@Req() req: AuthenticatedRequest): Promise<User> {
    const user = await this.userService.findById(req.user.sub);

    return user;
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @DeleteUserSwagger()
  async delete(@Req() req: AuthenticatedRequest): Promise<void> {
    const userId = req.user.sub;
    await this.userService.deleteUser(userId);
  }
}
