import { useEffect, useState } from 'react';
import type { AxiosError } from 'axios';
import type { Address } from 'react-daum-postcode';

import { createExhibition } from '@/api/exhibitions/exhibitions';
import type { CreateExhibitionRequest, CategoryType, MoodType, FacilityType, ExhibitionType } from '@/types/exhibitions/exhibitions';

const CATEGORY_MAP: Record<string, CategoryType> = {
    '회화': 'PAINTING',
    '조각·설치': 'SCULPTURE_INSTALLATION',
    '공예·디자인': 'CRAFT_DESIGN',
    '사진·미디어 아트': 'PHOTO_MEDIA_ART',
};

const MOOD_MAP: Record<string, MoodType> = {
    '혼자 보기 좋은': 'SOLO',
    '데이트 하기 좋은': 'DATE',
    '트렌디한 MZ 감성이 있는': 'TRENDY',
    '가족과 즐기기 좋은': 'FAMILY',
};

const FACILITY_MAP: Record<string, FacilityType> = {
    wifi: 'WIFI',
    restroom: 'RESTROOM',
    stroller: 'STROLLER_RENTAL',
};

export const TIME_OPTIONS = Array.from({ length: 48 }, (_, i) => {
    const hours = String(Math.floor(i / 2)).padStart(2, '0');
    const minutes = i % 2 === 0 ? '00' : '30';
    return `${hours}:${minutes}`;
});

const DAY_OFF_LABELS = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];

const timeToMinutes = (time: string) => {
    const [h, m] = time.split(':').map(Number);
    return h * 60 + m;
};

export type FacilitiesState = {
    wifi: boolean;
    restroom: boolean;
    stroller: boolean;
};

export type SelectedValuesState = {
    type: string;
    form: string;
    mood: string;
    priceOption: string;
    price: string;
    link: string;
    startTime: string;
    endTime: string;
    dayOff: string[];
    holidayClosed: boolean;
    postalCode: string;
};

type PrevSelectedValues = {
    type?: string;
    form?: string;
    mood?: string;
    priceOption?: string;
    price?: string;
    link?: string;
    startTime?: string;
    endTime?: string;
    dayOff?: string[];
    holidayClosed?: boolean;
    postalCode?: string;
    facilities?: string[];
};

type PrevData = {
    title?: string;
    description?: string;
    imageFiles?: File[];
    startDate?: string;
    endDate?: string;
    address?: string;
    detailAddress?: string;
    selectedValues?: PrevSelectedValues;
};

interface UseExhibitionFormParams {
    prevData?: PrevData;
}

