import { useEffect, useState } from 'react';
import Dropdown from '../Components/Dropdown/Dropdown';
import ExhibitionMiniCard from '../Components/Exhibition/ExhibitionMiniCard';

import sample1 from '../../images/sample1.jpeg';
import sample2 from '../../images/sample2.jpeg';
import sample3 from '../../images/sample3.jpeg';
import sample4 from '../../images/sample4.jpeg';
import sample5 from '../../images/sample5.jpeg';

interface Space {
    id: number;
    name: string;
    type: string;
    location: string;
    title: string;
    image: string;
    period: string;
    spec: string;
    purpose: string;
    concept: string;
}

export default function SpaceList() {
    const [openDropdown, setOpenDropdown] = useState<string>('');
    const [selected, setSelected] = useState<{ [key: string]: string }>({});
    const [showMore, setShowMore] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(9); // 기본값

    const handleToggle = (id: string) => setOpenDropdown(openDropdown === id ? '' : id);
    const handleChange = (id: string, value: string) => {
        setSelected((prev) => ({ ...prev, [id]: value }));
        setOpenDropdown('');
        setCurrentPage(1); // 필터 변경 시 첫 페이지로
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

    const spaces: Space[] = [
        {
            id: 1,
            name: '아트스페이스 청담',
            type: '갤러리',
            location: '강남구',
            title: '현대미술 전시공간',
            image: sample1,
            period: '1주일',
            spec: '1-10명',
            purpose: '전시회',
            concept: '화이트 박스',
        },
        {
            id: 2,
            name: '카페 온더코너',
            type: '카페',
            location: '마포구',
            title: '복합문화공간 카페',
            image: sample2,
            period: '1개월',
            spec: '10-30명',
            purpose: '팝업 스토어',
            concept: '빈티지•클래식',
        },
        {
            id: 3,
            name: '스튜디오 이스트',
            type: '스튜디오',
            location: '성동구',
            title: '인더스트리얼 촬영 스튜디오',
            image: sample3,
            period: '1일',
            spec: '30-50명',
            purpose: '체험형 전시•워크숍',
            concept: '인더스트리얼',
        },
        {
            id: 4,
            name: '갤러리 종로',
            type: '갤러리',
            location: '종로구',
            title: '전통과 현대가 만나는 공간',
            image: sample4,
            period: '2주일',
            spec: '1-10명',
            purpose: '전시회',
            concept: '자연•채광',
        },
        {
            id: 5,
            name: '루프탑 라운지',
            type: '카페',
            location: '용산구',
            title: '하늘이 보이는 전시공간',
            image: sample5,
            period: '1개월',
            spec: '50명 이상',
            purpose: '팝업 스토어',
            concept: '자연•채광',
        },
        {
            id: 6,
            name: '팩토리 스페이스',
            type: '스튜디오',
            location: '영등포구',
            title: '공업지대 복합문화공간',
            image: sample1,
            period: '3일',
            spec: '30-50명',
            purpose: '체험형 전시•워크숍',
            concept: '인더스트리얼',
        },
        {
            id: 7,
            name: '화이트 큐브',
            type: '갤러리',
            location: '서초구',
            title: '미니멀 전시공간',
            image: sample2,
            period: '1주일',
            spec: '10-30명',
            purpose: '전시회',
            concept: '화이트 박스',
        },
        {
            id: 8,
            name: '빈티지 하우스',
            type: '카페',
            location: '강북구',
            title: '복고풍 감성공간',
            image: sample3,
            period: '2개월',
            spec: '1-10명',
            purpose: '팝업 스토어',
            concept: '빈티지•클래식',
        },
        {
            id: 9,
            name: '라이트 스튜디오',
            type: '스튜디오',
            location: '송파구',
            title: '프리미엄 조명 스튜디오',
            image: sample4,
            period: '1일',
            spec: '10-30명',
            purpose: '체험형 전시•워크숍',
            concept: '집중형 조명',
        },
        {
            id: 10,
            name: '아뜰리에 북촌',
            type: '갤러리',
            location: '종로구',
            title: '한옥 개조 갤러리',
            image: sample5,
            period: '1주일',
            spec: '1-10명',
            purpose: '전시회',
            concept: '빈티지•클래식',
        },
        {
            id: 11,
            name: '그린 라운지',
            type: '카페',
            location: '서대문구',
            title: '식물과 함께하는 공간',
            image: sample1,
            period: '1개월',
            spec: '30-50명',
            purpose: '팝업 스토어',
            concept: '자연•채광',
        },
        {
            id: 12,
            name: '언더그라운드 스페이스',
            type: '스튜디오',
            location: '중구',
            title: '지하 인더스트리얼 공간',
            image: sample2,
            period: '2일',
            spec: '50명 이상',
            purpose: '체험형 전시•워크숍',
            concept: '인더스트리얼',
        },
        {
            id: 13,
            name: '스포트라이트 갤러리',
            type: '갤러리',
            location: '강남구',
            title: '조명이 아름다운 갤러리',
            image: sample3,
            period: '10일',
            spec: '10-30명',
            purpose: '전시회',
            concept: '집중형 조명',
        },
        {
            id: 14,
            name: '올드 브루어리',
            type: '카페',
            location: '마포구',
            title: '옛 양조장을 개조한 카페',
            image: sample4,
            period: '3개월',
            spec: '30-50명',
            purpose: '팝업 스토어',
            concept: '빈티지•클래식',
        },
        {
            id: 15,
            name: '미니멀 스튜디오',
            type: '스튜디오',
            location: '성북구',
            title: '깔끔한 화이트 스튜디오',
            image: sample5,
            period: '1일',
            spec: '1-10명',
            purpose: '체험형 전시•워크숍',
            concept: '화이트 박스',
        },
        {
            id: 16,
            name: '선라이트 갤러리',
            type: '갤러리',
            location: '강동구',
            title: '자연광이 풍부한 갤러리',
            image: sample1,
            period: '2주일',
            spec: '50명 이상',
            purpose: '전시회',
            concept: '자연•채광',
        },
        {
            id: 17,
            name: '로컬 브랜드 스페이스',
            type: '카페',
            location: '동작구',
            title: '로컬 브랜드 전용 공간',
            image: sample2,
            period: '1개월',
            spec: '10-30명',
            purpose: '팝업 스토어',
            concept: '집중형 조명',
        },
        {
            id: 18,
            name: '워크숍 팩토리',
            type: '스튜디오',
            location: '구로구',
            title: '체험활동 전문 스튜디오',
            image: sample3,
            period: '5일',
            spec: '50명 이상',
            purpose: '체험형 전시•워크숍',
            concept: '인더스트리얼',
        },
        {
            id: 19,
            name: '큐브 갤러리',
            type: '갤러리',
            location: '양천구',
            title: '기하학적 구조의 갤러리',
            image: sample4,
            period: '1주일',
            spec: '1-10명',
            purpose: '전시회',
            concept: '화이트 박스',
        },
        {
            id: 20,
            name: '가든 카페',
            type: '카페',
            location: '관악구',
            title: '정원이 있는 복합공간',
            image: sample5,
            period: '2개월',
            spec: '30-50명',
            purpose: '팝업 스토어',
            concept: '자연•채광',
        },
    ];
    // itemsPerPage 동적 계산
    useEffect(() => {
        const updateItemsPerPage = () => {
            const containerHeight = 600; // 고정 높이
            const cardHeight = 200; // 카드 대략 높이
            const rows = Math.floor(containerHeight / cardHeight);
            const cols = 3; // grid-cols-3 기준
            const totalItems = rows * cols;
            setItemsPerPage(totalItems);
        };

        updateItemsPerPage();
        window.addEventListener('resize', updateItemsPerPage);
        return () => window.removeEventListener('resize', updateItemsPerPage);
    }, []);

    // 필터 적용
    const filteredSpaces = spaces.filter((space) => {
        return (
            (!selected.spaceType || space.type === selected.spaceType) &&
            (!selected.location || space.location === selected.location) &&
            (!selected.period || true) &&
            (!selected.spec || true) &&
            (!selected.purpose || true)
        );
    });

    const totalPages = Math.ceil(filteredSpaces.length / itemsPerPage);
    const displayedSpaces = filteredSpaces.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="flex flex-col px-30 mx-auto max-w-7xl py-10">
            <p className="text-default-gray-500 text-sm">원하시는 공간 조건을 선택해주세요.</p>
            <h1 className="text-2xl font-bold mt-2">취향 공간 대여하기</h1>

            {/* 필터 영역 */}
            <div className="flex flex-col gap-4 border border-primary-300 rounded-3xl p-6 mt-2">
                {dropdowns.slice(0, 4).map(({ id, label, options, placeholder }) => (
                    <div key={id} className="flex items-center gap-4">
                        <span className="w-24 text-right text-primary-300">{label}</span>
                        <div className="w-60">
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

                {dropdowns.length > 4 && (
                    <>
                        {!showMore && (
                            <button className="text-primary-300 text-sm mt-2 text-left" onClick={() => setShowMore(true)}>
                                + 필터 더보기
                            </button>
                        )}

                        {showMore &&
                            dropdowns.slice(4).map(({ id, label, options, placeholder }) => (
                                <div key={id} className="flex items-center gap-4 mt-2">
                                    <span className="w-24 text-right text-primary-300">{label}</span>
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
                            ))}
                    </>
                )}
            </div>

            {/* 메인 콘텐츠 */}
            <div className="flex mt-6 gap-6">
                {/* 지도 영역 */}
                <div className="w-1/3 h-[600px] border border-gray-300 rounded-[10px] bg-gray-100 flex items-center justify-center">지도 영역</div>

                {/* 카드 영역 */}
                <div className="w-2/3 flex flex-col">
                    <div className="grid grid-cols-3 gap-4 h-[600px] overflow-hidden">
                        {displayedSpaces.map((space) => (
                            <ExhibitionMiniCard key={space.id} ex={space} />
                        ))}
                    </div>
                </div>
            </div>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                            className={`px-3 py-1 rounded-full ${currentPage === i + 1 ? 'bg-primary-300 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
