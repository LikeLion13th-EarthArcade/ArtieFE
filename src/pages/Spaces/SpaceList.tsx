import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Dropdown from '../Components/Dropdown/Dropdown';
import DatePickerInput from '../Components/Common/DatePickerInput';
import Pagination from '../Components/Pagination/Pagination';
import type { getSpaceListResponse, ISpace } from '@/types/spaces/spaces';
import { getSpaceList } from '@/api/spaces/spaces';
import SpaceMiniCard from '../Components/Spaces/SpaceMiniCard';

export default function SpaceList() {
    const [openDropdown, setOpenDropdown] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [selected, setSelected] = useState<{ [key: string]: string }>({ startDate: '', endDate: '' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;

    const handleToggle = (id: string) => setOpenDropdown(openDropdown === id ? '' : id);
    const handleChange = (id: string, value: string) => {
        setSelected((prev) => ({ ...prev, [id]: value }));
        setOpenDropdown('');
        setCurrentPage(1);
    };

    const dropdowns = [
        {
            id: 'location',
            label: '장소',
            options: [
                '강남구',
                '강동구',
                '강북구',
                '강서구',
                '관악구',
                '광진구',
                '구로구',
                '금천구',
                '노원구',
                '도봉구',
                '동대문구',
                '동작구',
                '마포구',
                '서대문구',
                '서초구',
                '성동구',
                '성북구',
                '송파구',
                '양천구',
                '영등포구',
                '용산구',
                '은평구',
                '종로구',
                '중구',
                '중랑구',
            ],
            placeholder: '지역',
        },
        { id: 'spec', label: '공간 사양', options: ['1-10명', '10-30명', '30-50명', '50명 이상'], placeholder: '수용 인원' },
        { id: 'purpose', label: '목적', options: ['전시회', '팝업 스토어', '체험형 전시•워크숍'], placeholder: '전시 종류' },
        {
            id: 'concept',
            label: '분위기/컨셉',
            options: ['화이트 박스', '인더스트리얼', '빈티지•클래식', '자연•채광', '집중형 조명'],
            placeholder: '공간 종류를 선택하세요',
        },
    ];

    const { data, isLoading, isError } = useQuery<getSpaceListResponse>({
        queryKey: ['spaceList'],
        queryFn: () => getSpaceList(),
    });

    const spaces: ISpace[] = Array.isArray(data?.result) ? data.result : [];

    // 간단한 페이지네이션
    const displayedSpaces = spaces.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(spaces.length / itemsPerPage);

    return (
        <div className="flex flex-col px-30 mx-auto max-w-7xl py-10">
            <p className="text-default-gray-500 text-sm">원하시는 공간 조건을 선택해주세요.</p>
            <h1 className="text-2xl font-bold mt-2">취향 공간 대여하기</h1>

            {/* Dropdown 필터 */}
            <div className="flex flex-col gap-4 border border-primary-300 rounded-3xl p-6 mt-2">
                {/* 전시 기간 */}
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <span className="w-24 text-right text-primary-300">전시 기간</span>
                        <div className="flex gap-3">
                            <DatePickerInput value={startDate} onChange={setStartDate} placeholder="시작일을 선택하세요" />
                            <span className="flex items-center">~</span>
                            <DatePickerInput value={endDate} onChange={setEndDate} placeholder="종료일을 선택하세요" startDate={startDate} isEndDate />
                        </div>
                    </div>
                </div>

                {dropdowns.map(({ id, label, options, placeholder }) => (
                    <div key={id} className="flex items-center gap-4">
                        <span className="w-24 text-right text-primary-300">{label}</span>
                        <div className="flex items-center">
                            <Dropdown
                                id={id}
                                options={options}
                                placeholder={placeholder}
                                selected={selected[id]}
                                isOpen={openDropdown === id}
                                onToggle={handleToggle}
                                onChange={(value) => handleChange(id, value)}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* 지도 + 카드 영역 */}
            <div className="flex mt-6 gap-6">
                <div className="w-1/3 h-[600px] border border-gray-300 rounded-[10px] bg-gray-100 flex items-center justify-center">지도 영역</div>

                <div className="w-2/3 flex flex-col">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-[600px]">로딩중...</div>
                    ) : isError ? (
                        <div className="flex items-center justify-center h-[600px]">오류 발생</div>
                    ) : (
                        <div className="grid grid-cols-3 gap-4 h-[600px] overflow-hidden">
                            {displayedSpaces.map((space) => (
                                <SpaceMiniCard key={space.id} space={space} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* 페이지네이션 */}
            <div className="my-10 flex justify-center">
                <Pagination page={currentPage} totalPages={totalPages} setPage={setCurrentPage} />
            </div>
        </div>
    );
}
