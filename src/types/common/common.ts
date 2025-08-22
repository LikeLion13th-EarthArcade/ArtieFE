import type { AxiosError } from 'axios';

export type TCommonResponse<T> = {
    isSuccess: boolean;
    code: string;
    message: string;
    result: T;
    success: boolean;
};

export type TResponseError = AxiosError<{
    statusCode: number;
    success: boolean;
    message: string;
}>;
