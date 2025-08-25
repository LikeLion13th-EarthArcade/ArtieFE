import type { TCommonResponse } from '../common/common';

export type FacilityType = 'RESTROOM' | 'WIFI' | 'STROLLER_RENTAL';
export type MoodType = 'SOLO' | 'DATE' | 'TRENDY' | 'FAMILY';
export type ExhibitionType = 'PERSON' | 'GROUP';
export type CategoryType = 'PAINTING' | 'SCULPTURE_INSTALLATION' | 'CRAFT_DESIGN' | 'PHOTO_MEDIA_ART';

export interface Address {
    roadAddress: string;
    jibunAddress: string;
    postalCode: string;
    detail: string;
}

export interface CreateExhibitionRequest {
    images?: File[];
    homepageUrl: string;
    facility: FacilityType[];
    price: number;
    endDate: string;
    startDate: string;
    address: Address;
    mood: MoodType;
    title: string;
    type: ExhibitionType;
    openingHour: string;
    description: string;
    category: CategoryType;
}

export type CreateExhibitionResponse = TCommonResponse<{
    result: string;
}>;

export interface ExhibitionSearchParams {
    category?: string;
    distinct?: string;
    mood?: string;
    localDate?: string;
    sort?: 'NEW' | 'OLD' | 'POPULAR';
    page?: number;
}

export interface ExhibitionSearchItem {
    exhibitionId: number;
    title: string;
    thumbnail: string;
    startDate: string;
    endDate: string;
    address: string;
    latitude: number;
    longitude: number;
}

export interface ExhibitionSearchResponse {
    items: ExhibitionSearchItem[];
    pageInfo: {
        page: number;
        size: number;
        totalElements: number;
        totalPages: number;
        first: boolean;
        last: boolean;
    };
    map: {
        defaultCenterLat: number;
        defaultCenterLng: number;
    };
}
