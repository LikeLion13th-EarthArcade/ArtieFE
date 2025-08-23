import type { getSpaceListResponse } from '@/types/spaces/spaces';
import { axiosInstance } from '../axiosInstance';

export const getSpaceList = async () => {
    const data = await axiosInstance.get<getSpaceListResponse>('/api/v1/spaces');
    return data;
};
