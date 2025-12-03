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

    title: string;
    description: string;

    startDate: string;
    endDate: string;

    openingTime: string;
    closingTime: string;

    exhibitionCategory: CategoryType;
    exhibitionType: ExhibitionType;
    exhibitionMood: MoodType;

    price: number;

    facilities: FacilityType[];

    operatingInfo: string;

    homepageUrl: string;

    address: Address;
}

export type CreateExhibitionResponse = TCommonResponse<{
    result: string;
}>;

export type TExhibitonLikedResponse = TCommonResponse<{
    result: {
        exhibition: number;
        message: string;
    };
}>;

export interface ExhibitionSearchParams {
    category?: CategoryType;
    distinct?: string;
    mood?: MoodType;
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

export interface ExhibitionSearchPage {
    content: ExhibitionSearchItem[];
    last: boolean;
    pageNumber: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
}

export interface ExhibitionSearchResponse {
    map: {
        defaultCenterLat: number;
        defaultCenterLng: number;
    };
    page: ExhibitionSearchPage;
}

export interface Review {
    reviewId: number;
    rating: number;
    content: string;
    imageUrls: string[];
    createdAt: string;
    userName: string;
}

export interface ExhibitionDetail {
    exhibitionId: number;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    openingTime: string;
    operatingInfo: string;
    imageUrls: string[];
    WebsiteUrl: string;
    address: string;
    latitude: number;
    longitude: number;
    exhibitionCategory: 'PAINTING' | 'SCULPTURE_INSTALLATION' | 'CRAFT_DESIGN' | 'PHOTO_MEDIA_ART' | string;
    exhibitionType: 'PERSON' | 'GROUP' | string;
    exhibitionMood: 'SOLO' | 'DATE' | 'FAMILY' | 'TRENDY' | string;
    price: number;
    facilities: string[];
    liked: boolean;
}

export type ExhibitionDetailResponse = TCommonResponse<ExhibitionDetail>;
