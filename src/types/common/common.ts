import type { AxiosError } from 'axios';
import type { Iexhibition } from '../home/home';

export type TCommonResponse<T> = {
    res: Iexhibition;
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
