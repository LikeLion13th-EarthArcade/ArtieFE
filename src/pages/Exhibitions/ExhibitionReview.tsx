import { useState, useRef } from 'react';
import { Star } from 'lucide-react';

export default function ExhibitionReview() {
    const exhibition = {
        id: '1',
        title: '론 뮤익',
        hashtags: ['현대미술', '조각', '인간의 본질'],
    };

    const [images, setImages] = useState<File[]>([]);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages([...images, ...Array.from(e.target.files)]);
        }
    };

    const handleDivClick = () => {
        fileInputRef.current?.click();
    };

    const handleRatingClick = (value: number) => {
        setRating(value);
    };

    const cancleReview = () => {
        location.href = `/exhibitions/${exhibition.id}`;
    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (e.target.value.length <= 300) {
            setReviewText(e.target.value);
        }
    };

    return (
        <div className="flex flex-col justify-center px-10 py-8 max-w-5xl mx-auto">
            <div className="flex flex-col rounded-lg bg-white shadow-lg p-10 space-y-3">
                <p className="text-xs font-bold text-gray-400">{exhibition.title}</p>
                <h1 className="text-3xl font-bold">리뷰 작성하기</h1>
                <div className="h-[1px] w-full bg-primary-300"></div>

                <div>
                    <h3 className="font-bold text-lg mb-2">{exhibition.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">방문하신 공간은 만족스러우셨나요? 소중한 리뷰를 남겨주세요.</p>
                    <input type="file" accept="image/*" multiple onChange={handleImageChange} ref={fileInputRef} className="hidden" />
                    <div
                        onClick={handleDivClick}
                        className="w-full h-40 border-1 border-primary-300 rounded-md flex items-center justify-center cursor-pointer transition-colors"
                    >
                        <p className="text-gray-400 text-center text-sm">
                            전시장 사진을 함께 공유해 보세요! <br /> 클릭하거나 이미지를 드래그해서 추가하세요
                        </p>
                    </div>
                    <div className="flex gap-2 mt-2 flex-wrap">
                        {images.map((img, idx) => (
                            <img key={idx} src={URL.createObjectURL(img)} alt={`첨부 이미지 ${idx + 1}`} className="w-24 h-24 object-cover rounded-md" />
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <h3 className="font-bold text-lg mb-2">별점</h3>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <button key={num} type="button" onClick={() => handleRatingClick(num)} className="p-1">
                                <Star
                                    size={24}
                                    className={num <= rating ? 'text-primary-300' : 'text-gray-300'}
                                    fill={num <= rating ? 'currentColor' : 'none'}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="font-bold text-lg mb-2">상세 리뷰</h3>
                    <textarea
                        value={reviewText}
                        onChange={handleTextChange}
                        placeholder="공간의 분위기, 위치, 편의시설 등 실제 이용하며 느끼신 점을 자유롭게 남겨주세요.(최대 300자)"
                        className="text-sm w-full p-3 border-1 border-primary-300 rounded-lg focus:outline-none resize-none"
                        rows={6}
                    />
                    <p className="text-sm text-gray-400 mt-1 text-right">{reviewText.length} / 300</p>
                </div>

                <div className="flex justify-center gap-4 mt-10">
                    <button className="py-3 px-10 text-primary-300 border-primary-300 rounded-[100px] border-1" onClick={cancleReview}>
                        취소하기
                    </button>
                    <button className="py-3 px-10 text-white border-primary-300 bg-primary-300 rounded-[100px]">등록하기</button>
                </div>
            </div>
        </div>
    );
}
