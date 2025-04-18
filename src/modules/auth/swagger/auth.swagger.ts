import { applyDecorators } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

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
    }),
    ApiResponse({ status: 401, description: '잘못된 계정 또는 비밀번호' }),
  );
}
export function AuthRefreshSwagger() {
  return applyDecorators(
    ApiOperation({
      summary: '토큰 갱신',
      description: '리프레시 토큰으로 새로운 토큰을 발행합니다.',
    }),
    ApiResponse({
      status: 200,
      description: '토큰 갱신 성공, accessToken과 refreshToken 반환',
    }),
    ApiResponse({ status: 401, description: '유효하지 않은 리프레시 토큰' }),
    ApiResponse({ status: 403, description: '탈퇴한 사용자' }),
  );
}
