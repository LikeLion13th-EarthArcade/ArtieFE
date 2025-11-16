import type { getSpaceListResponse, CreateSpaceRequest } from '@/types/spaces/spaces';
import { axiosInstance } from '../axiosInstance';

export interface SpaceListParams {
    location?: string;
    spec?: string;
    purpose?: string;
    concept?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    size?: number;
}

export const getSpaceList = async (params?: SpaceListParams) => {
    const { data } = await axiosInstance.get<getSpaceListResponse>('/api/v1/spaces', {
        params,
    });
    return data;
};

export const createSpace = async (spaceData: CreateSpaceRequest, images: File[]) => {
    const formData = new FormData();

    formData.append('request', new Blob([JSON.stringify({ ...spaceData, images: undefined })], { type: 'application/json' }));

    images.forEach((file) => formData.append('images', file));

    const response = await axiosInstance.post('/api/v1/spaces', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
};
