import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/login.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('인증')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: '로그인',
    description: '계정 아이디와 비밀번호로 로그인하여 토큰을 발행합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '로그인 성공, accessToken과 refreshToken 반환',
  })
  @ApiResponse({ status: 401, description: '잘못된 계정 또는 비밀번호' })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authService.login(loginDto);
  }

  @ApiOperation({
    summary: '토큰 갱신',
    description: '리프레시 토큰으로 새로운 토큰을 발행합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '토큰 갱신 성공, accessToken과 refreshToken 반환',
  })
  @ApiResponse({ status: 401, description: '유효하지 않은 리프레시 토큰' })
  @ApiResponse({ status: 403, description: '탈퇴한 사용자' })
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Body('refreshToken') refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authService.refreshToken(refreshToken);
  }
}