export function useExhibitionForm({ prevData }: UseExhibitionFormParams) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

    const [facilities, setFacilities] = useState<FacilitiesState>({
        wifi: false,
        restroom: false,
        stroller: false,
    });

    const [openId, setOpenId] = useState('');
    const [step, setStep] = useState<0 | 1 | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [selectedValues, setSelectedValues] = useState<SelectedValuesState>({
        type: '',
        form: '',
        mood: '',
        priceOption: '',
        price: '',
        link: '',
        startTime: '',
        endTime: '',
        dayOff: [],
        holidayClosed: false,
        postalCode: '',
    });

    useEffect(() => {
        if (!prevData) return;

        setTitle(prevData.title ?? '');
        setDescription(prevData.description ?? '');
        setImageFiles(prevData.imageFiles ?? []);
        setStartDate(prevData.startDate ?? '');
        setEndDate(prevData.endDate ?? '');
        setAddress(prevData.address ?? '');
        setDetailAddress(prevData.detailAddress ?? '');

        setSelectedValues((prev) => ({
            ...prev,
            ...(prevData.selectedValues ?? {}),
            dayOff: Array.isArray(prevData.selectedValues?.dayOff) ? prevData.selectedValues.dayOff : [],
        }));

        if (prevData.selectedValues?.facilities) {
            const selectedFacilities: string[] = prevData.selectedValues.facilities;
            setFacilities({
                wifi: selectedFacilities.includes('와이파이'),
                restroom: selectedFacilities.includes('화장실'),
                stroller: selectedFacilities.includes('유모차 대여'),
            });
        }
    }, [prevData]);

    // dropdown
    const handleToggleDropdown = (id: string) => {
        setOpenId((prev) => (prev === id ? '' : id));
    };

    // 시설
    const handleFacilityChange = (facilityKey: keyof FacilitiesState) => {
        setFacilities((prev) => ({
            ...prev,
            [facilityKey]: !prev[facilityKey],
        }));
    };

    // 요일
    const handleDayOffChange = (day: string, checked: boolean) => {
        setSelectedValues((prev) => {
            const next = checked ? [...prev.dayOff, day] : prev.dayOff.filter((d) => d !== day);
            return { ...prev, dayOff: next };
        });
    };

    const handleHolidayClosedChange = (checked: boolean) => {
        setSelectedValues((prev) => ({ ...prev, holidayClosed: checked }));
    };

    // 시간
    const handleStartTimeChange = (value: string) => {
        setSelectedValues((prev) => {
            if (prev.endTime && timeToMinutes(prev.endTime) < timeToMinutes(value)) {
                return { ...prev, startTime: value, endTime: '' };
            }
            return { ...prev, startTime: value };
        });
    };

    const handleEndTimeChange = (value: string) => {
        setSelectedValues((prev) => {
            if (!prev.startTime || timeToMinutes(value) >= timeToMinutes(prev.startTime)) {
                return { ...prev, endTime: value };
            }
            alert('종료 시간은 시작 시간 이후여야 합니다!');
            return prev;
        });
    };

    // 주소
    const handleCompleteAddress = (data: Address) => {
        setAddress(data.address);
        setSelectedValues((prev) => ({
            ...prev,
            postalCode: data.zonecode,
        }));
        setIsPostcodeOpen(false);
    };

    const togglePostcode = (open: boolean) => setIsPostcodeOpen(open);

    // 가격/링크
    const handlePriceOptionChange = (value: string) => {
        setSelectedValues((prev) => ({
            ...prev,
            priceOption: value,
            price: value === '무료' ? '' : prev.price,
        }));
    };

    const handlePriceChange = (value: string) => {
        setSelectedValues((prev) => ({ ...prev, price: value }));
    };

    const handleLinkChange = (value: string) => {
        setSelectedValues((prev) => ({ ...prev, link: value }));
    };

    // 옵션 생성
    const timeOptions = TIME_OPTIONS;

    const dayOffOptions = DAY_OFF_LABELS.map((day) => ({
        value: day,
        label: day,
        checked: selectedValues.dayOff.includes(day),
    }));

    const facilityOptions = [
        { label: '와이파이', value: 'wifi', checked: facilities.wifi },
        { label: '화장실', value: 'restroom', checked: facilities.restroom },
        { label: '유모차 대여', value: 'stroller', checked: facilities.stroller },
    ];

    // 유효성 검사
    const validateForm = () => {
        if (!title.trim()) return (alert('전시 제목을 입력해주세요.'), false);
        if (!description.trim()) return (alert('전시 설명을 입력해주세요.'), false);
        if (imageFiles.length === 0) return (alert('대표 이미지를 최소 1장 등록해주세요.'), false);
        if (!startDate || !endDate) return (alert('전시 기간을 선택해주세요.'), false);

        const start = new Date(startDate);
        const end = new Date(endDate);
        if (end < start) {
            alert('종료일은 시작일보다 이후 날짜여야 합니다.');
            return false;
        }

        if (!address.trim()) return (alert('전시장 주소를 입력해주세요.'), false);
        if (!selectedValues.type) return (alert('전시 유형을 선택해주세요.'), false);
        if (!selectedValues.form) return (alert('전시 형태를 선택해주세요.'), false);
        if (!selectedValues.mood) return (alert('전시 분위기를 선택해주세요.'), false);
        if (!selectedValues.startTime || !selectedValues.endTime) return (alert('운영 시간을 입력해주세요.'), false);
        if (!selectedValues.priceOption) return (alert('입장 정보를 선택해주세요.'), false);
        if (selectedValues.priceOption === '유료' && !selectedValues.price.trim()) return (alert('가격을 입력해주세요.'), false);
        if (!selectedValues.link.trim()) return (alert('연결 링크를 입력해주세요.'), false);

        return true;
    };

    const buildExhibitionPayload = (): CreateExhibitionRequest => {
        const price = selectedValues.priceOption === '무료' ? 0 : parseInt(selectedValues.price.replace(/[^0-9]/g, ''), 10) || 0;

        const selectedFacilities: FacilityType[] = Object.entries(facilities)
            .filter(([, checked]) => checked)
            .map(([key]) => FACILITY_MAP[key]);

        const exhibitionCategory = CATEGORY_MAP[selectedValues.type];
        const exhibitionType: ExhibitionType = selectedValues.form === '개인전' ? 'PERSON' : 'GROUP';
        const exhibitionMood = MOOD_MAP[selectedValues.mood];

        const dayOffText = selectedValues.dayOff.length > 0 ? `정기 휴무: ${selectedValues.dayOff.join(', ')}` : '정기 휴무 없음';

        const holidayText = selectedValues.holidayClosed ? '공휴일 휴관' : '공휴일 운영';

        const operatingInfo = `${dayOffText} / ${holidayText}`;

        return {
            title,
            description,
            startDate,
            endDate,

            openingTime: selectedValues.startTime,
            closingTime: selectedValues.endTime,

            exhibitionCategory,
            exhibitionType,
            exhibitionMood,

            price,
            facilities: selectedFacilities,
            operatingInfo,

            homepageUrl: selectedValues.link || '',

            address: {
                roadAddress: address,
                jibunAddress: address,
                postalCode: selectedValues.postalCode || '',
                detail: detailAddress,
            },

            images: imageFiles,
        };
    };

    const handleSubmitExhibition = async () => {
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            const exhibitionData = buildExhibitionPayload();
            const response = await createExhibition(exhibitionData, imageFiles);

            if (response.isSuccess) {
                setStep(0);
            } else {
                alert(response.message || '전시 등록에 실패했습니다.');
            }
        } catch (error) {
            const axiosError = error as AxiosError<{ message?: string }>;
            console.error('Exhibition submission error:', axiosError);
            console.log('서버 응답 data:', axiosError.response?.data);

            const errorMessage = axiosError.response?.data?.message || '전시 등록 중 오류가 발생했습니다.';
            alert(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetStep = () => setStep(null);

    const getSelectedFacilitiesLabel = () =>
        Object.entries(facilities)
            .filter(([, checked]) => checked)
            .map(([key]) => {
                if (key === 'wifi') return '와이파이';
                if (key === 'restroom') return '화장실';
                if (key === 'stroller') return '유모차 대여';
                return key;
            });

    return {
        // 상태
        title,
        description,
        imageFiles,
        startDate,
        endDate,
        address,
        detailAddress,
        facilities,
        selectedValues,
        isPostcodeOpen,
        isSubmitting,
        step,
        openId,

        // 옵션
        timeOptions,
        dayOffOptions,
        facilityOptions,

        // setter / 핸들러
        setTitle,
        setDescription,
        setImageFiles,
        setStartDate,
        setEndDate,
        setDetailAddress,
        setSelectedValues,
        setStep,

        handleToggleDropdown,
        handleFacilityChange,
        handleDayOffChange,
        handleHolidayClosedChange,
        handleStartTimeChange,
        handleEndTimeChange,
        handleCompleteAddress,
        togglePostcode,
        handlePriceOptionChange,
        handlePriceChange,
        handleLinkChange,

        handleSubmitExhibition,
        resetStep,
        getSelectedFacilitiesLabel,
    };
}
