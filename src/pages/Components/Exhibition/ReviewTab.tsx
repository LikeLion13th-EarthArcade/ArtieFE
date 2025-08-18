import { useState } from 'react';
import { Star, X, ChevronLeft, ChevronRight } from 'lucide-react';

import sample1 from '../../../images/sample1.jpeg';
import sample2 from '../../../images/sample2.jpeg';
import sample3 from '../../../images/sample3.jpeg';
import sample4 from '../../../images/sample4.jpeg';
import sample5 from '../../../images/sample5.jpeg';

type Review = {
    name: string;
    rating: number;
    date: string;
    text: string;
    images: string[];
};

const reviews: Review[] = [
    {
        name: '유진',
        rating: 4,
        date: '2025.08.01',
        text: '전시 분위기가 너무 좋았어요. 공간도 쾌적하고 다음에 또 오고 싶네요! 전시 분위기가 너무 좋았어요. 공간도 쾌적하고 다음에 또 오고 싶네요! 전시 분위기가 너무 좋았어요. 공간도 쾌적하고 다음에 또 오고 싶네요! 전시 분위기가 너무 좋았어요. 공간도 쾌적하고 다음에 또 오고 싶네요! 공간도 쾌적하고 다음에 또 오고 싶네요! 전시 분위기가 너무 좋았어요. 공간도 쾌적하고 다음에 또 오고 싶네요! 전시 분위기가 너무 좋았어요. 공간도 쾌적하고 다음에 또 오고 싶네요!공간도 쾌적하고 다음에 또 오고 싶네요! 전시 분위기가 너무 좋았어요. 공간도 쾌적하고 다음에 또 오고 싶네요! 전시 분위기가 너무 좋았어요. 공간도 쾌적하고 다음에 또 오고 싶네요!공간도 쾌적하고 다음에 또 오고 싶네요! 전시 분위기가 너무 좋았어요. 공간도 쾌적하고 다음에 또 오고 싶네요! 전시 분위기가 너무 좋았어요. 공간도 쾌적하고 다음에 또 오고 싶네요!공간도 쾌적하고 다음에 또 오고 싶네요! 전시 분위기가 너무 좋았어요. 공간도 쾌적하고 다음에 또 오고 싶네요! 전시 분위기가 너무 좋았어요. 공간도 쾌적하고 다음에 또 오고 싶네요!공간도 쾌적하고 다음에 또 오고 싶네요! 전시 분위기가 너무 좋았어요. 공간도 쾌적하고 다음에 또 오고 싶네요! 전시 분위기가 너무 좋았어요. 공간도 쾌적하고 다음에 또 오고 싶네요!공간도 쾌적하고 다음에 또 오고 싶네요! 전시 분위기가 너무 좋았어요. 공간도 쾌적하고 다음에 또 오고 싶네요! 전시 분위기가 너무 좋았어요. 공간도 쾌적하고 다음에 또 오고 싶네요!공간도 쾌적하고 다음에 또 오고 싶네요! 전시 분위기가 너무 좋았어요. 공간도 쾌적하고 다음에 또 오고 싶네요! 전시 분위기가 너무 좋았어요. 공간도 쾌적하고 다음에 또 오고 싶네요!공간도 쾌적하고 다음에 또 오고 싶네요! 전시 분위기가 너무 좋았어요. 공간도 쾌적하고 다음에 또 오고 싶네요! 전시 분위기가 너무 좋았어요. 공간도 쾌적하고 다음에 또 오고 싶네요!',
        images: [sample1, sample2, sample3, sample4, sample5],
    },
];

export default function ReviewTab() {
    const [modalIndex, setModalIndex] = useState<{ reviewIdx: number; imgIdx: number } | null>(null);
    const [expandedReviews, setExpandedReviews] = useState<{ [key: number]: boolean }>({});

    const toggleExpand = (index: number) => {
        setExpandedReviews((prev) => ({ ...prev, [index]: !prev[index] }));
    };

    const handlePrev = (review: Review) => {
        if (!modalIndex) return;
        setModalIndex({
            reviewIdx: modalIndex.reviewIdx,
            imgIdx: (modalIndex.imgIdx - 1 + review.images.length) % review.images.length,
        });
    };

    const handleNext = (review: Review) => {
        if (!modalIndex) return;
        setModalIndex({
            reviewIdx: modalIndex.reviewIdx,
            imgIdx: (modalIndex.imgIdx + 1) % review.images.length,
        });
    };

    const MAX_LENGTH = 150;

    return (
        <div className="space-y-6">
            {reviews.map((review, index) => {
                const isExpanded = expandedReviews[index];
                const shouldTruncate = review.text.length > MAX_LENGTH && !isExpanded;
                const displayedText = shouldTruncate ? review.text.slice(0, MAX_LENGTH) + '...' : review.text;

                return (
                    <div key={index} className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-6">
                        <div className="flex-1">
                            <h3 className="font-semibold text-lg text-gray-900">{review.name}</h3>
                            <div className="flex gap-2">
                                <div className="flex items-center gap-1 mt-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'text-primary-300 fill-primary-300' : 'text-gray-300'}`} />
                                    ))}
                                </div>
                                <p className="text-sm text-gray-500 mt-1">{review.date}</p>
                            </div>

                            <p className="mt-3 text-gray-700 leading-relaxed">
                                {displayedText}
                                {review.text.length > MAX_LENGTH && (
                                    <button className="ml-1 text-primary-300 font-small" onClick={() => toggleExpand(index)}>
                                        {isExpanded ? '접기' : '더보기'}
                                    </button>
                                )}
                            </p>
                        </div>

                        {/* 오른쪽 사진 */}
                        <div className="flex items-center -space-x-3 mt-4 sm:mt-0">
                            {review.images.slice(0, 2).map((img, idx) => (
                                <img
                                    key={idx}
                                    src={img}
                                    alt={`review-${idx}`}
                                    onClick={() => setModalIndex({ reviewIdx: index, imgIdx: idx })}
                                    className="w-20 h-20 object-cover rounded-lg border-2 border-white cursor-pointer shadow-md hover:scale-105 transition-transform"
                                />
                            ))}
                            {review.images.length > 2 && (
                                <div
                                    onClick={() => setModalIndex({ reviewIdx: index, imgIdx: 2 })}
                                    className="w-20 h-20 flex items-center justify-center bg-black/40 text-white font-semibold rounded-lg border-2 border-white cursor-pointer shadow-md hover:scale-105 transition-transform"
                                >
                                    +{review.images.length - 2}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}

            {/* 모달 슬라이더 */}
            {modalIndex && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="relative w-full h-full max-w-[95vw] max-h-[95vh] flex items-center justify-center">
                        <img
                            src={reviews[modalIndex.reviewIdx].images[modalIndex.imgIdx]}
                            alt="modal"
                            className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                        />

                        {/* 좌우 버튼 */}
                        <button
                            onClick={() => handlePrev(reviews[modalIndex.reviewIdx])}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-2 hover:bg-white"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-700" />
                        </button>
                        <button
                            onClick={() => handleNext(reviews[modalIndex.reviewIdx])}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/70 rounded-full p-2 hover:bg-white"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-700" />
                        </button>

                        {/* 닫기 버튼 */}
                        <button onClick={() => setModalIndex(null)} className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-200">
                            <X className="w-5 h-5 text-gray-700" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
