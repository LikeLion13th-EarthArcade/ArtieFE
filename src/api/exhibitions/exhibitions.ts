import { axiosInstance } from '@/api/axiosInstance';
import type { TCommonResponse } from '../../types/common/common';
import type { CreateExhibitionRequest, ExhibitionDetailResponse, ExhibitionSearchParams, ExhibitionSearchResponse } from '@/types/exhibitions/exhibitions';
import type { AxiosResponse } from 'axios';

// 전시 생성
export const createExhibition = async (exhibitionData: CreateExhibitionRequest, images: File[]): Promise<TCommonResponse<string>> => {
    const formData = new FormData();

    formData.append('request', new Blob([JSON.stringify({ ...exhibitionData, images: undefined })], { type: 'application/json' }));

    images.forEach((file) => {
        formData.append('images', file);
    });

    const response = await axiosInstance.post('/api/v1/exhibitions', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};

// 전시 검색
export const searchExhibitions = async (params: ExhibitionSearchParams): Promise<TCommonResponse<ExhibitionSearchResponse>> => {
    const response = await axiosInstance.get('/api/v1/exhibitions/search', {
        params,
    });
    return response.data;
};

export const getExhibitionDetail = async (exhibitionId: number) => {
    const response: AxiosResponse<ExhibitionDetailResponse> = await axiosInstance.get(`/api/v1/exhibitions/${exhibitionId}`);
    return response.data;
};
