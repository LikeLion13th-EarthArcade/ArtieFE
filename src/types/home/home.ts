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

// AI 추천 전시 응답 타입
export interface IExhibitionResult extends Iexhibition {
    eligible: boolean;
}

// AI 추천 전시 전체 응답 타입
export type TairecommendedResponse = TCommonResponse<IExhibitionResult[]>; //map -> IExhibitionResult[] 참고
