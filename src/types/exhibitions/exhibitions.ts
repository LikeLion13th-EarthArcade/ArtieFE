export type TAddress = {
    roadAddress: string;
    jibunAddress: string;
    postalCode: string;
    detail: string;
};

export type TExhibition = {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    openingHour: string;
    homePageUrl: string;
    category: string;
    type: string;
    mood: string;
    price: number;
    facility: string[];
    address: TAddress[];
    organizer?: string;
    contactEmail?: string;
    websiteUrl?: string;
    imageUrl?: string;
    tags?: string[];
};
