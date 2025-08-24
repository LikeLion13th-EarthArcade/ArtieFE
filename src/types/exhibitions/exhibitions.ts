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
