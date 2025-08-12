import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Dropdown from '../Components/Dropdown/Dropdown';
import DatePicker from '../Components/Dropdown/DatePicker';
import Pagination from '../Components/Pagination/Pagination';
import exhibitionImage from '../../images/exhibitionImage.png';

type Exhibition = {
    title: string;
    type: string;
    format: string;
    period: string;
    location: string;
    image: string;
};

type FilterKey = 'type' | 'region' | 'format' | 'date';

// 더미 전시 데이터
const exhibitionData: Exhibition[] = [
    {
        title: '론 뮤익',
        type: '조각•설치',
        format: '전시회',
        period: '2025-08-11 ~ 2025-08-13',
        location: '서울특별시 종로구 삼청로 30 지하1층',
        image: exhibitionImage,
    },
    {
        title: '론 뮤익',
        type: '회화',
        format: '전시회',
        period: '2025-08-11 ~ 2025-08-14',
        location: '서울특별시 성동구 아차산로 33',
        image: exhibitionImage,
    },
    {
        title: '론 뮤익',
        type: '조각•설치',
        format: '전시회',
        period: '2025-08-11 ~ 2025-08-30',
        location: '서울특별시 종로구 삼청로 30 지하1층',
        image: exhibitionImage,
    },
    {
        title: '론 뮤익',
        type: '공예•디자인',
        format: '팝업 스토어',
        period: '2025-04-11 ~ 2025-07-13',
        location: '서울특별시 종로구 삼청로 30 지하1층',
        image: exhibitionImage,
    },
    {
        title: '론 뮤익',
        type: '조각•설치',
        format: '전시회',
        period: '2025-04-11 ~ 2025-07-13',
        location: '서울특별시 종로구 삼청로 30 지하1층',
        image: exhibitionImage,
    },
    {
        title: '론 뮤익',
        type: '조각•설치',
        format: '전시회',
        period: '2025-08-01 ~ 2025-08-13',
        location: '서울특별시 종로구 삼청로 30 지하1층',
        image: exhibitionImage,
    },
    {
        title: '론 뮤익',
        type: '조각•설치',
        format: '체험 전시',
        period: '2025-04-11 ~ 2025-07-13',
        location: '서울특별시 종로구 삼청로 30 지하1층',
        image: exhibitionImage,
    },
    {
        title: '론 뮤익',
        type: '조각•설치',
        format: '전시회',
        period: '2025-04-11 ~ 2025-07-13',
        location: '서울특별시 종로구 삼청로 30 지하1층',
        image: exhibitionImage,
    },
    {
        title: '론 뮤익',
        type: '조각•설치',
        format: '체험 전시',
        period: '2025-04-11 ~ 2025-07-13',
        location: '서울특별시 종로구 삼청로 30 지하1층',
        image: exhibitionImage,
    },
    {
        title: '론 뮤익',
        type: '조각•설치',
        format: '전시회',
        period: '2025-04-11 ~ 2025-07-13',
        location: '서울특별시 종로구 삼청로 30 지하1층',
        image: exhibitionImage,
    },
];

