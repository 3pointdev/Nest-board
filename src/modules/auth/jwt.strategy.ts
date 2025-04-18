import { Injectable, ForbiddenException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/services/user.service';

export interface JwtPayload {
  sub: number;
  account: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') ?? 'default-secret',
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    const user = await this.userService.findById(payload.sub);
    if (!user) {
      throw new ForbiddenException('탈퇴한 사용자입니다.');
    }
    return payload;
  }
}
