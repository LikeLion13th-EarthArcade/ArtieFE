import { useState } from 'react';
import { Star, X, ChevronLeft, ChevronRight } from 'lucide-react';

type Review = {
    reviewId: number;
    rating: number;
    content: string;
    imageUrls: string[];
    createdAt: string;
    userName: string;
};

export default function ReviewTab({ review }: { review: Review }) {
    const [modalIdx, setModalIdx] = useState<number | null>(null);
    const [expanded, setExpanded] = useState(false);

    const MAX_LENGTH = 150;
    const shouldTruncate = review.content.length > MAX_LENGTH && !expanded;
    const displayedText = shouldTruncate ? review.content.slice(0, MAX_LENGTH) + '...' : review.content;

    return (
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-6">
            {/* 왼쪽 텍스트 */}
            <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900">{review.userName}</h3>
                <div className="flex gap-2">
                    <div className="flex items-center gap-1 mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'text-primary-300 fill-primary-300' : 'text-gray-300'}`} />
                        ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{new Date(review.createdAt).toLocaleDateString()}</p>
                </div>

                <p className="mt-3 text-gray-700 leading-relaxed">
                    {displayedText}
                    {review.content.length > MAX_LENGTH && (
                        <button className="ml-1 text-primary-300 font-small" onClick={() => setExpanded(!expanded)}>
                            {expanded ? '접기' : '더보기'}
                        </button>
                    )}
                </p>
            </div>

            {/* 오른쪽 사진 */}
            {review.imageUrls.length > 0 && (
                <div className="flex items-center -space-x-3 mt-4 sm:mt-0">
                    {review.imageUrls.slice(0, 2).map((img, idx) => (
                        <img
                            key={idx}
                            src={img}
                            alt={`review-${idx}`}
                            onClick={() => setModalIdx(idx)}
                            className="w-20 h-20 object-cover rounded-lg border-2 border-white cursor-pointer shadow-md hover:scale-105 transition-transform"
                        />
                    ))}
                    {review.imageUrls.length > 2 && (
                        <div
                            onClick={() => setModalIdx(2)}
                            className="w-20 h-20 flex items-center justify-center bg-black/40 text-white font-semibold rounded-lg border-2 border-white cursor-pointer shadow-md hover:scale-105 transition-transform"
                        >
                            +{review.imageUrls.length - 2}
                        </div>
                    )}
                </div>
            )}

            {/* 모달 */}
            {modalIdx !== null && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="relative w-full h-full max-w-[95vw] max-h-[95vh] flex items-center justify-center">
                        <img src={review.imageUrls[modalIdx]} alt="modal" className="max-w-full max-h-full object-contain rounded-lg shadow-lg" />

                        {/* 좌우 버튼 */}
                        <button
                            onClick={() => setModalIdx((modalIdx - 1 + review.imageUrls.length) % review.imageUrls.length)}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-2 hover:bg-white"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-700" />
                        </button>
                        <button
                            onClick={() => setModalIdx((modalIdx + 1) % review.imageUrls.length)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-2 hover:bg-white"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-700" />
                        </button>

                        {/* 닫기 버튼 */}
                        <button onClick={() => setModalIdx(null)} className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-200">
                            <X className="w-5 h-5 text-gray-700" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
