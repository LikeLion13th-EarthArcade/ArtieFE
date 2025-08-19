import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import SearchDropdown from '../Components/Dropdown/SearchDropdown';
import ExhibitionMiniCard from '../Components/Exhibition/ExhibitionMiniCard';
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
            <SearchDropdown
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
                    { key: 'date', label: '날짜', options: [] },
                ]}
                onSearch={handleSearch}
            ></SearchDropdown>

            {/* 정렬 메뉴 */}
            {filteredList.length > 0 && (
                <div className="w-[70%] max-w-[1450px] mx-auto flex justify-end pr-2 mb-4">
                    <div
                        className="w-[110px] h-[35px] flex items-center justify-center select-none border rounded-xl"
                        style={{
                            color: 'var(--color-default-gray-600)',
                            border: '1px solid var(--color-primary-300)',
                        }}
                    >
                        <div className="relative cursor-pointer select-none flex items-center w-[130px] px-2" onClick={toggleSortMenu}>
                            <span className="flex-grow text-sm text-center font-semibold" style={{ color: 'var(--color-primary-300)' }}>
                                {selectedSort}
                            </span>
                            <div className="flex-shrink-0 w-4 ml-1">
                                <ChevronDown style={{ color: 'var(--color-primary-300)' }} size={16} />
                            </div>
                            {isSortMenuOpen && (
                                <ul
                                    className="absolute top-full left-1/2 mt-4 w-[110px] text-sm bg-white border rounded-xl z-10 -translate-x-1/2 transform overflow-hidden"
                                    style={{ border: '1px solid var(--color-primary-300)' }}
                                >
                                    {sortOptions.map((option) => (
                                        <li
                                            key={option}
                                            className={`px-4 py-2 hover:bg-[var(--color-default-gray-100)] cursor-pointer text-center ${option === selectedSort ? 'text-[var(--color-primary-300)]' : ''}`}
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
            <div className="w-[70%] max-w-[1450px] mx-auto">
                {filteredList.length === 0 ? (
                    <p className="text-center text-4xl font-semibold my-20 leading-relaxed">
                        카테고리를 선택해서
                        <br />
                        나에게 딱 맞는 전시를 찾아보세요!
                    </p>
                ) : (
                    <>
                        <div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-center">
                                {paginatedResults.map((ex) => (
                                    <ExhibitionMiniCard key={ex.title} ex={ex} />
                                ))}
                            </div>
                        </div>

                        {filteredList.length > 0 && (
                            <div className="my-10 flex justify-center">
                                <Pagination page={currentPage} totalPages={totalPages} setPage={setCurrentPage} />
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}
