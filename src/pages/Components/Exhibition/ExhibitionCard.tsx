import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Iexhibition } from '@/types/home/home';

interface ExhibitionCardProps {
    exhibition: Iexhibition;
}

export default function ExhibitionCard({ exhibition }: ExhibitionCardProps) {
    // const [liked, setLiked] = useState(exhibition.isLiked);
    const navigate = useNavigate();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date
            .toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            })
            .replace(/\. /g, '.')
            .replace(/\.$/, '');
    };

    const getCategoryHashtags = (category: string, mood: string) => {
        const hashtags = [category];
        if (mood) hashtags.push(mood);
        return hashtags;
    };

    function handleCardClick() {
        navigate(`/exhibitions/${exhibition.exhibitionId}`);
    }

    // const handleLikeClick = () => {
    //     setLiked(!liked);
    //     // 여기에 좋아요 API 호출 로직 추가 가능
    //     // updateLikeMutation.mutate({ exhibitionId: exhibition.exhibitionId, isLiked: !liked });
    // };

    return (
        <div className="flex flex-col md:flex-row w-full max-w-4xl mx-auto">
            {/* 포스터 이미지 */}
            <div className="w-full md:w-1/2 relative flex justify-center items-center">
                <img src={exhibition.thumbnail} alt={exhibition.title} className="w-[90%] md:w-[80%] h-auto object-cover rounded-lg shadow mb-4 md:mb-0" />
            </div>

            {/* 전시 정보 */}
            <div className="w-full md:w-1/2 p-4 md:p-6 rounded-xl overflow-hidden shadow-md relative flex flex-col justify-between">
                {/* 좋아요 버튼 */}
                {/* <button className="absolute top-3 right-3 md:top-4 md:right-4">
                    <Heart size={24} className={liked ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
                </button> */}

                <div>
                    <h2 className="text-xl md:text-2xl font-bold text-primary-300">{exhibition.title}</h2>

                    {/* 평점 */}
                    <div className="flex items-center gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Star
                                key={i}
                                size={16}
                                className={
                                    exhibition.reviewAvg >= i
                                        ? 'fill-primary-300 text-primary-300'
                                        : exhibition.reviewAvg >= i - 0.5
                                          ? 'fill-primary-300 text-primary-300 opacity-50'
                                          : 'text-gray-300'
                                }
                            />
                        ))}
                        <span className="text-sm text-gray-500 ml-1">
                            {exhibition.reviewAvg} ({exhibition.reviewCount})
                        </span>
                    </div>

                    {/* 해시태그 */}
                    <div className="flex flex-wrap gap-2 mt-2">
                        {getCategoryHashtags(exhibition.category, exhibition.mood).map((tag, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    {/* 전시 장소 */}
                    <div className="flex items-center gap-2 mt-3">
                        <span className="inline-flex items-center justify-center bg-[#F46D6D] rounded-md px-2 py-1 text-white text-xs w-15 font-medium">
                            장소
                        </span>
                        <p className="text-gray-500 text-sm md:text-base">{exhibition.location}</p>
                    </div>

                    {/* 전시 기간 */}
                    <div className="flex items-center gap-2 mt-2">
                        <span className="inline-flex items-center justify-center bg-[#F46D6D] rounded-md px-2 py-1 text-white text-xs font-medium">
                            전시기간
                        </span>
                        <p className="text-gray-500 text-sm md:text-base">
                            {formatDate(exhibition.startDate)} ~ {formatDate(exhibition.endDate)}
                        </p>
                    </div>

                    <p className="mt-3 text-sm md:text-base text-gray-700 leading-relaxed line-clamp-3">{exhibition.description}</p>
                </div>

                {/* 하단 버튼 */}
                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                    <button className="flex-1 px-3 py-2 bg-primary-300 text-white rounded-lg hover:bg-[#d24e4e] text-sm md:text-base" onClick={handleCardClick}>
                        자세히 보기
                    </button>
                </div>
            </div>
        </div>
    );
}
