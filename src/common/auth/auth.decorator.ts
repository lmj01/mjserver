import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublicKey';
// 不需要auth的api
export const AuthPublic = () => SetMetadata(IS_PUBLIC_KEY, true);
