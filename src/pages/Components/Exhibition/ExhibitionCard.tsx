import { useState } from 'react';
import { Heart, Star } from 'lucide-react';
import posterImage from '../../../images/poster.png';

export default function ExhibitionCard() {
    const [liked, setLiked] = useState(false);
    const exhibition = {
        title: '론 뮤익',
        rating: 4.5,
        hashtags: ['사진', '미디어아트', '현대미술'],
        place: '서울특별시 종로구 삼청로 30 지하1층관',
        period: '2025.08.15 ~ 2025.09.30',
        description: '국립현대미술관과 까르띠에 현대미술재단은 2025년 4월 11일부터 7월 13일까지 한국 최초로 호주 출신 작가 론 뮤익의 대규모 개인전을 개최한다.',
    };

    return (
        <div className="flex flex-col md:flex-row w-full max-w-4xl mx-auto">
            {/* 포스터 이미지 */}
            <div className="w-full md:w-1/2 relative flex justify-center items-center">
                <img src={posterImage} alt="전시 포스터" className="w-[90%] md:w-[80%] h-auto object-cover rounded-lg shadow mb-4 md:mb-0" />
            </div>

            {/* 전시 정보 */}
            <div className="w-full md:w-1/2 p-4 md:p-6 rounded-xl overflow-hidden shadow-md relative flex flex-col justify-between">
                {/* 좋아요 버튼 */}
                <button onClick={() => setLiked(!liked)} className="absolute top-3 right-3 md:top-4 md:right-4">
                    <Heart size={24} className={liked ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
                </button>

                <div>
                    <h2 className="text-xl md:text-2xl font-bold text-primary-300">{exhibition.title}</h2>

                    {/* 평점 */}
                    <div className="flex items-center gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Star
                                key={i}
                                size={16}
                                className={
                                    exhibition.rating >= i
                                        ? 'fill-primary-300 text-primary-300'
                                        : exhibition.rating >= i - 0.5
                                          ? 'fill-primary-300 text-primary-300 opacity-50'
                                          : 'text-gray-300'
                                }
                            />
                        ))}
                    </div>

                    {/* 해시태그 */}
                    <div className="flex flex-wrap gap-2 mt-2">
                        {exhibition.hashtags.map((tag, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    {/* 전시 장소 */}
                    <div className="flex items-center gap-2 mt-3">
                        <span className="inline-flex items-center justify-center bg-[#F46D6D] rounded-md px-2 py-1 text-white text-xs font-medium">장소</span>
                        <p className="text-gray-500 text-sm md:text-base">{exhibition.place}</p>
                    </div>

                    {/* 전시 기간 */}
                    <div className="flex items-center gap-2 mt-2">
                        <span className="inline-flex items-center justify-center bg-[#F46D6D] rounded-md px-2 py-1 text-white text-xs font-medium">
                            전시기간
                        </span>
                        <p className="text-gray-500 text-sm md:text-base">{exhibition.period}</p>
                    </div>

                    <p className="mt-3 text-sm md:text-base text-gray-700 leading-relaxed line-clamp-3">{exhibition.description}</p>
                </div>

                {/* 하단 버튼 */}
                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                    <button className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 text-sm md:text-base">리뷰 보기</button>
                    <button className="flex-1 px-3 py-2 bg-primary-300 text-white rounded-lg hover:bg-[#d24e4e] text-sm md:text-base">홈페이지 바로가기</button>
                </div>
            </div>
        </div>
    );
}
