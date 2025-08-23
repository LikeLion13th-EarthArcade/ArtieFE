import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import DaumPostcode from 'react-daum-postcode';
import type { Address } from 'react-daum-postcode';

import home from '../../icons/home.svg';
import keyboard from '../../icons/keyboard.svg';
import images from '../../icons/images.svg';

import Dropdown from '../Components/Dropdown/Dropdown';
import { FormInput } from '../Components/Common/FormInput';
import { FormTextarea } from '../Components/Common/FormTextarea';
import { SectionHeader } from '../Components/Common/SectionHeader';

export default function SpaceListCreate() {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const [isPostcodeOpen, setIsPostcodeOpen] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [sns, setSns] = useState('');
    const [facilities, setFacilities] = useState({
        wifi: false,
        restroom: false,
        lounge: false,
        parking: false,
        elevator: false,
        wheelchair: false,
    });

    // 드롭다운 관리
    const [openId, setOpenId] = useState('');
    const handleToggle = (id: string) => {
        setOpenId((prev) => (prev === id ? '' : id));
    };

    const [selectedValues, setSelectedValues] = useState({
        type: '',
        operatingHours: '',
        spaceInfo: '',
        mood: '',
        startTime: '',
        endTime: '',
    });

    // 모달 관리
    const [isModalOpen, setIsModalOpen] = useState(false);
    const closeModal = () => setIsModalOpen(false);

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

    // 폼 유효성 검사
    const validateForm = () => {
        if (!title.trim()) return (alert('공간명을 입력해주세요.'), false);
        if (!description.trim()) return (alert('공간 소개를 입력해주세요.'), false);
        if (imageFiles.length === 0) return (alert('공간 이미지를 최소 1장 등록해주세요.'), false);
        if (!address.trim()) return (alert('공간 주소를 입력해주세요.'), false);
        if (!selectedValues.type) return (alert('공간 유형을 선택해주세요.'), false);
        if (!selectedValues.startTime || !selectedValues.endTime) return (alert('운영 시간을 입력해주세요.'), false);
        if (timeToMinutes(selectedValues.endTime) <= timeToMinutes(selectedValues.startTime)) {
            return (alert('종료 시간은 시작 시간보다 늦어야 합니다.'), false);
        }
        if (!selectedValues.spaceInfo) return (alert('공간 사양을 선택해주세요.'), false);
        if (!phoneNumber.trim()) return (alert('연락처를 입력해주세요.'), false);
        if (!/^\d{2,3}-\d{3,4}-\d{4}$/.test(phoneNumber)) {
            return (alert('올바른 연락처 형식을 입력해주세요. (예: 010-1234-5678)'), false);
        }
        if (!email.trim()) return (alert('이메일을 입력해주세요.'), false);
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return (alert('올바른 이메일 주소를 입력해주세요.'), false);
        }

        return true;
    };

    // 시설 옵션 배열 생성
    const facilityOptions = [
        { label: '와이파이', value: 'wifi', checked: facilities.wifi },
        { label: '화장실', value: 'restroom', checked: facilities.restroom },
        { label: '휴게 공간', value: 'lounge', checked: facilities.lounge },
        { label: '주차장', value: 'parking', checked: facilities.parking },
        { label: '엘리베이터', value: 'elevator', checked: facilities.elevator },
        { label: '휠체어 접근 가능', value: 'wheelchair', checked: facilities.wheelchair },
    ];

    return (
        <div className="flex flex-col items-center w-[70%] p-10 gap-10 mx-auto">
            {/* 상단 타이틀 */}
            <div className="flex items-center gap-3 w-full max-w-[1040px]">
                <img src={home} alt="home" className="w-[30px] h-[30px]" />
                <span className="text-3xl font-bold">공간 등록하기</span>
            </div>
            {/* 1. 공간 기본 정보 */}
            <div className="flex flex-col gap-4 w-full max-w-[1040px]">
                <SectionHeader number={1} title="공간 기본 정보" />

                <FormInput label="공간 이름" value={title} onChange={setTitle} placeholder="공간의 이름을 입력해주세요." maxLength={30} showCounter={true} />

                <FormTextarea
                    label="공간 소개"
                    value={description}
                    onChange={setDescription}
                    maxLength={500}
                    showCounter={true}
                    icon={keyboard}
                    iconAlt="keyboard icon"
                    iconText="공간의 특징, 분위기, 시설 등을 자유롭게 작성해주세요."
                />
            </div>
            {/* 2. 공간 이미지 업로드 */}
            <div className="flex flex-col gap-4 w-full max-w-[1040px]">
                <SectionHeader number={2} title="공간 이미지 업로드" />

                <div className="flex flex-col gap-4">
                    <span className="text-lg text-primary-300 ml-1">공간 사진 등록</span>
                    <div
                        className="rounded-lg p-3 w-full min-h-[200px] border border-primary-300 flex flex-col items-center justify-center cursor-pointer"
                        onClick={() => document.getElementById('fileInput')?.click()}
                    >
                        {imageFiles.length === 0 ? (
                            <div className="flex flex-col items-center text-center">
                                <img src={images} alt="images icon" className="w-9 h-9 mb-2" />
                                <span className="text-default-gray-600">
                                    공간의 분위기와 특징을 보여줄 수 있는 이미지를 업로드해주세요. <br /> 최대 5장까지 등록할 수 있어요.
                                </span>
                            </div>
                        ) : (
                            <div className="w-full flex flex-col gap-2">
                                {imageFiles.map((file, index) => (
                                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                        <span>{file.name}</span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setImageFiles((prev) => prev.filter((_, i) => i !== index));
                                            }}
                                            className="text-primary-300"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => {
                                if (!e.target.files) return;
                                const filesArray = Array.from(e.target.files);
                                const newFiles = [...imageFiles, ...filesArray].slice(0, 5);
                                setImageFiles(newFiles);
                            }}
                            className="hidden"
                            id="fileInput"
                        />
                    </div>
                    <span className="text-default-gray-500 text-sm text-right block mr-1">{imageFiles.length} /5</span>
                </div>
            </div>
            {/* 3. 위치 정보 */}
            <div className="flex flex-col gap-4 w-full max-w-[1040px]">
                <SectionHeader number={3} title="위치 정보" />

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
            {/* 4. 운영 정보 */}
            <div className="flex flex-col gap-4 w-full max-w-[1040px]">
                <SectionHeader number={4} title="운영 정보" />

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
            {/* 5. 공간 정보 */}
            <div className="flex flex-col gap-4 w-full max-w-[1040px]">
                <SectionHeader number={5} title="공간 정보" />

                <div className="grid grid-cols-2 gap-4">
                    <Dropdown
                        id="type"
                        label="공간 유형"
                        placeholder="공간 유형을 선택해주세요."
                        options={['전시회', '팝업스토어', '체험 전시']}
                        selected={selectedValues.type}
                        isOpen={openId === 'type'}
                        onToggle={handleToggle}
                        onChange={(value: string) => setSelectedValues((prev) => ({ ...prev, type: value }))}
                    />

                    <Dropdown
                        id="spaceInfo"
                        label="공간 사양"
                        placeholder="공간 사양을 선택해주세요."
                        options={[
                            '1-10명, 소형 공간(20평 이하)',
                            '10-30명, 중소 공간(20-50평)',
                            '30-50명, 중형 공간(50-100평)',
                            '50명 이상, 대형 공간(100평 이상)',
                        ]}
                        selected={selectedValues.spaceInfo}
                        isOpen={openId === 'spaceInfo'}
                        onToggle={handleToggle}
                        onChange={(value: string) => setSelectedValues((prev) => ({ ...prev, spaceInfo: value }))}
                    />
                </div>

                <Dropdown
                    id="mood"
                    label="공간 분위기"
                    placeholder="공간 분위기를 선택해주세요."
                    options={['화이트 박스', '인더스트리얼', '빈티지•클래식', '자연•채광', '집중형 조명']}
                    selected={selectedValues.mood}
                    isOpen={openId === 'mood'}
                    onToggle={handleToggle}
                    onChange={(value: string) => setSelectedValues((prev) => ({ ...prev, mood: value }))}
                />
            </div>
            {/* 6. 시설 옵션 */}
            <div className="flex flex-col gap-4 w-full max-w-[1040px]">
                <SectionHeader number={6} title="시설 옵션" />

                <div className="flex flex-col gap-4">
                    <span className="text-lg text-primary-300 ml-1">시설 옵션 (선택)</span>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-3 rounded-lg border border-primary-300">
                        {facilityOptions.map((facility) => (
                            <label key={facility.value} className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    className="accent-primary-300"
                                    checked={facility.checked}
                                    onChange={() => handleFacilityChange(facility.value as keyof typeof facilities)}
                                />
                                <span>{facility.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
            {/* 7. 문의 방법 */}
            <div className="flex flex-col gap-4 w-full max-w-[1040px]">
                <SectionHeader number={7} title="문의 방법" />

                <div className="grid grid-cols-2 gap-4">
                    <FormInput
                        label="연락처"
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                        placeholder="연락 가능한 전화번호를 입력해주세요. (예: 010-1234-5678)"
                    />

                    <FormInput label="이메일" value={email} onChange={setEmail} placeholder="이메일 주소를 입력해주세요." />

                    <FormInput label="웹사이트 (선택)" value={website} onChange={setWebsite} placeholder="공간 웹사이트 URL을 입력해주세요." />

                    <FormInput label="SNS (선택)" value={sns} onChange={setSns} placeholder="인스타그램, 페이스북 등 SNS URL을 입력해주세요." />
                </div>
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
                                address,
                                detailAddress,
                                phoneNumber,
                                email,
                                website,
                                sns,
                                selectedValues: {
                                    ...selectedValues,
                                    facilities: Object.entries(facilities)
                                        .filter(([, checked]) => checked)
                                        .map(([key]) => {
                                            if (key === 'wifi') return '와이파이';
                                            if (key === 'restroom') return '화장실';
                                            if (key === 'lounge') return '휴게 공간';
                                            if (key === 'parking') return '주차장';
                                            if (key === 'elevator') return '엘리베이터';
                                            if (key === 'wheelchair') return '휠체어 접근 가능F';
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
                            setIsModalOpen(true);
                        }
                    }}
                >
                    등록하기
                </button>
            </div>
            {/* 등록 확인 모달 */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
                    <div className="bg-white w-[450px] p-8 rounded-2xl relative shadow-lg">
                        <button onClick={closeModal} className="absolute top-4 right-4 text-default-gray-500">
                            <X size={20} />
                        </button>
                        <p className="text-center text-base mb-6 leading-relaxed">
                            공간이 정상적으로 등록되었습니다!
                            <br />
                            승인까지 영업일 기준 2~3일 소요될 수 있습니다.
                            <br />
                            <span className="text-default-gray-600">승인 결과는 마이페이지에서 확인할 수 있습니다.</span>
                        </p>
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
