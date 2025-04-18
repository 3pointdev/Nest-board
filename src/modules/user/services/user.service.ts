import {
  Injectable,
  ConflictException,
  ForbiddenException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../entities/user.entity';
import { UserDto } from '../dtos/user.dto';
import { JwtPayload } from '../../auth/jwt.strategy';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(account: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { account } });
    if (!user || user.isDeleted) {
      return null; // 탈퇴한 사용자는 null 반환
    }
    if (await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async createUser(
    userDto: UserDto,
  ): Promise<{ user: User; accessToken: string; refreshToken: string }> {
    const { account, password } = userDto;
    const existingUser = await this.userRepository.findOne({
      where: { account },
    });
    if (existingUser) {
      throw new ConflictException('이미 존재하는 계정 아이디입니다.');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      account,
      password: hashedPassword,
    });
    const savedUser = await this.userRepository.save(user);
    const tokens = await this.generateTokens(savedUser);
    return { user: savedUser, ...tokens };
  }

  async deleteUser(userId: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }
    if (user.isDeleted) {
      throw new ForbiddenException('이미 탈퇴한 사용자입니다.');
    }
    user.isDeleted = true;
    user.refreshToken = ''; // 리프레시 토큰 초기화
    await this.userRepository.save(user);
  }

  async generateTokens(
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    if (user.isDeleted) {
      throw new ForbiddenException(
        '탈퇴한 사용자는 토큰을 발행할 수 없습니다.',
      );
    }
    const payload: JwtPayload = { sub: user.id, account: user.account };
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret:
        this.configService.get<string>('JWT_REFRESH_SECRET') ??
        'default-refresh-secret',
      expiresIn: '7d',
    });
    await this.saveRefreshToken(user.id, refreshToken);
    return { accessToken, refreshToken };
  }

  async checkDuplicateAccount(account: string): Promise<boolean> {
    if (!account) throw new BadRequestException('계정 아이디를 입력해주세요.');

    const existingUser = await this.userRepository.findOne({
      where: { account },
    });

    if (existingUser) {
      throw new ConflictException('이미 존재하는 계정 아이디입니다.');
    }

    return true; // 사용자가 없으면 사용 가능
  }

  async saveRefreshToken(userId: number, refreshToken: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user || user.isDeleted) {
      throw new ForbiddenException('유효하지 않은 사용자입니다.');
    }
    await this.userRepository.update(userId, { refreshToken });
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user || user.isDeleted) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    const transformUser = plainToInstance(User, user, {
      excludeExtraneousValues: false,
    });

    return transformUser;
  }

  async validateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user || user.isDeleted || user.refreshToken !== refreshToken) {
      return null;
    }

    return user;
  }
}
