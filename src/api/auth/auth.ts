import { axiosInstance } from '@/api/axiosInstance';
import type { TEmailAuthRequest } from '@/types/auth/auth';

export const emailAuthRequest = async ({ email }: { email: string }): Promise<TEmailAuthRequest> => {
    const { data } = await axiosInstance.post(`/api/v1/auth/send-code?email=${encodeURIComponent(email)}`);
    return data;
};

export const emailAuthVerify = async ({ email, code }: { email: string; code: string }) => {
    const { data } = await axiosInstance.post(`/api/v1/auth/verify-code?email=${encodeURIComponent(email)}&code=${encodeURIComponent(code)}`, {});
    return data;
};

export const signup = async ({ email, password, name }: { email: string; password: string; name: string }) => {
    const { data } = await axiosInstance.post('/api/v1/auth/signup', { email, password, name });
    return data;
};

export const login = async ({ email, password }: { email: string; password: string }) => {
    const { data } = await axiosInstance.post('/api/v1/auth/login', { email, password });
    return data;
};
