import { useState, useEffect, type SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import banner1 from '../../src/images/bannerImages/banner1.png';
import banner2 from '../../src/images/bannerImages/banner2.png';
import banner3 from '../../src/images/bannerImages/banner3.png';
import banner4 from '../../src/images/bannerImages/banner4.png';
import ExhibitionCard from './Components/Exhibition/ExhibitionCard';

export default function HomePage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const navigate = useNavigate();

    const bannerImages = [
        {
            id: 1,
            src: banner1,
            alt: '전시 찾기 광고',
            title: '마음에 드는 전시를 찾고 계신가요?',
            subtitle: '취향저격 전시부터 숨겨진 보석같은 공간까지, 지금 바로 발견해보세요',
            button: '전시 찾기',
            url: '/exhibitions/search',
        },
        {
            id: 2,
            src: banner2,
            alt: '공간 등록하기 광고',
            title: '특별한 공간을 소유하고 계신가요?',
            subtitle: '당신의 공간을 필요로 하는 아티스트들과 연결하고 새로운 수익을 만들어보세요',
            button: '공간 등록하기',
            url: '/spaces/new',
        },
        {
            id: 3,
            src: banner3,
            alt: '전시 등록하기 광고',
            title: '세상에 보여주고 싶은 작품이 있나요?',
            subtitle: '완벽한 공간에서 당신만의 스토리를 전시로 만들어보세요',
            button: '전시 등록하기',
            url: '/exhibitions/new',
        },
        {
            id: 4,
            src: banner4,
            alt: '공간 대여하기 광고',
            title: '당신의 전시를 위한 완벽한 공간을 찾고 계신가요?',
            subtitle: '당신의 전시를 빛낼 공간을 대여해보세요',
            button: '공간 대여하기',
            url: '/spaces',
        },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
        }, 5000);

        return () => clearInterval(timer);
    }, [bannerImages.length]);

    const goToSlide = (index: SetStateAction<number>) => {
        setCurrentSlide(index);
    };

    const goToPrev = () => {
        setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
    };

    const goToNext = () => {
        setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    };

    return (
        <div className="min-h-screen">
            <div className="relative w-full h-96 overflow-hidden bg-gray-900">
                <div className="flex transition-transform duration-500 ease-in-out h-full" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                    {bannerImages.map((image) => (
                        <div key={image.id} className="w-full h-full flex-shrink-0 relative">
                            <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
                            {/* 오버레이 */}
                            <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
                                <div className="text-center text-white px-4">
                                    <h2 className="text-4xl font-bold mb-4">{image.title}</h2>
                                    <p className="text-xl opacity-90 mb-6">{image.subtitle}</p>
                                    <button
                                        className="bg-primary-300 text-white font-semibold px-8 py-3 rounded-full hover:bg-primary-200 transition-colors duration-200"
                                        onClick={() => navigate(image.url)}
                                    >
                                        {image.button}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={goToPrev}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/50  hover:bg-opacity-30 p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
                >
                    <ChevronLeft size={24} />
                </button>

                <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/50 hover:bg-opacity-30  p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
                >
                    <ChevronRight size={24} />
                </button>

                {/* 도트 인디케이터 */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                    {bannerImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-200 ${
                                currentSlide === index ? 'bg-primary-300 scale-125' : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* 나머지 콘텐츠 영역 */}
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome 나영석님!</h1>
                <div className=" text-gray-600">
                    <p>예술가와 공간을 잇는 AI 전시 매칭 플랫폼, Artie에서 당신의 전시가 시작됩니다.</p>
                </div>

                <div className="h-[1px] w-auto bg-primary-300 my-6"></div>

                <div>
                    <h2 className="text-2xl font-semibold mb-4">Artie's Pick</h2>
                    <div className="grid grid-cols-2 gap-2">
                        <ExhibitionCard />
                        <ExhibitionCard />
                        <ExhibitionCard />
                        <ExhibitionCard />
                    </div>
                </div>
            </div>
        </div>
    );
}
