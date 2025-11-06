import type { TEmailAuthRequest, TEmailAuthResponse, TModifyAuthRequest, TModifyAuthResponse } from '@/types/auth/auth';
import { axiosInstance } from '../axiosInstance';

export const emailAuthRequest = async ({ email }: { email: string }): Promise<TEmailAuthRequest> => {
    const { data } = await axiosInstance.post('/api/v1/validations/code/sign-up', { email });
    return data;
};

export const emailAuthVerify = async ({ email, code }: { email: string; code: string }): Promise<TEmailAuthResponse> => {
    const { data } = await axiosInstance.post('/api/v1/validations/code/confirmation', { email, code });
    return data;
};

// 매개변수 추가 passwordConfirmation
export const signup = async ({
    email,
    password,
    passwordConfirmation,
    name,
}: {
    email: string;
    password: string;
    passwordConfirmation: string;
    name: string;
}) => {
    const { data } = await axiosInstance.post('/api/v1/users', { email, password, passwordConfirmation, name });
    return data;
};

export const login = async ({ email, password }: { email: string; password: string }) => {
    const { data } = await axiosInstance.post('/api/v1/auth/login', { email, password });
    return data;
};
export const modify = async (data: TModifyAuthRequest): Promise<TModifyAuthResponse> => {
    const response = await axiosInstance.patch('/api/v1/users', data);
    return response.data;
};
