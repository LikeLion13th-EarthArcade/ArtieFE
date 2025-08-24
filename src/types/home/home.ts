import type { TCommonResponse } from '../common/common';

export interface Iexhibition {
    exhibitionId: number;
    title: string;
    description: string;
    thumbnail: string;
    category: string;
    mood: string;
    location: string;
    startDate: string;
    endDate: string;
    reviewAvg: number;
    reviewCount: number;
    isLiked: boolean;
}

export type TexhibitionCard = TCommonResponse<{
    result: Iexhibition[];
}>;
