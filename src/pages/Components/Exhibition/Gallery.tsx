import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

type GalleryProps = {
    images: string[];
};

export default function Gallery({ images }: GalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const openModal = (index: number) => setSelectedIndex(index);
    const closeModal = () => setSelectedIndex(null);

    const prevImage = () => setSelectedIndex((prev) => (prev !== null ? (prev === 0 ? images.length - 1 : prev - 1) : null));

    const nextImage = () => setSelectedIndex((prev) => (prev !== null ? (prev === images.length - 1 ? 0 : prev + 1) : null));

    return (
        <div className="w-full flex gap-2 mt-8">
            {/* 왼쪽 큰 썸네일 */}
            <div className="w-1/2">
                {images[0] && (
                    <div className="aspect-square overflow-hidden rounded-2xl">
                        <img src={images[0]} alt="main" className="w-full h-full object-cover cursor-pointer" onClick={() => openModal(0)} />
                    </div>
                )}
            </div>

            {/* 오른쪽 4분할 썸네일 */}
            <div className="w-1/2 grid grid-cols-2 grid-rows-2 gap-2">
                {images.slice(1, 5).map((img, idx) => (
                    <div key={idx} className="aspect-square overflow-hidden rounded-2xl">
                        <img src={img} alt={`sub-${idx}`} className="w-full h-full object-cover cursor-pointer" onClick={() => openModal(idx + 1)} />
                    </div>
                ))}
            </div>

            {/* 상세보기 모달 */}
            {selectedIndex !== null && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-80 flex items-center justify-center z-50">
                    <button onClick={closeModal} className="absolute top-4 right-4 text-white">
                        <X size={32} />
                    </button>

                    <button onClick={prevImage} className="absolute left-6 text-white p-2 rounded-full hover:bg-black/50">
                        <ChevronLeft size={36} />
                    </button>

                    {/* 원본 비율 유지 */}
                    <img src={images[selectedIndex]} alt="detail" className="max-h-[80vh] max-w-[90vw] rounded-xl shadow-lg object-contain" />

                    <button onClick={nextImage} className="absolute right-6 text-white p-2 rounded-full hover:bg-black/50">
                        <ChevronRight size={36} />
                    </button>
                </div>
            )}
        </div>
    );
}
