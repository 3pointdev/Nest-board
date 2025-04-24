import {
  applyDecorators,
  BadRequestException,
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

export function AuthSwagger() {
  return applyDecorators(ApiTags('인증'));
}

export function AuthLoginSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '로그인',
      description: '계정 아이디와 비밀번호로 로그인하여 토큰을 발행합니다.',
    }),
    ApiResponse({
      status: 200,
      description: '로그인 성공, accessToken과 refreshToken 반환',
      example: {
        accessToken: 'alsdkjvhfadlkvjhalkfvdhlakd',
        refreshToken: 'asdjhcvlavhladfkhvdfaklvhdafklvh',
      },
    }),
    ApiResponse({
      status: 400,
      description: '파라미터 잘못됨',
      example: new BadRequestException('계정 아이디는 필수입니다.'),
    }),
    ApiResponse({
      status: 404,
      description: '로그인 정보 잘못됨 또는 일치하는 계정 없음',
      example: new NotFoundException('아이디 또는 비밀번호가 잘못되었습니다.'),
    }),
    ApiResponse({
      status: 500,
      description: '서버 오류',
      example: new InternalServerErrorException(),
    }),
  );
}
export function AuthRefreshSwagger() {
  return applyDecorators(
    ApiBody({
      description: '리프레시 토큰',
      required: true,
      schema: {
        example: {
          refreshToken:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImFjY291bnQiOiJ1c2VyMTIzNCIsImlhdCI6MTc0NTMwMTYxOSwiZXhwIjoxNzQ1OTA2NDE5fQ.3LIX6I5002AWxm4vZWqujkwyVFkrIkA_w-GV4nA8uZg',
        },
      },
    }),
    ApiOperation({
      summary: '토큰 갱신',
      description: '리프레시 토큰으로 새로운 토큰을 발행합니다.',
    }),
    ApiResponse({
      status: 200,
      description: '토큰 갱신 성공, accessToken과 refreshToken 반환',
      example: {
        accessToken: 'alsdkjvhfadlkvjhalkfvdhlakd',
        refreshToken: 'asdjhcvlavhladfkhvdfaklvhdafklvh',
      },
    }),
    ApiResponse({
      status: 401,
      description: '유효하지 않은 토큰',
      example: new UnauthorizedException('인증정보가 유효하지 않습니다.'),
    }),
    ApiResponse({
      status: 403,
      description: '탈퇴한 사용자',
      example: new ForbiddenException('계정이 없거나 탈퇴한 사용자입니다.'),
    }),
    ApiResponse({
      status: 500,
      description: '서버 오류',
      example: new InternalServerErrorException(),
    }),
  );
}
