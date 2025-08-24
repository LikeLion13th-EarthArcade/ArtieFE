import type { getSpaceListResponse, CreateSpaceRequest } from '@/types/spaces/spaces';
import { axiosInstance } from '../axiosInstance';

export const getSpaceList = async () => {
    const data = await axiosInstance.get<getSpaceListResponse>('/api/v1/spaces');
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
