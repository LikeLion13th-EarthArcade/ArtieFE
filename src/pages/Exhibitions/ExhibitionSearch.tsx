import { useCallback, useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import SearchDropdown from '../Components/Dropdown/SearchDropdown';
import ExhibitionMiniCard from '../Components/Exhibition/ExhibitionMiniCard';
import Pagination from '../Components/Pagination/Pagination';
import { searchExhibitions } from '@/api/exhibitions/exhibitions';
import type { CategoryType, MoodType, ExhibitionSearchItem } from '@/types/exhibitions/exhibitions';

type FilterKey = 'type' | 'region' | 'mood' | 'date';

export default function ExhibitionSearch() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [filters, setFilters] = useState({
        type: searchParams.get('type') ?? '',
        region: searchParams.get('region') ?? '',
        mood: searchParams.get('mood') ?? '',
        date: searchParams.get('date') ?? '',
    });

    const [exhibitions, setExhibitions] = useState<ExhibitionSearchItem[]>([]);
    const [currentPage, setCurrentPage] = useState(() => {
        const pageParam = searchParams.get('page');
        return pageParam ? Number(pageParam) : 1;
    });
    const [totalPages, setTotalPages] = useState(1);

    const sortOptions = ['최신순', '인기순', '오래된순'];

    const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
    const [selectedSort, setSelectedSort] = useState(() => {
        const sortParam = searchParams.get('sort');
        if (sortParam && sortOptions.includes(sortParam)) return sortParam;
        return '최신순';
    });

    const sortMap: Record<string, 'NEW' | 'OLD' | 'POPULAR'> = {
        최신순: 'NEW',
        오래된순: 'OLD',
        인기순: 'POPULAR',
    };

    const categoryMap: Record<string, CategoryType> = {
        '회화': 'PAINTING',
        '조각•설치': 'SCULPTURE_INSTALLATION',
        '공예•디자인': 'CRAFT_DESIGN',
        '사진•미디어 아트': 'PHOTO_MEDIA_ART',
    };

    const moodMap: Record<string, MoodType> = {
        '혼자 보기 좋은': 'SOLO',
        '데이트 하기 좋은': 'DATE',
        '트렌디한 MZ 감성이 있는': 'TRENDY',
        '가족과 즐기기 좋은': 'FAMILY',
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

    const fetchExhibitions = useCallback(async () => {
        try {
            const apiParams = {
                exhibitionCategory: categoryMap[filters.type] || undefined,
                exhibitionMood: moodMap[filters.mood] || undefined,
                distinct: filters.region || undefined,
                localDate: filters.date || undefined,
                sort: sortMap[selectedSort],
                page: currentPage - 1,
            };

            console.log('현재 필터:', filters);
            console.log('API 파라미터:', apiParams);

            const res = await searchExhibitions(apiParams);

            console.log('API 응답:', res);

            if (res.isSuccess && res.result && res.result.page) {
                const { page } = res.result;

                const items = Array.isArray(page.content) ? page.content : [];
                console.log('파싱된 items:', items);

                setExhibitions(items);
                setTotalPages(page.totalPages ?? 1);
            } else {
                setExhibitions([]);
                setTotalPages(1);
            }
        } catch (err) {
            console.error('전시 검색 실패:', err);
            setExhibitions([]);
            setTotalPages(1);
        }
    }, [filters, selectedSort, currentPage]);

    useEffect(() => {
        fetchExhibitions();
    }, [fetchExhibitions]);

    useEffect(() => {
        const params: Record<string, string> = {};

        if (filters.type) params.type = filters.type;
        if (filters.region) params.region = filters.region;
        if (filters.mood) params.mood = filters.mood;
        if (filters.date) params.date = filters.date;

        params.sort = selectedSort;
        params.page = String(currentPage);

        setSearchParams(params, { replace: true });
    }, [filters, selectedSort, currentPage, setSearchParams]);

    return (
        <>
            {/* 드롭다운 */}
            <SearchDropdown
                selectedOptions={filters}
                onDropdownChange={updateFilter}
                dropdowns={[
                    { key: 'type', label: '전시 유형', options: ['회화', '조각•설치', '공예•디자인', '사진•미디어 아트'] },
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

                    {
                        key: 'mood',
                        label: '전시 분위기',
                        options: ['혼자 보기 좋은', '데이트 하기 좋은', '트렌디한 MZ 감성이 있는', '가족과 즐기기 좋은'],
                    },
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
                            <div className="grid grid-cols-4 gap-8 justify-center items-stretch">
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
