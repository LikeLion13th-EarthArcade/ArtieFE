import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, X } from 'lucide-react';
import DaumPostcode from 'react-daum-postcode';
import type { Address } from 'react-daum-postcode';

import exhibitionIcon from '../../icons/exhibition_icon.svg';
import keyboard from '../../icons/keyboard.svg';
import images from '../../icons/images.svg';
import LeftFilledArrow from '../../icons/left-filled-arrow.svg';
import RightFilledArrow from '../../icons/right-filled-arrow.svg';

import Dropdown from '../Components/Dropdown/Dropdown';

export default function ExhibitionEdit() {
    const navigate = useNavigate();
    const location = useLocation();
    const prevData = location.state;

    // 전시 기본 정보
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    // 전시 일정
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // 전시 위치
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

    // 시설 옵션
    const [facilities, setFacilities] = useState({
        wifi: false,
        restroom: false,
        stroller: false,
    });

    // 드롭다운 관리
    const [openId, setOpenId] = useState('');
    const handleToggle = (id: string) => {
        setOpenId((prev) => (prev === id ? '' : id));
    };

    const [selectedValues, setSelectedValues] = useState({
        type: '',
        form: '',
        mood: '',
        priceOption: '',
        price: '',
        time: '',
        link: '',
        startTime: '',
        endTime: '',
        dayOff: [] as string[],
        holidayClosed: false,
    });

    // 모달 관리
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => setIsModalOpen(false);

    // 날짜 문자열을 파싱하는 함수
    const parsePeriod = (periodString: string) => {
        // "2025년 3월 20일 ~ 2025년 3월 30일" 형식을 "2025-03-20", "2025-03-30" 형식으로 변환
        if (!periodString) return { startDate: '', endDate: '' };

        const parts = periodString.split(' ~ ');
        if (parts.length !== 2) return { startDate: '', endDate: '' };

        const parseDate = (dateStr: string) => {
            // "2025년 3월 20일" -> "2025-03-20"
            const match = dateStr.match(/(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/);
            if (match) {
                const [, year, month, day] = match;
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
            }
            return '';
        };

        return {
            startDate: parseDate(parts[0].trim()),
            endDate: parseDate(parts[1].trim()),
        };
    };

    // 운영시간 파싱하는 함수
    const parseOperatingHours = (operatingHours: string) => {
        // "10:00 - 18:00 (월요일 휴관)" -> startTime: "10:00", endTime: "18:00"
        if (!operatingHours) return { startTime: '', endTime: '' };

        const timeMatch = operatingHours.match(/(\d{2}:\d{2})\s*-\s*(\d{2}:\d{2})/);
        if (timeMatch) {
            return {
                startTime: timeMatch[1],
                endTime: timeMatch[2],
            };
        }
        return { startTime: '', endTime: '' };
    };

    // 전시 타입 매핑 함수
    const mapExhibitionType = (type: string) => {
        const typeMap: { [key: string]: string } = {
            '회화': '회화',
            '조각•설치': '조각·설치',
            '공예•디자인': '공예·디자인',
            '사진•미디어 아트': '사진·미디어 아트',
        };
        return typeMap[type] || type;
    };

    // 입장료 정보 파싱 함수
    const parseAdmissionInfo = (admissionInfo: string) => {
        if (!admissionInfo) return { priceOption: '', price: '' };

        if (admissionInfo.includes('무료')) {
            return { priceOption: '무료', price: '' };
        } else {
            return { priceOption: '유료', price: admissionInfo };
        }
    };

    // 초기값 설정
    useEffect(() => {
        if (prevData) {
            console.log('Received data:', prevData); // 디버깅용

            // 기본 정보 설정
            setTitle(prevData.title || '');
            setDescription(prevData.description || '');

            // 주소 파싱 (location에서 상세주소 분리)
            const fullAddress = prevData.location || prevData.spaceLocation || '';
            setAddress(fullAddress);
            setDetailAddress('');

            // 날짜 파싱
            const { startDate: parsedStartDate, endDate: parsedEndDate } = parsePeriod(prevData.period);
            setStartDate(parsedStartDate);
            setEndDate(parsedEndDate);

            const { startTime, endTime } = parseOperatingHours(prevData.operatingHours);
            const { priceOption, price } = parseAdmissionInfo(prevData.admissionInfo);

            // selectedValues 설정
            setSelectedValues({
                type: mapExhibitionType(prevData.exhibitionType || ''),
                form: prevData.exhibitionFormat || '',
                mood: prevData.exhibitionMood || '',
                priceOption,
                price,
                time: '',
                link: prevData.websiteLink || '',
                startTime,
                endTime,
                dayOff: prevData.dayOff || [],
                holidayClosed: prevData.holidayClosed || false,
            });

            // 이미지 처리
            if (prevData.images && Array.isArray(prevData.images)) {
                setImagePreviews(prevData.images);
            }

            // 시설 옵션 설정 (만약 이전 데이터에 시설 정보가 있다면)
            if (prevData.facilities) {
                setFacilities(prevData.facilities);
            }
        }
    }, [prevData]);

    // 이미지 업로드 처리
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const filesArray = Array.from(e.target.files);
        const newFiles = [...imageFiles, ...filesArray].slice(0, 5);

        setImageFiles(newFiles);
    };

    // 이미지 삭제
    const handleDeleteImage = (index: number, isPreview = false) => {
        if (isPreview) {
            setImagePreviews((prev) => prev.filter((_, i) => i !== index));
        } else {
            setImageFiles((prev) => prev.filter((_, i) => i !== index));
        }
    };

    // 운영 시간 옵션 생성
    const timeOptions = Array.from({ length: 48 }, (_, i) => {
        const hours = String(Math.floor(i / 2)).padStart(2, '0');
        const minutes = i % 2 === 0 ? '00' : '30';
        return `${hours}:${minutes}`;
    });

    const timeToMinutes = (time: string) => {
        const [h, m] = time.split(':').map(Number);
        return h * 60 + m;
    };

    // 주소 선택 완료
    const handleComplete = (data: Address) => {
        setAddress(data.address); // 선택한 주소 입력
        setIsPostcodeOpen(false); // 검색창 닫기
    };

    // 시설 옵션 체크박스 핸들러
    const handleFacilityChange = (facility: keyof typeof facilities) => {
        setFacilities((prev) => ({
            ...prev,
            [facility]: !prev[facility],
        }));
    };

    const handleSave = () => {
        const hashtags = [selectedValues.type, selectedValues.form, selectedValues.mood].filter(Boolean);

        // 날짜를 다시 한국어 형식으로 변환
        const formatDateToKorean = (dateStr: string) => {
            if (!dateStr) return '';
            const [year, month, day] = dateStr.split('-');
            return `${year}년 ${parseInt(month)}월 ${parseInt(day)}일`;
        };

        const period = `${formatDateToKorean(startDate)} ~ ${formatDateToKorean(endDate)}`;
        const operatingHours = `${selectedValues.startTime} - ${selectedValues.endTime}`;

        // 입장료 정보 형식 맞추기
        let admissionInfo = '';
        if (selectedValues.priceOption === '무료') {
            admissionInfo = '무료 관람';
        } else if (selectedValues.priceOption === '유료' && selectedValues.price) {
            admissionInfo = selectedValues.price;
        }

        const updatedExhibition = {
            ...prevData,
            title,
            period,
            location: `${address}${detailAddress ? ` ${detailAddress}` : ''}`,
            description,
            operatingHours,
            exhibitionType: selectedValues.type,
            exhibitionFormat: selectedValues.form,
            exhibitionMood: selectedValues.mood,
            admissionInfo,
            websiteLink: selectedValues.link,
            hashtags,
            images: [...imagePreviews, ...imageFiles.map((file) => URL.createObjectURL(file))],
            facilities,
        };

        console.log('Updated exhibition data:', updatedExhibition);
        setIsModalOpen(true);
    };

    // 폼 유효성 검사
    const validateForm = () => {
        if (!title.trim()) return (alert('전시명을 입력해주세요.'), false);
        if (!description.trim()) return (alert('전시 소개를 입력해주세요.'), false);

        if (imagePreviews.length + imageFiles.length === 0) {
            return (alert('전시 이미지를 최소 1장 등록해주세요.'), false);
        }

        if (!startDate || !endDate) return (alert('전시 기간을 선택해주세요.'), false);
        if (!address.trim()) return (alert('전시 주소를 입력해주세요.'), false);

        if (!selectedValues.type) return (alert('전시 유형을 선택해주세요.'), false);
        if (!selectedValues.startTime || !selectedValues.endTime) return (alert('운영 시간을 입력해주세요.'), false);

        if (timeToMinutes(selectedValues.endTime) <= timeToMinutes(selectedValues.startTime)) {
            return (alert('종료 시간은 시작 시간보다 늦어야 합니다.'), false);
        }

        return true;
    };

    const sections = [
        {
            title: '전시 기본 정보',
            content: (
                <div className="flex flex-col">
                    {/* 전시명 */}
                    <div className="flex flex-col gap-4">
                        <span className="text-lg text-primary-300 ml-1">전시 이름</span>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => {
                                const newValue = e.target.value;
                                if (newValue.length <= 30) {
                                    setTitle(newValue);
                                }
                            }}
                            placeholder='전시의 이름을 입력해주세요. (예: "빛과 그림자의 대화")'
                            className="rounded-lg p-3 w-full min-h-[50px] placeholder-default-gray-600 border border-primary-300 focus:outline-none focus:ring-0"
                            maxLength={30}
                        />
                        <span className="text-default-gray-500 text-sm text-right block mr-1">{title.length} /30</span>
                    </div>

                    {/* 전시 설명 */}
                    <div className="flex flex-col gap-4">
                        <span className="text-lg text-primary-300 ml-1">전시 설명</span>
                        <div className="relative w-full min-h-[200px]">
                            <textarea
                                value={description}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    if (newValue.length <= 500) {
                                        setDescription(newValue);
                                    }
                                }}
                                className="placeholder-transparent rounded-lg p-3 w-full min-h-[200px] border border-primary-300 focus:outline-none focus:ring-0 resize-none"
                                maxLength={500}
                            />

                            {description.length === 0 && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-4">
                                    <img src={keyboard} alt="keyboard icon" className="w-9 h-9 mb-2" />
                                    <span className="text-default-gray-600">전시의 취지, 주요 작품, 작가 소개 등을 자유롭게 작성해주세요.</span>
                                </div>
                            )}
                        </div>

                        <span className="text-default-gray-500 text-sm text-right block mr-1">{description.length} /500</span>
                    </div>
                </div>
            ),
        },
        {
            title: '전시 이미지 업로드',
            content: (
                <div className="flex flex-col gap-4">
                    <span className="text-lg text-primary-300 ml-1">대표 이미지 등록</span>
                    <div
                        className="rounded-lg p-3 w-full min-h-[200px] border border-primary-300 flex flex-col items-center justify-center cursor-pointer"
                        onClick={() => document.getElementById('fileInput')?.click()}
                    >
                        {imagePreviews.length === 0 && imageFiles.length === 0 ? (
                            // 처음엔 아무것도 없을 때
                            <div className="flex flex-col items-center text-center">
                                <img src={images} alt="images icon" className="w-9 h-9 mb-2" />
                                <span className="text-default-gray-600">
                                    전시 분위기를 보여줄 수 있는 이미지를 업로드해주세요. <br /> 최대 5장까지 등록할 수 있어요.
                                </span>
                            </div>
                        ) : (
                            <div className="w-full grid grid-cols-3 gap-3">
                                {/* 기존 이미지 (URL) */}
                                {imagePreviews.map((url, index) => (
                                    <div key={`preview-${index}`} className="relative">
                                        <img src={url} alt={`preview-${index}`} className="w-full h-32 object-cover rounded-lg" />
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteImage(index, true);
                                            }}
                                            className="absolute top-1 right-1 bg-primary-300 rounded-full p-1 shadow"
                                        >
                                            <X size={12} className="text-white" />
                                        </button>
                                    </div>
                                ))}

                                {/* 새로 추가한 파일 */}
                                {imageFiles.map((file, index) => (
                                    <div key={`file-${index}`} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                        <span className="truncate w-[200px]">{file.name}</span>
                                        <div key={`file-${index}`} className="relative">
                                            <img src={URL.createObjectURL(file)} alt={`file-${index}`} className="w-full h-32 object-cover rounded-lg" />
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDeleteImage(index, false);
                                                }}
                                                className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                                            >
                                                <X size={14} className="text-primary-300" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" id="fileInput" />
                    </div>
                    <span className="text-default-gray-500 text-sm text-right block mr-1">{imagePreviews.length + imageFiles.length} /5</span>
                </div>
            ),
        },
        {
            title: '일정 및 운영 정보',
            content: (
                <div className="flex flex-col gap-4">
                    {/* 전시 기간 */}
                    <div className="flex flex-col gap-4">
                        <span className="text-lg text-primary-300 ml-1">전시 기간</span>
                        <div className="flex gap-3">
                            <DatePickerInput value={startDate} onChange={setStartDate} placeholder="시작일을 선택하세요" />
                            <span className="flex items-center">~</span>
                            <DatePickerInput value={endDate} onChange={setEndDate} placeholder="종료일을 선택하세요" />
                        </div>
                        <span className="text-sm text-default-gray-500">
                            전시 시작일과 종료일을 선택해주세요. <br /> (※ 종료일은 시작일보다 이후 날짜여야 합니다.)
                        </span>
                    </div>

                    {/* 운영 시간 */}
                    <div className="flex flex-col gap-4">
                        <span className="text-lg text-primary-300 ml-1">운영 시간</span>
                        <div className="flex gap-3">
                            <div className="relative">
                                <Dropdown
                                    id="startTime"
                                    placeholder="시작 시간"
                                    options={timeOptions}
                                    selected={selectedValues.startTime}
                                    isOpen={openId === 'startTime'}
                                    onToggle={handleToggle}
                                    onChange={(value) =>
                                        setSelectedValues((prev) => {
                                            if (prev.endTime && timeToMinutes(prev.endTime) < timeToMinutes(value)) {
                                                return { ...prev, startTime: value, endTime: '' };
                                            }
                                            return { ...prev, startTime: value };
                                        })
                                    }
                                />
                            </div>
                            <span className="flex items-center">~</span>
                            <div className="relative">
                                <Dropdown
                                    id="endTime"
                                    placeholder="종료 시간"
                                    options={timeOptions}
                                    selected={selectedValues.endTime}
                                    isOpen={openId === 'endTime'}
                                    onToggle={handleToggle}
                                    onChange={(value) =>
                                        setSelectedValues((prev) => {
                                            if (!prev.startTime || timeToMinutes(value) >= timeToMinutes(prev.startTime)) {
                                                return { ...prev, endTime: value };
                                            }
                                            alert('종료 시간은 시작 시간 이후여야 합니다!');
                                            return prev;
                                        })
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {/* 정기 휴무 */}
                    <div className="flex flex-col gap-4">
                        <span className="text-lg text-primary-300 ml-1">정기 휴무</span>
                        <span className="text-sm text-default-gray-500 ml-1">정기 휴무일이 없는 경우 선택하지 않으셔도 됩니다.</span>
                        <div className="flex flex-wrap gap-4">
                            {['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'].map((day) => (
                                <label key={day} className="flex items-center text-default-gray-700 ml-1 gap-2 cursor-pointer">
                                    <div className="relative flex items-center">
                                        <input
                                            type="checkbox"
                                            className="w-5 h-5 appearance-none border border-primary-300 rounded checked:bg-primary-300 checked:border-primary-300 cursor-pointer"
                                            checked={selectedValues.dayOff.includes(day)}
                                            onChange={(e) =>
                                                setSelectedValues((prev) => {
                                                    const newDays = e.target.checked ? [...prev.dayOff, day] : prev.dayOff.filter((d) => d !== day);
                                                    return { ...prev, dayOff: newDays };
                                                })
                                            }
                                        />
                                        {selectedValues.dayOff.includes(day) && (
                                            <svg
                                                className="absolute top-0.5 left-0.5 w-4 h-4 text-white pointer-events-none"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2.5"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>
                                    {day}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* 공휴일 휴관 */}
                    <div className="flex items-center gap-2 mt-2 ml-1">
                        <div className="relative flex items-center">
                            <input
                                type="checkbox"
                                id="holidayClosed"
                                checked={selectedValues.holidayClosed}
                                onChange={(e) => setSelectedValues((prev) => ({ ...prev, holidayClosed: e.target.checked }))}
                                className="w-5 h-5 appearance-none border border-primary-300 rounded checked:bg-primary-300 checked:border-primary-300 cursor-pointer"
                            />
                            {selectedValues.holidayClosed && (
                                <svg
                                    className="absolute top-0.5 left-0.5 w-4 h-4 text-white pointer-events-none"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </div>
                        <label htmlFor="holidayClosed" className="text-default-gray-700 cursor-pointer">
                            공휴일 휴관
                        </label>
                    </div>
                </div>
            ),
        },
        {
            title: '장소 정보',
            content: (
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between mx-1">
                        <span className="text-lg text-primary-300">전시 공간 위치</span>
                        <button
                            onClick={() => setIsPostcodeOpen(true)}
                            className="text-sm text-default-gray-700 border border-default-gray-600 rounded-3xl px-4 py-1 cursor-pointer"
                        >
                            주소 검색
                        </button>{' '}
                    </div>
                    <input
                        type="text"
                        value={address}
                        placeholder="전시장 주소를 입력해주세요."
                        readOnly
                        className="rounded-lg p-3 w-full min-h-[50px] border border-primary-300 placeholder-default-gray-600 focus:outline-none focus:ring-0"
                    />
                    <input
                        type="text"
                        value={detailAddress}
                        onChange={(e) => setDetailAddress(e.target.value)}
                        placeholder="상세주소를 입력해주세요."
                        className="rounded-lg p-3 w-full min-h-[50px] border border-primary-300 placeholder-default-gray-600 focus:outline-none focus:ring-0"
                    />

                    {isPostcodeOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
                            <div className="w-[450px] relative bg-white p-3 rounded-lg shadow-lg border border-primary-300">
                                <DaumPostcode onComplete={handleComplete} autoClose={false} />
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => setIsPostcodeOpen(false)}
                                        className="px-4 py-2 m-2 text-white bg-primary-300 rounded-lg cursor-pointer"
                                    >
                                        닫기
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ),
        },
        {
            title: '전시 성격',
            content: (
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        {/* 전시 유형 */}
                        <Dropdown
                            id="type"
                            label="전시 유형"
                            placeholder="전시 유형을 선택해주세요."
                            options={['회화', '조각·설치', '공예·디자인', '사진·미디어 아트']}
                            selected={selectedValues.type}
                            isOpen={openId === 'type'}
                            onToggle={handleToggle}
                            onChange={(value) => setSelectedValues((prev) => ({ ...prev, type: value }))}
                        />

                        {/* 전시 형태 */}
                        <Dropdown
                            id="form"
                            label="전시 형태"
                            placeholder="전시 형태를 선택해주세요."
                            options={['개인전', '단체전']}
                            selected={selectedValues.form}
                            isOpen={openId === 'form'}
                            onToggle={handleToggle}
                            onChange={(value) => setSelectedValues((prev) => ({ ...prev, form: value }))}
                        />
                    </div>

                    {/* 전시 분위기 */}
                    <Dropdown
                        id="mood"
                        label="전시 분위기"
                        placeholder="전시 분위기를 선택해주세요."
                        options={['혼자 보기 좋은', '데이트 하기 좋은', '트렌디한 MZ 감성이 있는', '가족과 즐기기 좋은']}
                        selected={selectedValues.mood}
                        isOpen={openId === 'mood'}
                        onToggle={handleToggle}
                        onChange={(value) => setSelectedValues((prev) => ({ ...prev, mood: value }))}
                    />
                </div>
            ),
        },
        {
            title: '시설•옵션',
            content: (
                <div className="flex flex-col gap-4">
                    <span className="text-lg text-primary-300 ml-1">기타(선택)</span>
                    <div className="flex flex-wrap justify-evenly items-center gap-3 rounded-lg p-3 w-full min-h-[50px] border border-primary-300 focus:outline-none focus:ring-0">
                        <label className="flex items-center gap-3 whitespace-nowrap">
                            와이파이
                            <input type="checkbox" className="accent-primary-300" checked={facilities.wifi} onChange={() => handleFacilityChange('wifi')} />
                        </label>

                        <div className="w-px h-6 bg-default-gray-500"></div>

                        <label className="flex items-center gap-3 whitespace-nowrap">
                            화장실
                            <input
                                type="checkbox"
                                className="accent-primary-300"
                                checked={facilities.restroom}
                                onChange={() => handleFacilityChange('restroom')}
                            />
                        </label>

                        <div className="w-px h-6 bg-default-gray-500"></div>

                        <label className="flex items-center gap-3 whitespace-nowrap">
                            유모차 대여
                            <input
                                type="checkbox"
                                className="accent-primary-300"
                                checked={facilities.stroller}
                                onChange={() => handleFacilityChange('stroller')}
                            />
                        </label>
                    </div>
                </div>
            ),
        },
        {
            title: '입장 및 외부 링크',
            content: (
                <div className="flex flex-col gap-4">
                    {/* 입장 정보 */}
                    <div className="flex flex-col gap-4">
                        <Dropdown
                            id="price"
                            label="입장 정보"
                            helperText="무료 / 유료 여부를 선택하고, 유료일 경우 가격을 입력해주세요."
                            placeholder="무료 / 유료 여부를 선택해주세요."
                            options={['무료', '유료']}
                            selected={selectedValues.priceOption}
                            isOpen={openId === 'price'}
                            onToggle={handleToggle}
                            onChange={(value) => setSelectedValues((prev) => ({ ...prev, priceOption: value }))}
                        />
                        {selectedValues.priceOption === '유료' && (
                            <input
                                type="text"
                                placeholder="가격을 입력해주세요."
                                className="rounded-lg p-3 w-full min-h-[50px] border border-primary-300 placeholder-default-gray-600 focus:outline-none focus:ring-0"
                                onChange={(e) =>
                                    setSelectedValues((prev) => ({
                                        ...prev,
                                        price: e.target.value,
                                    }))
                                }
                            />
                        )}
                    </div>
                    {/* 연결 링크 */}
                    <div className="flex flex-col gap-4">
                        <span className="text-lg text-primary-300 ml-1">연결 링크</span>
                        <input
                            type="text"
                            value={selectedValues.link}
                            onChange={(e) => setSelectedValues((prev) => ({ ...prev, link: e.target.value }))}
                            placeholder="더 많은 정보를 볼 수 있는 웹사이트, SNS, 예매처 링크 등을 입력해주세요."
                            className="rounded-lg p-3 w-full min-h-[50px] border border-primary-300 placeholder-default-gray-600 focus:outline-none focus:ring-0"
                        />
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className="flex flex-col items-center w-[70%] p-10 gap-10 mx-auto">
            {/* 상단 타이틀 */}
            <div className="flex items-center gap-3 w-full max-w-[1040px]">
                <img src={exhibitionIcon} alt="exhibition" className="w-[30px] h-[30px]" />
                <span className="text-3xl font-bold">전시 정보 수정하기</span>
            </div>

            {/* 섹션 반복 */}
            {sections.map((section, index) => (
                <div key={index} className="flex flex-col gap-4 w-full max-w-[1040px]">
                    <div className="flex items-center gap-3">
                        {/* 번호 */}
                        <div className="w-[27px] h-[27px] bg-primary-300 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">{index + 1}</span>
                        </div>
                        {/* 제목 */}
                        <span className="text-2xl font-bold">{section.title}</span>
                    </div>
                    {section.content}
                </div>
            ))}

            {/* 버튼 영역 */}
            <div className="flex gap-6 mt-12 justify-center">
                {/* 취소하기 버튼 */}
                <button onClick={() => navigate(-1)} className="w-[170px] h-[60px] rounded-[50px] bg-white text-lg text-primary-300 border border-primary-300">
                    취소하기
                </button>
                {/* 등록하기 버튼 */}
                <button
                    onClick={() => {
                        if (validateForm()) {
                            handleSave();
                        }
                    }}
                    className="w-[170px] h-[60px] rounded-[50px] bg-primary-300 text-white border border-primary-300 text-lg"
                >
                    저장하기
                </button>

                {/* 수정 완료 모달 */}
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
                        <div className="bg-white w-[450px] p-8 rounded-2xl relative shadow-lg">
                            <button onClick={closeModal} className="absolute top-4 right-4 text-default-gray-500">
                                <X size={20} />
                            </button>
                            <p className="text-center text-base mb-6 leading-relaxed">전시 정보가 성공적으로 수정되었습니다!</p>
                            <div className="flex justify-center">
                                <button className="px-6 py-2 rounded-full text-white bg-primary-300" onClick={() => navigate(-1)}>
                                    확인
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function DatePickerInput({
    value,
    onChange,
    placeholder,
    startDate,
    isEndDate = false,
}: {
    value: string;
    onChange: (date: string) => void;
    placeholder: string;
    startDate?: string;
    isEndDate?: boolean;
}) {
    const [open, setOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const dropdownRef = useRef<HTMLDivElement>(null);

    // 외부 클릭 시 닫기
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [open]);

    // 날짜 형식 변환 함수
    const formatDate = (date: Date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    };

    const formatDisplayDate = (dateStr: string) => {
        if (!dateStr) return placeholder;
        const [y, m, d] = dateStr.split('-');
        return `${y}.${m}.${d}`;
    };

    // 날짜가 선택 가능한지 확인하는 함수
    const isDateDisabled = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // 과거 날짜는 비활성화
        if (date < today) {
            return true;
        }

        // 종료일의 경우 시작일보다 이전 날짜는 비활성화
        if (isEndDate && startDate) {
            const start = new Date(startDate);
            start.setHours(0, 0, 0, 0);
            if (date < start) {
                return true;
            }
        }

        return false;
    };

    // 날짜를 offset 만큼 변경하여 onChange 호출
    const changeDate = (offset: number) => {
        let currentDate;
        if (value) {
            const [y, m, d] = value.split('-').map(Number);
            currentDate = new Date(y, m - 1, d);
        } else {
            currentDate = new Date();
        }
        currentDate.setHours(0, 0, 0, 0);

        // 새로운 날짜 계산
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + offset);

        // 선택 가능한 날짜인지 확인
        if (!isDateDisabled(newDate)) {
            onChange(formatDate(newDate));
        }
    };

    // 주어진 월의 날짜 배열 생성
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startDayOfWeek = firstDay.getDay();

        const days = [];

        // 이전 달 마지막 날짜들
        for (let i = 0; i < startDayOfWeek; i++) {
            const prevDate = new Date(year, month, -startDayOfWeek + i + 1);
            days.push({ date: prevDate, isCurrentMonth: false, isDisabled: true });
        }

        // 현재 달 날짜들
        for (let i = 1; i <= daysInMonth; i++) {
            const d = new Date(year, month, i);
            days.push({ date: d, isCurrentMonth: true, isDisabled: isDateDisabled(d) });
        }

        return days;
    };

    // 사용자가 날짜 클릭 시 선택 처리 및 드롭다운 닫기
    const handleDateSelect = (date: Date) => {
        if (isDateDisabled(date)) return;

        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const normalizedDate = new Date(year, month, day, 0, 0, 0, 0);
        onChange(formatDate(normalizedDate));
        setOpen(false);
    };

    // 현재 보여지는 달 변경 (offset: -1 이전 달, +1 다음 달)
    const changeMonth = (offset: number) => {
        setCurrentMonth((prev) => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() + offset);
            return newDate;
        });
    };

    const days = getDaysInMonth(currentMonth);
    let selectedDate = null;
    if (value) {
        const [year, month, day] = value.split('-').map(Number);
        selectedDate = new Date(year, month - 1, day);
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <div
                className="rounded-xl min-h-[50px] flex items-center justify-between px-3 gap-2 cursor-pointer"
                style={{ border: `1px solid var(--color-primary-300)` }}
            >
                {/* 왼쪽 화살표 */}
                <img src={LeftFilledArrow} alt="왼쪽 화살표" className="w-[18px] h-[18px] cursor-pointer" onClick={() => changeDate(-1)} />

                {/* 현재 선택된 날짜 표시 및 클릭 시 달력 열기/닫기 */}
                <div
                    className={`flex items-center gap-2 select-none cursor-pointer ${!value ? 'text-default-gray-600' : 'text-black'}`}
                    onClick={() => setOpen(!open)}
                >
                    <span>{formatDisplayDate(value)}</span>
                </div>

                {/* 오른쪽 화살표 */}
                <img src={RightFilledArrow} alt="오른쪽 화살표" className="w-[18px] h-[18px] cursor-pointer" onClick={() => changeDate(1)} />
            </div>

            {/* 달력 드롭다운 */}
            {open && (
                <div
                    className="w-[260px] absolute top-full mt-2 left-0 right-0 bg-white rounded-xl z-50 p-4"
                    style={{ border: `1px solid var(--color-primary-300)` }}
                >
                    {/* 달력 헤더 */}
                    <div className="flex items-center justify-between">
                        <button onClick={() => changeMonth(-1)} className="p-1 cursor-pointer">
                            <ChevronDown size={18} className="rotate-90" style={{ color: 'var(--color-default-gray-700)' }} />
                        </button>
                        <span>
                            {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
                        </span>
                        <button onClick={() => changeMonth(1)} className="p-1 cursor-pointer">
                            <ChevronDown size={18} className="-rotate-90" style={{ color: 'var(--color-default-gray-700)' }} />
                        </button>
                    </div>

                    {/* 요일 헤더 */}
                    <div className="grid grid-cols-7 gap-1">
                        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                            <div key={day} className="text-default-gray-700 text-center text-sm py-2">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* 날짜 그리드 */}
                    <div className="grid grid-cols-7 gap-1">
                        {days.map((day, index) => {
                            const isSelected =
                                selectedDate &&
                                day.date.getDate() === selectedDate.getDate() &&
                                day.date.getMonth() === selectedDate.getMonth() &&
                                day.date.getFullYear() === selectedDate.getFullYear();

                            const isToday = new Date().toDateString() === day.date.toDateString();

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleDateSelect(day.date)}
                                    disabled={day.isDisabled}
                                    className={`flex items-center justify-center w-7 h-7 text-sm rounded transition-colors
                                        ${day.isDisabled ? 'cursor-not-allowed text-gray-300' : 'cursor-pointer'}
                                        ${isSelected ? 'bg-[var(--color-primary-300)] text-white' : ''}
                                        ${!isSelected && !day.isDisabled ? 'hover:bg-[var(--color-default-gray-400)]' : ''}
                                        ${isToday && !isSelected && !day.isDisabled ? 'ring-1 ring-[var(--color-primary-300)]' : ''}
                                    `}
                                >
                                    {day.date.getDate()}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
