import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import exhibition_icon from '../../icons/exhibition_icon.svg';
import check from '../../icons/check.svg';
import chat from '../../icons/chat.svg';
import { Heart, Star, ChevronRight } from 'lucide-react';
import posterImage from '../../images/poster.png';

interface Exhibition {
    id: number;
    title: string;
    status: string;
    hashtags: string[];
}

interface Space {
    id: number;
    name: string;
    address: string;
}

interface Review {
    id: number;
    title: string;
    type: 'exhibition' | 'space';
    rating: number;
    date: string;
    content: string;
}

export default function MyActivity() {
    const navigate = useNavigate();

    const exhibitions: Exhibition[] = [
        {
            id: 1,
            title: '론 뮤익',
            status: '전시중',
            hashtags: ['사진•미디어아트', '전시회', '트렌디'],
        },
    ];

    const spaces: Space[] = [
        {
            id: 1,
            name: 'Gallery hoM',
            address: '서울시 종로구 삼청로 124-1 갤러리 에이치오엠',
        },
    ];

    const reviews: Review[] = [
        {
            id: 1,
            title: '론 뮤익',
            type: 'exhibition',
            rating: 5,
            date: '2025.06.01',
            content: '손가락 하나하나의 결이 섬세하게 재현돼 감탄이 절로 나왔습니다. 관람 동선이 잘 설계돼 작품마다 충분히...',
        },
        {
            id: 2,
            title: '스튜디오 1',
            type: 'space',
            rating: 5,
            date: '2025.06.01',
            content: '손가락 하나하나의 결이 섬세하게 재현돼 감탄이 절로 나왔습니다. 관람 동선이 잘 설계돼 작품마다 충분히...',
        },
    ];

    // 찜 여부 관리
    const [favoriteExhibitions, setFavoriteExhibitions] = useState<boolean[]>(new Array(exhibitions.length).fill(true));
    const [favoriteSpaces, setFavoriteSpaces] = useState<boolean[]>(new Array(spaces.length).fill(true));

    // 찜 토글
    const toggleExhibitionFavorite = (index: number) => {
        const newFavorites = [...favoriteExhibitions];
        newFavorites[index] = !newFavorites[index];
        setFavoriteExhibitions(newFavorites);
    };

    const toggleSpaceFavorite = (index: number) => {
        const newFavorites = [...favoriteSpaces];
        newFavorites[index] = !newFavorites[index];
        setFavoriteSpaces(newFavorites);
    };

    // 상세 페이지로 이동
    const goToExhibition = (id: number) => {
        navigate(`/exhibitions/${id}`);
    };
    const goToSpace = (id: number) => {
        navigate(`/spaces/${id}`);
    };
    const goToReviewTarget = (review: Review) => {
        if (review.type === 'exhibition') {
            navigate(`/exhibitions/${review.id}`);
        } else if (review.type === 'space') {
            navigate(`/spaces/${review.id}`);
        }
    };

    return (
        <div className="flex items-center gap-5">
            <main className="flex-1">
                <div className="w-full bg-white rounded-2xl shadow-lg p-10">
                    <h1 className="text-2xl font-bold mb-6">내 활동 보기</h1>
                    <div className="flex flex-col gap-4">
                        {/* 찜한 전시 */}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 w-full">
                                <img src={exhibition_icon} alt="전시 아이콘" className="w-4 h-4" />
                                <span>찜한 전시</span>
                                <span className="text-xs text-default-gray-600">({exhibitions.length}개)</span>
                            </div>
                            {exhibitions.map((exhibition, idx) => (
                                <div key={exhibition.id} className="flex items-center justify-between gap-2 w-full bg-primary-100/10 rounded-xl p-4">
                                    <div className="flex items-center gap-4">
                                        <img src={posterImage} alt="전시 포스터" className="w-28 h-20 object-cover rounded-lg" />
                                        <div className="flex flex-col gap-1">
                                            <span className="w-13 text-center bg-primary-300 text-white text-xs px-2 py-1 rounded-full">
                                                {exhibition.status}
                                            </span>
                                            <div className="flex items-center cursor-pointer" onClick={() => goToExhibition(exhibition.id)}>
                                                <span className="font-semibold text-primary-300">{exhibition.title}</span>
                                                <ChevronRight className="w-5 h-5 text-primary-300" />
                                            </div>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {exhibition.hashtags.map((tag, tagIdx) => (
                                                    <span key={tagIdx} className="py-1 text-xs text-gray-600">
                                                        #{tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <Heart
                                        className={`w-5 h-5 cursor-pointer ${
                                            favoriteExhibitions[idx] ? 'text-[#F46464] fill-[#F46464]' : 'text-gray-400 hover:text-[#F46464]'
                                        }`}
                                        onClick={() => toggleExhibitionFavorite(idx)}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* 찜한 공간 */}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 w-full">
                                <img src={check} alt="공간 아이콘" className="w-4 h-4" />
                                <span>찜한 공간</span>
                                <span className="text-xs text-default-gray-600">({spaces.length}개)</span>
                            </div>
                            {spaces.map((space, idx) => (
                                <div key={space.id} className="flex items-center justify-between gap-2 w-full bg-primary-100/10 rounded-xl p-4">
                                    <div className="flex items-center gap-4">
                                        <img src={posterImage} alt="공간 이미지" className="w-28 h-20 object-cover rounded-lg" />
                                        <div>
                                            <div className="flex cursor-pointer" onClick={() => goToSpace(space.id)}>
                                                <span className="font-semibold text-[#F46464]">{space.name}</span>
                                                <ChevronRight className="w-5 h-5 text-primary-300" />
                                            </div>
                                            <div className="text-xs text-gray-600 mt-1">{space.address}</div>
                                        </div>
                                    </div>
                                    <Heart
                                        className={`w-5 h-5 cursor-pointer ${
                                            favoriteSpaces[idx] ? 'text-[#F46464] fill-[#F46464]' : 'text-gray-400 hover:text-[#F46464]'
                                        }`}
                                        onClick={() => toggleSpaceFavorite(idx)}
                                    />
                                </div>
                            ))}
                        </div>

                        {/* 내가 쓴 리뷰 */}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 w-full">
                                <img src={chat} alt="리뷰 아이콘" className="w-4 h-4" />
                                <span>내가 쓴 리뷰</span>
                                <span className="text-xs text-default-gray-600">({reviews.length}개)</span>
                            </div>
                            {reviews.map((review) => (
                                <div key={review.id} className="flex flex-col gap-2 w-full bg-primary-100/10 rounded-xl p-4">
                                    <div className="flex items-center gap-3">
                                        <span className="font-semibold">{review.title}</span>
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-[#F46464] fill-[#F46464]' : 'text-gray-300'}`} />
                                            ))}
                                        </div>
                                        <span className="text-xs text-gray-400">{review.date}</span>
                                        <ChevronRight className="w-5 h-5 text-primary-300 cursor-pointer" onClick={() => goToReviewTarget(review)} />
                                    </div>
                                    <p className="text-sm text-gray-700 line-clamp-2">{review.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