export default function ExhibitionSearch() {
    // 검색 조건 상태 관리
    const [filters, setFilters] = useState<Record<FilterKey, string>>({
        type: '',
        region: '',
        format: '',
        date: '',
    });
    const [filteredList, setFilteredList] = useState<Exhibition[]>([]);

    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 8;

    const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState('리뷰 많은 순');
    const sortOptions = ['리뷰 많은 순', '인기순', '최신순'];

    const toggleSortMenu = () => setIsSortMenuOpen((prev) => !prev);

    // 정렬 옵션 선택 핸들러
    const handleSortSelect = (option: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedSort(option);
        setIsSortMenuOpen(false);
    };

    // 검색 조건 변경 함수
    const updateFilter = (key: FilterKey, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    // DatePicker에 맞는 날짜 포맷 함수 (value용, yyyy-mm-dd)
    const formatDateForValue = (date: Date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    };

    // DatePicker에 맞는 날짜 포맷 함수 (표시용, yyyy.mm.dd)
    const formatDateForDisplay = (dateStr: string) => {
        if (!dateStr) return '날짜 선택';
        const date = new Date(dateStr);
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}.${m}.${d}`;
    };

    // 검색 버튼 클릭 시 조건에 맞는 전시 필터링 함수
    const handleSearch = () => {
        const result = exhibitionData.filter((ex) => {
            const exRegion = ex.location.includes('구') ? ex.location.split(' ').find((word) => word.endsWith('구')) || '' : '';

            const matchType = !filters.type || ex.type === filters.type;
            const matchRegion = !filters.region || exRegion === filters.region;
            const matchFormat = !filters.format || ex.format === filters.format;

            const matchDate =
                !filters.date ||
                (new Date(filters.date) >= new Date(ex.period.split(' ~ ')[0]) && new Date(filters.date) <= new Date(ex.period.split(' ~ ')[1]));

            return matchType && matchRegion && matchFormat && matchDate;
        });

        setFilteredList(result);
        setCurrentPage(1);
    };

    // 페이지네이션 계산
    const totalPages = Math.ceil(filteredList.length / perPage);
    const paginatedResults = filteredList.slice((currentPage - 1) * perPage, currentPage * perPage);

    return (
        <>
            {/* 드롭다운 */}
            <Dropdown
                selectedOptions={filters}
                onDropdownChange={updateFilter}
                dropdowns={[
                    { key: 'type', label: '전시 유형', options: ['회화', '조각•설치', '사진•미디어 아트'] },
                    {
                        key: 'region',
                        label: '지역 선택',
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
                    },

                    { key: 'format', label: '전시 형태', options: ['전시회', '팝업 스토어', '체험 전시'] },
                ]}
                onSearch={handleSearch}
            >
                <DatePicker
                    value={filters.date}
                    onChange={(date: string) => updateFilter('date', date)}
                    formatDisplayDate={formatDateForDisplay}
                    formatDate={formatDateForValue}
                />
            </Dropdown>

            {/* 정렬 메뉴 */}
            {filteredList.length > 0 && (
                <div className="w-full max-w-[1450px] mx-auto flex justify-end pr-2 mb-6">
                    <div className="w-[130px] h-[40px] flex items-center justify-center text-[#999999] select-none border border-[#E45F5F] rounded-[15px]">
                        <div className="relative cursor-pointer select-none flex items-center w-[130px] px-2" onClick={toggleSortMenu}>
                            <span className="flex-grow text-center font-semibold text-[#E45F5F]">{selectedSort}</span>
                            <div className="flex-shrink-0 w-4 ml-1">
                                <ChevronDown className="text-[#E45F5F]" size={16} />
                            </div>
                            {isSortMenuOpen && (
                                <ul className="absolute top-full left-1/2 mt-4 w-[130px] bg-white border border-[#E45F5F] rounded-[15px] z-10 -translate-x-1/2 transform overflow-hidden">
                                    {sortOptions.map((option) => (
                                        <li
                                            key={option}
                                            className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-center ${option === selectedSort ? 'text-[#E45F5F]' : ''}`}
                                            onClick={(e) => handleSortSelect(option, e)}
                                        >
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* 전시 리스트 및 페이지네이션 */}
            <div className="w-full max-w-[1450px] mx-auto">
                {filteredList.length === 0 ? (
                    <p className="text-center text-[50px] font-semibold my-20">
                        카테고리를 선택해서
                        <br />
                        나에게 딱 맞는 전시를 찾아보세요!
                    </p>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-center">
                            {paginatedResults.map((ex, index) => (
                                <div
                                    key={`${ex.title}-${index}`}
                                    className="max-w-[350px] w-full bg-[#FDF4F4] rounded-[20px] shadow-[0_6px_10px_0_rgba(0,0,0,0.1)] p-6"
                                >
                                    <img src={ex.image} alt={ex.title} className="rounded-[15px] w-full h-[180px] object-cover" />
                                    <h3 className="text-xl mt-4">{ex.title}</h3>
                                    <div className="mt-2 grid grid-rows-2">
                                        <div className="flex items-start gap-3 min-h-[30px]">
                                            <span className="w-[81px] flex-shrink-0 bg-[#F46D6D] text-white px-2 py-1 rounded-[10px] text-center">기간</span>
                                            <span>{ex.period}</span>
                                        </div>
                                        <div className="flex items-start gap-3 min-h-[30px]">
                                            <span className="w-[81px] flex-shrink-0 bg-[#F46D6D] text-white px-2 py-1 rounded-[10px] text-center">장소</span>
                                            <span>{ex.location}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Pagination page={currentPage} totalPages={totalPages} setPage={setCurrentPage} />
                    </>
                )}
            </div>
        </>
    );
}
