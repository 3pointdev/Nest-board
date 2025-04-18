import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/user/services/user.service';
import { LoginDto } from '../dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    loginDto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { account, password } = loginDto;
    const user = await this.userService.validateUser(account, password);
    if (!user) {
      throw new UnauthorizedException('잘못된 계정 또는 비밀번호입니다.');
    }
    return this.userService.generateTokens(user);
  }

  async refreshToken(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET ?? 'default-refresh-secret',
      });
      const user = await this.userService.validateRefreshToken(
        payload.sub,
        refreshToken,
      );
      if (!user) {
        throw new UnauthorizedException('유효하지 않은 리프레시 토큰입니다.');
      }
      return this.userService.generateTokens(user);
    } catch {
      throw new UnauthorizedException('유효하지 않은 리프레시 토큰입니다.');
    }
  }
}
