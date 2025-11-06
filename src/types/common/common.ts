import type { AxiosError } from 'axios';

export type TCommonResponse<T> = {
    isSuccess: boolean;
    code: string;
    message: string;
    result: T;
}; //응답 type 정의

export type TResponseError = AxiosError<{
    statusCode: number;
    success: boolean;
    message: string;
}>;
