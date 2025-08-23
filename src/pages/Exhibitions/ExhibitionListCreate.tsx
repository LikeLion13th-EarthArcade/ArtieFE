import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DaumPostcode from 'react-daum-postcode';
import type { Address } from 'react-daum-postcode';

import exhibitionIcon from '../../icons/exhibition_icon.svg';
import keyboard from '../../icons/keyboard.svg';
import images from '../../icons/images.svg';
import { X } from 'lucide-react';

import Dropdown from '../Components/Dropdown/Dropdown';
import DatePickerInput from '../Components/Common/DatePickerInput';
import { FormInput } from '../Components/Common/FormInput';
import { FormTextarea } from '../Components/Common/FormTextarea';
import { CheckboxGroup } from '../Components/Common/CheckboxGroup';
import { FacilityCheckbox } from '../Components/Common/FacilityCheckbox';
import { FileUpload } from '../Components/Common/FileUpload';
import { SectionHeader } from '../Components/Common/SectionHeader';

export default function ExhibitionListCreate() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
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

    // 모달 스텝 관리
    const [step, setStep] = useState<0 | 1 | null>(null);
    const closeModal = () => setStep(null);

    const location = useLocation();
    const prevData = location.state;

    useEffect(() => {
        if (prevData) {
            setTitle(prevData.title);
            setDescription(prevData.description);
            setImageFiles(prevData.imageFiles);
            setStartDate(prevData.startDate);
            setEndDate(prevData.endDate);
            setAddress(prevData.address);
            setDetailAddress(prevData.detailAddress);
            setSelectedValues({
                ...prevData.selectedValues,
                dayOff: Array.isArray(prevData.selectedValues?.dayOff) ? prevData.selectedValues.dayOff : [],
            });
            if (prevData.selectedValues?.facilities) {
                const selectedFacilities: string[] = prevData.selectedValues.facilities;
                setFacilities({
                    wifi: selectedFacilities.includes('와이파이'),
                    restroom: selectedFacilities.includes('화장실'),
                    stroller: selectedFacilities.includes('유모차 대여'),
                });
            }
        }
    }, [prevData]);

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
        setAddress(data.address);
        setIsPostcodeOpen(false);
    };

    // 시설 옵션 체크박스 핸들러
    const handleFacilityChange = (facility: keyof typeof facilities) => {
        setFacilities((prev) => ({
            ...prev,
            [facility]: !prev[facility],
        }));
    };

    // 정기 휴무 핸들러
    const handleDayOffChange = (day: string, checked: boolean) => {
        setSelectedValues((prev) => {
            const newDays = checked ? [...prev.dayOff, day] : prev.dayOff.filter((d) => d !== day);
            return { ...prev, dayOff: newDays };
        });
    };

    // 폼 유효성 검사
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

    // 정기 휴무 옵션 생성
    const dayOffOptions = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'].map((day) => ({
        value: day,
        label: day,
        checked: selectedValues.dayOff.includes(day),
    }));

    // 시설 옵션 생성
    const facilityOptions = [
        { label: '와이파이', value: 'wifi', checked: facilities.wifi },
        { label: '화장실', value: 'restroom', checked: facilities.restroom },
        { label: '유모차 대여', value: 'stroller', checked: facilities.stroller },
    ];

    return (
        <div className="flex flex-col items-center w-[70%] p-10 gap-10 mx-auto">
            {/* 상단 타이틀 */}
            <div className="flex items-center gap-3 w-full max-w-[1040px]">
                <img src={exhibitionIcon} alt="exhibition" className="w-[30px] h-[30px]" />
                <span className="text-3xl font-bold">전시 등록하기</span>
            </div>

            {/* 1. 전시 기본 정보 */}
            <div className="flex flex-col gap-4 w-full max-w-[1040px]">
                <SectionHeader number={1} title="전시 기본 정보" />

                <FormInput
                    label="전시 제목"
                    value={title}
                    onChange={setTitle}
                    placeholder='전시의 이름을 입력해주세요. (예: "빛과 그림자의 대화")'
                    maxLength={20}
                    showCounter={true}
                />

                <FormTextarea
                    label="전시 설명"
                    value={description}
                    onChange={setDescription}
                    maxLength={500}
                    showCounter={true}
                    icon={keyboard}
                    iconAlt="keyboard icon"
                    iconText="전시의 취지, 주요 작품, 작가 소개 등을 자유롭게 작성해주세요."
                />
            </div>

            {/* 2. 전시 이미지 업로드 */}
            <div className="flex flex-col gap-4 w-full max-w-[1040px]">
                <SectionHeader number={2} title="전시 이미지 업로드" />

                <FileUpload
                    label="대표 이미지 등록"
                    files={imageFiles}
                    onChange={setImageFiles}
                    maxFiles={5}
                    emptyStateIcon={images}
                    emptyStateIconAlt="images icon"
                    emptyStateText="전시 분위기를 보여줄 수 있는 이미지를 업로드해주세요. 최대 5장까지 등록할 수 있어요."
                />
            </div>

            {/* 3. 일정 및 운영 정보 */}
            <div className="flex flex-col gap-4 w-full max-w-[1040px]">
                <SectionHeader number={3} title="일정 및 운영 정보" />

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
                <CheckboxGroup
                    label="정기 휴무"
                    helperText="정기 휴무일이 없는 경우 선택하지 않으셔도 됩니다."
                    options={dayOffOptions}
                    onChange={handleDayOffChange}
                    layout="horizontal"
                />

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

            {/* 4. 장소 정보 */}
            <div className="flex flex-col gap-4 w-full max-w-[1040px]">
                <SectionHeader number={4} title="장소 정보" />

                <div className="flex flex-col gap-4">
                    <div className="flex justify-between mx-1">
                        <span className="text-lg text-primary-300">전시 공간 위치</span>
                        <button
                            onClick={() => setIsPostcodeOpen(true)}
                            className="text-sm text-default-gray-700 border border-default-gray-600 rounded-3xl px-4 py-1 cursor-pointer"
                        >
                            주소 검색
                        </button>
                    </div>

                    <FormInput label="" value={address} onChange={() => {}} placeholder="전시장 주소를 입력해주세요." readOnly={true} />

                    <FormInput label="" value={detailAddress} onChange={setDetailAddress} placeholder="상세주소를 입력해주세요." />

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
            </div>

            {/* 5. 전시 성격 */}
            <div className="flex flex-col gap-4 w-full max-w-[1040px]">
                <SectionHeader number={5} title="전시 성격" />

                <div className="grid grid-cols-2 gap-4">
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

            {/* 6. 시설•옵션 */}
            <div className="flex flex-col gap-4 w-full max-w-[1040px]">
                <SectionHeader number={6} title="시설•옵션" />

                <FacilityCheckbox
                    label="기타(선택)"
                    options={facilityOptions}
                    onChange={(value: string) => handleFacilityChange(value as keyof typeof facilities)}
                />
            </div>

            {/* 7. 입장 및 외부 링크 */}
            <div className="flex flex-col gap-4 w-full max-w-[1040px]">
                <SectionHeader number={7} title="입장 및 외부 링크" />

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

                <FormInput
                    label="연결 링크"
                    value={selectedValues.link}
                    onChange={(value: string) => setSelectedValues((prev) => ({ ...prev, link: value }))}
                    placeholder="더 많은 정보를 볼 수 있는 웹사이트, SNS, 예매처 링크 등을 입력해주세요."
                />
            </div>

            {/* 버튼 영역 */}
            <div className="flex gap-6 mt-12 justify-center">
                <button
                    className="w-[170px] h-[60px] rounded-[50px] bg-white text-lg text-primary-300 border border-primary-300"
                    onClick={() =>
                        navigate('/exhibitions/1/preview', {
                            state: {
                                title,
                                description,
                                imageFiles,
                                startDate,
                                endDate,
                                address,
                                detailAddress,
                                selectedValues: {
                                    ...selectedValues,
                                    facilities: Object.entries(facilities)
                                        .filter(([, checked]) => checked)
                                        .map(([key]) => {
                                            if (key === 'wifi') return '와이파이';
                                            if (key === 'restroom') return '화장실';
                                            if (key === 'stroller') return '유모차 대여';
                                            return key;
                                        }),
                                },
                            },
                        })
                    }
                >
                    미리보기
                </button>

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
            </div>

            {/* 첫 번째 모달 */}
            {step === 0 && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
                    <div className="bg-white w-[450px] p-8 rounded-2xl relative shadow-lg">
                        {/* 닫기 버튼 */}
                        <button onClick={closeModal} className="absolute top-4 right-4 text-default-gray-500">
                            <X size={20} />
                        </button>

                        {/* 내용 */}
                        <p className="text-center text-base mb-6 leading-relaxed">
                            전시 등록은 검토 후 승인됩니다.
                            <br />
                            승인까지 영업일 기준 2~3일 소요될 수 있습니다.
                            <br />
                            <span className="text-default-gray-600">승인 후 마이페이지에서 수정/삭제 가능합니다.</span>
                        </p>

                        {/* 확인 버튼 */}
                        <div className="flex justify-center">
                            <button className="px-6 py-2 rounded-full text-white bg-primary-300" onClick={() => setStep(1)}>
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
                        <button onClick={closeModal} className="absolute top-4 right-4 text-default-gray-500">
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
                            <button className="px-6 py-2 rounded-full text-white bg-primary-300" onClick={() => navigate('/')}>
                                확인
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
