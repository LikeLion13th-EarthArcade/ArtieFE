import type { TCommonResponse } from '../common/common';

export type SpaceType = 'EXHIBITION' | 'POPUP_STORE' | 'EXPERIENCE_EXHIBITION';
export type SpaceMoodType = 'WHITE_BOX' | 'INDUSTRIAL' | 'VINTAGE_CLASSIC' | 'NATURAL_LIGHT' | 'FOCUSED_LIGHTING';
export type SpacePurposeType = 'INDIVIDUAL' | 'CORPORATE';
export type FacilityType = 'WIFI' | 'RESTROOM' | 'LOUNGE' | 'PARKING' | 'ELEVATOR' | 'WHEELCHAIR';
export type SpaceSize = 'SMALL' | 'MEDIUM_SMALL' | 'MEDIUM' | 'LARGE';

export interface SpaceAddress {
    roadAddress: string;
    jibunAddress?: string;
    postalCode?: string;
    detail?: string;
}

export interface CreateSpaceRequest {
    name: string;
    description: string;
    type: SpaceType;
    mood: SpaceMoodType;
    size?: string;
    startDate?: string;
    endDate?: string;
    location?: string;
    address: SpaceAddress;
    purpose?: SpacePurposeType;
    facility?: FacilityType[];
    phoneNumber?: string;
    email?: string;
    website?: string;
    sns?: string;
    startTime?: string;
    endTime?: string;
}

export type CreateSpaceResponse = TCommonResponse<{
    result: string;
}>;

export interface ISpace {
    id: number;
    name: string;
    address: string;
    startDate: string;
    endDate: string;
}

export type getSpaceListResponse = TCommonResponse<{
    result: ISpace[];
}>;
