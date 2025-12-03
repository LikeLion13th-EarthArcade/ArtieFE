import type { Iexhibition } from '@/types/home/home';
import { axiosInstance } from '../axiosInstance';

export const getartierecommended = async (): Promise<Iexhibition> => {
    const res = await axiosInstance.get<Iexhibition>('/api/v1/exhibitions/artie-recommendation');
    return res.data;
};
export const gethotnow = async (): Promise<Iexhibition> => {
    const res = await axiosInstance.get<Iexhibition>('/api/v1/exhibitions/hot-now');
    return res.data;
};
