import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import SearchDropdown from '../Components/Dropdown/SearchDropdown';
import ExhibitionMiniCard from '../Components/Exhibition/ExhibitionMiniCard';
import Pagination from '../Components/Pagination/Pagination';
import { searchExhibitions } from '@/api/exhibitions/exhibitions';
import type { ExhibitionSearchItem } from '@/types/exhibitions/exhibitions';

type FilterKey = 'type' | 'region' | 'format' | 'date';

export default function ExhibitionSearch() {
    const [filters, setFilters] = useState({
        type: '',
        region: '',
        format: '',
        date: '',
    });

    const [exhibitions, setExhibitions] = useState<ExhibitionSearchItem[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // 정렬 상태
    const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState('최신순');

    const sortOptions = ['최신순', '인기순', '오래된순'];

    const sortMap: Record<string, 'NEW' | 'OLD' | 'POPULAR'> = {
        최신순: 'NEW',
        오래된순: 'OLD',
        인기순: 'POPULAR',
    };

    const categoryMap: Record<string, string> = {
        '회화': 'PAINTING',
        '조각•설치': 'SCULPTURE_INSTALLATION',
        '공예•디자인': 'CRAFT_DESIGN',
        '사진•미디어 아트': 'PHOTO_MEDIA_ART',
    };

    const moodMap: Record<string, string> = {
        '전시회': 'SOLO',
        '팝업 스토어': 'DATE',
        '체험 전시': 'TRENDY',
    };

    // 정렬 토글
    const toggleSortMenu = () => setIsSortMenuOpen((prev) => !prev);

    // 정렬 옵션 선택 핸들러
    const handleSortSelect = (option: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedSort(option);
        setIsSortMenuOpen(false);
        setCurrentPage(1);
    };

    // 필터 업데이트
    const updateFilter = (key: FilterKey, value: string) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
        setCurrentPage(1);
    };

    const fetchExhibitions = async () => {
        try {
            const apiParams = {
                category: categoryMap[filters.type] || undefined,
                distinct: filters.region || undefined,
                mood: moodMap[filters.format] || undefined,
                localDate: filters.date || undefined,
                sort: sortMap[selectedSort],
                page: currentPage - 1,
            };

            console.log('현재 필터:', filters);
            console.log('API 파라미터:', apiParams);
            console.log('실제 전송되는 파라미터:', JSON.stringify(apiParams, null, 2));

            const res = await searchExhibitions(apiParams);

            console.log('API 응답:', res);
            console.log('아이템 개수:', res.result?.items?.length || 0);

            if (res.isSuccess) {
                setExhibitions(res.result.items);
                setTotalPages(res.result.pageInfo.totalPages);
            }
        } catch (err) {
            console.error('전시 검색 실패:', err);
        }
    };

    useEffect(() => {
        fetchExhibitions();
    }, [filters, selectedSort, currentPage]);

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
                onSearch={fetchExhibitions}
            />

            {/* 정렬 메뉴 */}
            {exhibitions.length > 0 && (
                <div className="w-[70%] max-w-[1450px] mx-auto flex justify-end pr-2 mb-4">
                    <div className="w-[100px] h-[35px] text-default-gray-600 border border-primary-300 flex items-center justify-center select-none rounded-xl">
                        <div className="relative cursor-pointer select-none flex items-center w-[130px] px-2" onClick={toggleSortMenu}>
                            <span className="flex-grow text-sm text-primary-300 text-center font-semibold">{selectedSort}</span>
                            <div className="flex-shrink-0 w-4 ml-1">
                                <ChevronDown className="text-primary-300" size={16} />
                            </div>
                            {isSortMenuOpen && (
                                <ul className="absolute top-full left-1/2 mt-4 w-[110px] text-sm bg-white border border-primary-300 rounded-xl z-10 -translate-x-1/2 transform overflow-hidden">
                                    {sortOptions.map((option) => (
                                        <li
                                            key={option}
                                            className={`px-4 py-2 hover:bg-default-gray-400 cursor-pointer text-center ${option === selectedSort ? 'text-primary-300' : ''}`}
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
                {exhibitions.length === 0 ? (
                    <p className="text-center text-4xl font-semibold my-20 leading-relaxed">
                        카테고리를 선택해서
                        <br />
                        나에게 딱 맞는 전시를 찾아보세요!
                    </p>
                ) : (
                    <>
                        <div>
                            <div className="grid grid-cols-4 gap-8 justify-center">
                                {exhibitions.map((ex) => (
                                    <ExhibitionMiniCard
                                        key={ex.exhibitionId}
                                        ex={{
                                            exhibitionId: ex.exhibitionId,
                                            title: ex.title,
                                            image: ex.thumbnail,
                                            period: `${ex.startDate} ~ ${ex.endDate}`,
                                            location: ex.address,
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="my-10 flex justify-center">
                            <Pagination page={currentPage} totalPages={totalPages} setPage={setCurrentPage} />
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
