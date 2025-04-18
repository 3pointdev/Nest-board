import { IsString, Matches, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: '계정 아이디 (영문 또는 숫자)',
    example: 'user123',
  })
  @IsString()
  @MinLength(5, { message: '계정 아이디는 최소 5자 이상이어야 합니다.' })
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: '계정 아이디는 영문 또는 숫자만 포함해야 합니다.',
  })
  account: string;

  @ApiProperty({
    description: '비밀번호 (영문, 숫자, 특수문자 포함)',
    example: 'Pass123!',
  })
  @IsString()
  @MinLength(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
  @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/, {
    message: '비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다.',
  })
  password: string;
}
