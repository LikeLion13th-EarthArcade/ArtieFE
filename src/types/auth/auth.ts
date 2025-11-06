import type { TCommonResponse } from '../common/common';

//회원가입 타입
export type TSignupValues = {
    email: string;
    password?: string | null;
    name: string;
};
//회원가입 응답 타입
export type TSignupValuesResponse = TCommonResponse<{
    result: string;
}>;
//로그인 타입
export type TLoginValues = {
    email: string;
    password: string;
};
//로그인 응답 타입
export type TLoginValuesResponse = TCommonResponse<{
    result: {
        userId: number;
        name: string;
        email: string;
    };
}>;
//로그아웃 응답 타입
export type TLogoutResponse = TCommonResponse<{
    result: string;
}>;
//이메일 인증 코드 전송 응답 타입
export type TEmailAuthRequest = TCommonResponse<{
    result: string;
}>;
//이메일 인증 코드 검증 응답 타입
export type TEmailAuthResponse = TCommonResponse<{
    result: string;
}>;

//회원 정보 수정 post 타입
export type TModifyAuthRequest = {
    newName: string;
    currentPassword: string;
    newPassword: string;
    newPasswordConfirmation: string;
};
//회원 정보 수정 응답 타입
export type TModifyAuthResponse = TCommonResponse<{
    result: string;
}>;
