import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, X } from 'lucide-react';
import DaumPostcode from 'react-daum-postcode';
import type { Address } from 'react-daum-postcode';

import exhibitionIcon from '../../icons/exhibition_icon.svg';
import keyboard from '../../icons/keyboard.svg';
import images from '../../icons/images.svg';
import LeftFilledArrow from '../../icons/left-filled-arrow.svg';
import RightFilledArrow from '../../icons/right-filled-arrow.svg';

import Dropdown from '../Components/Dropdown/Dropdown';

export default function ExhibitionListCreate() {
    // 전시 기본 정보
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageFiles, setImageFiles] = useState<File[]>([]);

    // 전시 일정
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // 전시 위치
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);

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
    });

    // 모달 스텝 관리
    const [step, setStep] = useState<0 | 1 | null>(null); // null: 닫힘, 0: 첫번째 모달, 1: 두번째 모달
    const navigate = useNavigate();
    const closeModal = () => setStep(null);

    // 이미지 업로드 처리 (최대 3개)
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;
        const filesArray = Array.from(e.target.files);
        const newFiles = [...imageFiles, ...filesArray].slice(0, 5);
        setImageFiles(newFiles);
    };

    // 주소 선택 완료
    const handleComplete = (data: Address) => {
        setAddress(data.address); // 선택한 주소 입력
        setIsPostcodeOpen(false); // 검색창 닫기
    };

    // 폼 유효성 검사
    const validateForm = () => {
        if (!title.trim()) return (alert('전시 제목을 입력해주세요.'), false);
        if (!description.trim()) return (alert('전시 설명을 입력해주세요.'), false);
        if (imageFiles.length === 0) return (alert('대표 이미지를 최소 1장 등록해주세요.'), false);
        if (!startDate || !endDate) return (alert('전시 기간을 선택해주세요.'), false);

        // 종료일이 시작일보다 이전인 경우 체크
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
        if (!selectedValues.time.trim()) return (alert('운영 시간을 입력해주세요.'), false);
        if (!selectedValues.priceOption) return (alert('입장 정보를 선택해주세요.'), false);
        if (selectedValues.priceOption === '유료' && !selectedValues.price.trim()) return (alert('가격을 입력해주세요.'), false);
        if (!selectedValues.link.trim()) return (alert('연결 링크를 입력해주세요.'), false);

        return true;
    };

    const sections = [
        {
            title: '전시 기본 정보',
            content: (
                <div className="flex flex-col">
                    {/* 전시 제목 */}
                    <div className="flex flex-col gap-4">
                        <span className="text-lg ml-1" style={{ color: 'var(--color-primary-300)' }}>
                            전시 제목
                        </span>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => {
                                const newValue = e.target.value;
                                if (newValue.length <= 20) {
                                    setTitle(newValue);
                                }
                            }}
                            placeholder='전시의 이름을 입력해주세요. (예: "빛과 그림자의 대화")'
                            className="rounded-lg p-3 w-full min-h-[50px] placeholder-[var(--color-default-gray-600)] focus:outline-none focus:ring-0"
                            style={{ border: `1px solid var(--color-primary-300)` }}
                            maxLength={20}
                        />
                        <span className="text-sm text-right block mr-1" style={{ color: 'var(--color-default-gray-500)' }}>
                            {title.length} /20
                        </span>
                    </div>
                    {/* 전시 설명 */}
                    <div className="flex flex-col gap-4">
                        <span className="text-lg ml-1" style={{ color: 'var(--color-primary-300)' }}>
                            전시 설명
                        </span>
                        <div className="relative w-full min-h-[200px]">
                            <textarea
                                value={description}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    if (newValue.length <= 500) {
                                        setDescription(newValue);
                                    }
                                }}
                                className="placeholder-transparent rounded-lg p-3 w-full min-h-[200px] focus:outline-none focus:ring-0 resize-none"
                                style={{ border: `1px solid var(--color-primary-300)` }}
                                maxLength={500}
                            />

                            {description.length === 0 && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-4">
                                    <img src={keyboard} alt="keyboard icon" className="w-9 h-9 mb-2" />
                                    <span style={{ color: 'var(--color-default-gray-600)' }}>
                                        전시의 취지, 주요 작품, 작가 소개 등을 자유롭게 작성해주세요.
                                    </span>
                                </div>
                            )}
                        </div>

                        <span className="text-sm text-right block mr-1" style={{ color: 'var(--color-default-gray-500)' }}>
                            {description.length} /500
                        </span>
                    </div>
                </div>
            ),
        },
        {
            title: '전시 이미지 업로드',
            content: (
                <div className="flex flex-col gap-4">
                    <span className="text-lg ml-1" style={{ color: 'var(--color-primary-300)' }}>
                        대표 이미지 등록
                    </span>
                    <div
                        className="rounded-lg p-3 w-full min-h-[200px] flex flex-col items-center justify-center cursor-pointer"
                        style={{ border: `1px solid var(--color-primary-300)` }}
                        onClick={() => document.getElementById('fileInput')?.click()}
                    >
                        {imageFiles.length === 0 ? (
                            // 파일이 선택되지 않았을 때
                            <div className="flex flex-col items-center text-center">
                                <img src={images} alt="images icon" className="w-9 h-9 mb-2" />
                                <span style={{ color: 'var(--color-default-gray-600)' }}>
                                    전시 분위기를 보여줄 수 있는 이미지를 업로드해주세요. <br /> 최대 5장까지 등록할 수 있어요.
                                </span>
                            </div>
                        ) : (
                            // 파일이 선택되었을 때
                            <div className="w-full flex flex-col gap-2">
                                {imageFiles.map((file, index) => (
                                    <div key={index}>{file.name}</div>
                                ))}
                            </div>
                        )}
                        <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" id="fileInput" />
                    </div>
                    <span className="text-sm text-right block mr-1" style={{ color: 'var(--color-default-gray-500)' }}>
                        {imageFiles.length} /5
                    </span>
                </div>
            ),
        },
        {
            title: '일정 및 운영 정보',
            content: (
                <div className="flex flex-col gap-4">
                    {/* 전시 기간 */}
                    <div className="flex flex-col gap-4">
                        <span className="text-lg ml-1" style={{ color: 'var(--color-primary-300)' }}>
                            전시 기간
                        </span>
                        <div className="flex gap-3">
                            <DatePickerInput value={startDate} onChange={setStartDate} placeholder="시작일을 선택하세요" />
                            <span className="flex items-center">~</span>
                            <DatePickerInput value={endDate} onChange={setEndDate} placeholder="종료일을 선택하세요" />
                        </div>
                        <span className="text-sm" style={{ color: 'var(--color-default-gray-500)' }}>
                            전시 시작일과 종료일을 선택해주세요. <br /> (※ 종료일은 시작일보다 이후 날짜여야 합니다.)
                        </span>
                    </div>
                    {/* 운영 시간 */}
                    <div className="flex flex-col gap-4">
                        <span className="text-lg ml-1" style={{ color: 'var(--color-primary-300)' }}>
                            운영 시간
                        </span>
                        <input
                            type="text"
                            value={selectedValues.time}
                            onChange={(e) => setSelectedValues((prev) => ({ ...prev, time: e.target.value }))}
                            placeholder="운영 시간을 입력해주세요. (예: 오전 11시 ~ 오후 7시)"
                            className="rounded-lg p-3 w-full min-h-[50px] placeholder-[var(--color-default-gray-600)] focus:outline-none focus:ring-0"
                            style={{ border: `1px solid var(--color-primary-300)` }}
                        />
                    </div>
                </div>
            ),
        },
        {
            title: '장소 정보',
            content: (
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between mx-1">
                        <span className="text-lg" style={{ color: 'var(--color-primary-300)' }}>
                            전시 공간 위치
                        </span>
                        <button
                            onClick={() => setIsPostcodeOpen(true)}
                            className="text-sm rounded-3xl px-4 py-1 cursor-pointer"
                            style={{
                                color: 'var(--color-default-gray-700)',
                                border: `1px solid var(--color-default-gray-500)`,
                            }}
                        >
                            주소 검색
                        </button>{' '}
                    </div>
                    <input
                        type="text"
                        value={address}
                        placeholder="전시장 주소를 입력해주세요."
                        readOnly
                        className="rounded-lg p-3 w-full min-h-[50px] placeholder-[var(--color-default-gray-600)] focus:outline-none focus:ring-0"
                        style={{
                            border: `1px solid var(--color-primary-300)`,
                        }}
                    />
                    <input
                        type="text"
                        value={detailAddress}
                        onChange={(e) => setDetailAddress(e.target.value)}
                        placeholder="상세주소를 입력해주세요."
                        className="rounded-lg p-3 w-full min-h-[50px] placeholder-[var(--color-default-gray-600)] focus:outline-none focus:ring-0"
                        style={{
                            border: `1px solid var(--color-primary-300)`,
                        }}
                    />

                    {isPostcodeOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
                            <div className="w-[450px] relative bg-white p-3 rounded-lg shadow-lg" style={{ border: `1px solid var(--color-primary-300)` }}>
                                <DaumPostcode onComplete={handleComplete} autoClose={false} />
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => setIsPostcodeOpen(false)}
                                        className="px-4 py-2 m-2 text-white rounded-lg cursor-pointer"
                                        style={{ backgroundColor: 'var(--color-primary-300)' }}
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
                    <span className="text-lg ml-1" style={{ color: 'var(--color-primary-300)' }}>
                        기타(선택)
                    </span>
                    <div
                        className="flex items-center gap-3 rounded-lg p-3 w-full min-h-[50px] focus:outline-none focus:ring-0 flex-nowrap"
                        style={{ border: `1px solid var(--color-primary-300)` }}
                    >
                        <label className="flex items-center gap-3 whitespace-nowrap">
                            <input type="checkbox" className="accent-[var(--color-primary-300)]" /> 와이파이
                        </label>

                        <div className="w-px h-6" style={{ backgroundColor: 'var(--color-default-gray-500)' }}></div>

                        <label className="flex items-center gap-3 whitespace-nowrap">
                            <input type="checkbox" className="accent-[var(--color-primary-300)]" /> 화장실
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
                                className="rounded-lg p-3 w-full min-h-[50px] placeholder-[var(--color-default-gray-600)] focus:outline-none focus:ring-0"
                                style={{
                                    border: `1px solid var(--color-primary-300)`,
                                }}
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
                        <span className="text-lg ml-1" style={{ color: 'var(--color-primary-300)' }}>
                            연결 링크
                        </span>
                        <input
                            type="text"
                            value={selectedValues.link}
                            onChange={(e) => setSelectedValues((prev) => ({ ...prev, link: e.target.value }))}
                            placeholder="더 많은 정보를 볼 수 있는 웹사이트, SNS, 예매처 링크 등을 입력해주세요."
                            className="rounded-lg p-3 w-full min-h-[50px] placeholder-[var(--color-default-gray-600)] focus:outline-none focus:ring-0"
                            style={{ border: `1px solid var(--color-primary-300)` }}
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
                <span className="text-3xl font-bold">전시 등록하기</span>
            </div>

            {/* 섹션 반복 */}
            {sections.map((section, index) => (
                <div key={index} className="flex flex-col gap-4 w-full max-w-[1040px]">
                    <div className="flex items-center gap-3">
                        {/* 번호 */}
                        <div
                            className="w-[27px] h-[27px] rounded-full flex items-center justify-center"
                            style={{ backgroundColor: 'var(--color-primary-300)' }}
                        >
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
                {/* 미리보기 버튼 */}
                <button
                    className="w-[170px] h-[60px] rounded-[50px] bg-white text-lg"
                    style={{
                        color: 'var(--color-primary-300)',
                        border: `1px solid var(--color-primary-300)`,
                    }}
                >
                    미리보기
                </button>

                {/* 등록하기 버튼 */}
                <button
                    className="w-[170px] h-[60px] rounded-[50px] text-white text-lg"
                    style={{ backgroundColor: 'var(--color-primary-300)', border: `1px solid var(--color-primary-300)` }}
                    onClick={() => {
                        if (validateForm()) {
                            setStep(0);
                        }
                    }}
                >
                    등록하기
                </button>

                {/* 첫 번째 모달 */}
                {step === 0 && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
                        <div className="bg-white w-[450px] p-8 rounded-2xl relative shadow-lg">
                            {/* 닫기 버튼 */}
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 transition-colors"
                                style={{ color: 'var(--color-default-gray-500)' }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-default-gray-800)')}
                                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-default-gray-500)')}
                            >
                                <X size={20} />
                            </button>

                            {/* 내용 */}
                            <p className="text-center text-base mb-6 leading-relaxed">
                                전시 등록은 검토 후 승인됩니다.
                                <br />
                                승인까지 영업일 기준 2~3일 소요될 수 있습니다.
                                <br />
                                <span style={{ color: 'var(--color-default-gray-600)' }}>승인 후 마이페이지에서 수정/삭제 가능합니다.</span>
                            </p>

                            {/* 확인 버튼 */}
                            <div className="flex justify-center">
                                <button
                                    className="px-6 py-2 rounded-full text-white"
                                    style={{ backgroundColor: 'var(--color-primary-300)' }}
                                    onClick={() => setStep(1)}
                                >
                                    확인
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* 두 번째 모달 */}
                {step === 1 && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
                        <div className="bg-white w-[450px] p-8 rounded-2xl relative shadow-lg">
                            {/* 닫기 버튼 */}
                            <button onClick={closeModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
                                <X size={20} />
                            </button>

                            {/* 내용 */}
                            <p className="text-center text-base mb-6 leading-relaxed">
                                전시가 정상적으로 등록되었습니다!
                                <br />
                                승인 결과는 마이페이지에서 확인할 수 있습니다.
                            </p>

                            {/* 확인 버튼 */}
                            <div className="flex justify-center">
                                <button
                                    className="px-6 py-2 rounded-full text-white"
                                    style={{ backgroundColor: 'var(--color-primary-300)' }}
                                    onClick={() => navigate('/')}
                                >
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
                    className="flex items-center gap-2 select-none cursor-pointer"
                    style={{ color: value ? '' : 'var(--color-default-gray-600)' }}
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
                            <div key={day} className="text-center text-sm py-2" style={{ color: 'var(--color-default-gray-700)' }}>
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
