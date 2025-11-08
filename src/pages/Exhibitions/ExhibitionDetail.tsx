import house_icon from '../../icons/house_icon.svg';
import mark_icon from '../../icons/mark_icon.svg';
import chat from '../../icons/chat.svg';
import { useNavigate, useParams } from 'react-router-dom';
import Gallery from '../Components/Exhibition/Gallery';
import { useQuery } from '@tanstack/react-query';
import { getExhibitionDetail } from '@/api/exhibitions/exhibitions';
import type { ExhibitionDetail } from '@/types/exhibitions/exhibitions';
import KakaoMap from '../Components/Common/kakaomap';

// 시설 mapping
const facilityMap: Record<string, string> = {
    RESTROOM: '화장실',
    WIFI: '와이파이',
    STROLLER_RENTAL: '유모차 대여',
};

// 카테고리 mapping
const categoryMap: Record<string, string> = {
    PAINTING: '회화',
    SCULPTURE_INSTALLATION: '조각•설치',
    CRAFT_DESIGN: '공예•디자인',
    PHOTO_MEDIA_ART: '사진•미디어 아트',
};

// 개인전, 단체전 전시 타입 mapping
const typeMap: Record<string, string> = {
    PERSON: '개인전',
    GROUP: '그룹전',
};

// 전시 분위기 mapping
const moodMap: Record<string, string> = {
    SOLO: '1인 관람',
    DATE: '데이트',
    FAMILY: '가족 관람',
    TRENDY: 'MZ',
};

export default function ExhibitionDetail() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const exhibitionId = Number(id);

    const handleReviewClick = () => {
        if (exhibitionId) navigate(`/exhibitions/${exhibitionId}/review`);
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ['exhibitionDetail', exhibitionId],
        queryFn: () => getExhibitionDetail(exhibitionId!),
        enabled: !!exhibitionId,
    });

    if (isLoading) return <p>로딩중...</p>;
    if (error) return <p>에러 발생!</p>;

    const exhibition: ExhibitionDetail | undefined = data?.result;
    console.log(exhibition);
    const formattedTime = exhibition?.openingTime ? exhibition?.openingTime.slice(0, 5) : '정보 없음';

    return (
        <div className="flex flex-col justify-center px-10 py-8 max-w-5xl mx-auto">
            <div className="flex justify-between items-center flex-wrap gap-4">
                <div className="flex gap-3">
                    <h1 className="text-3xl font-bold">{exhibition?.title}</h1>
                    <div className="flex flex-wrap gap-1 mt-2 items-center">
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                            #{categoryMap[exhibition?.exhibitionCategory ?? ''] ?? exhibition?.exhibitionCategory}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                            #{typeMap[exhibition?.exhibitionType ?? ''] ?? exhibition?.exhibitionType}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                            #{moodMap[exhibition?.exhibitionMood ?? ''] ?? exhibition?.exhibitionMood}
                        </span>
                    </div>
                </div>
                {exhibition?.WebsiteUrl && (
                    <a
                        href={exhibition.WebsiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex bg-primary-300 py-2 px-4 rounded-full text-white justify-center items-center w-[200px] gap-2"
                    >
                        <img src={house_icon} alt="홈페이지 아이콘" className="h-5 w-5" />
                        홈페이지 바로가기
                    </a>
                )}
            </div>

            {/* 주소 */}
            <p className="text-gray-400 mt-2">{exhibition?.address}</p>

            {/* 갤러리 */}
            <Gallery images={exhibition?.imageUrls ?? []} />

            {/* 전시 개요 */}
            <div className="mt-8 gap-2">
                <h3 className="font-bold text-xl mb-1 flex items-center gap-2">
                    <img src={mark_icon} alt="" className="w-5 h-5" />
                    전시 개요
                </h3>
                <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-1">기간</h3>
                        <p className="text-gray-600">
                            {exhibition?.startDate} ~ {exhibition?.endDate}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-1">운영 시간</h3>
                        <p className="text-gray-600">{formattedTime}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-1">운영 정보</h3>
                        <p>{exhibition?.operatingInfo ? exhibition?.operatingInfo : '정보 없음'}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-1">입장료</h3>
                        <p className="text-gray-600">{exhibition?.price === 0 ? '무료' : `${exhibition?.price}원`}</p>
                    </div>
                </div>
                <h3 className="text-lg font-semibold mt-5 mb-1">전시 소개</h3>
                <p className="text-gray-600">{exhibition?.description}</p>
                {exhibition?.WebsiteUrl && (
                    <>
                        <h3 className="text-lg font-semibold mt-5 mb-1">예매 링크</h3>
                        <a className="text-gray-600 underline" href={exhibition.WebsiteUrl} target="_blank" rel="noopener noreferrer">
                            {exhibition.WebsiteUrl}
                        </a>
                    </>
                )}
            </div>

            {/* 시설 옵션 */}
            <div className="mt-5 gap-4">
                <h3 className="font-bold text-lg mb-1">시설 옵션</h3>
                <ul className="flex flex-wrap gap-4 list-none text-gray-600">
                    {exhibition?.facilities?.map((f, idx) => (
                        <li key={idx}>{facilityMap[f] ?? f}</li>
                    ))}
                </ul>
            </div>

            <div className="mt-10">
                <h2 className="text-xl font-semibold mb-3">위치 안내</h2>
                <KakaoMap latitude={exhibition?.latitude} longitude={exhibition?.longitude} placeName={exhibition?.address} />
            </div>
            {/* 리뷰 */}
            <div className="mt-8 gap-4">
                <div className="flex flex-wrap justify-between items-center mb-6">
                    <h3 className="font-bold text-xl mb-1 flex items-center gap-2">
                        <img src={chat} alt="" className="w-5 h-5" />
                        리뷰
                    </h3>
                    <button
                        className="flex bg-primary-300 py-2 px-4 rounded-full text-white justify-center items-center w-[170px] gap-2"
                        onClick={handleReviewClick}
                    >
                        리뷰 작성하기
                    </button>
                </div>
                {/* 추후에 컴포넌트로 리뷰를 띄울 예정 */}
            </div>
        </div>
    );
}
