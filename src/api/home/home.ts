import type { TexhibitionCard } from '@/types/home/home';
import { axiosInstance } from '../axiosInstance';

export const getartierecommended = async (): Promise<TexhibitionCard> => {
    const res = await axiosInstance.get<TexhibitionCard>('/api/v1/exhibitions/artie-recommendation');
    return res.data;
};
export const gethotnow = async (): Promise<TexhibitionCard> => {
    const res = await axiosInstance.get<TexhibitionCard>('/api/v1/exhibitions/hot-now');
    return res.data;
};
