import { IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: '계정 아이디 (5자 이상, 영문 또는 숫자)',
    example: 'user123',
  })
  @IsString()
  @MinLength(5)
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: '계정 아이디는 영문 또는 숫자만 포함해야 합니다.',
  })
  account: string;

  @ApiProperty({
    description: '비밀번호 (8자 이상, 영문, 숫자, 특수문자 포함)',
    example: 'Pass123!',
  })
  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]+$/, {
    message: '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.',
  })
  password: string;
}
