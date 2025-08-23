import type { TCommonResponse } from '../common/common';

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
