import camera from '../../icons/camera.svg';
import exhibition from '../../icons/exhibition.svg';
import game from '../../icons/game.svg';

import ExhibitionCard from '../Components/Exhibition/ExhibitionCard';

export default function ExhibitionList() {
    return (
        <div className="flex flex-col items-center min-h-screen py-10">
            <h1 className="text-3xl font-bold">나영석님의 취향 키워드</h1>

            <div className="text-center mt-4 text-[#777]">
                <p>다음은 아띠가 분석한 나영석님의 전시 취향 키워드입니다.</p>
                <p>이 키워드를 바탕으로 전시를 추천해드릴게요.</p>
            </div>

            <div className="h-[1px] w-[80%] bg-primary-300 my-6"></div>

            <ul className="flex justify-center gap-6 sm:gap-12 md:gap-40 lg:gap-80 mt-3 mb-6">
                {[
                    { src: camera, label: '사진•미디어아트' },
                    { src: exhibition, label: '전시회' },
                    { src: game, label: '트렌디한 감성' },
                ].map((item, idx) => (
                    <li key={idx} className="flex flex-col items-center text-center space-y-2">
                        <img src={item.src} alt={item.label} className="w-18 h-18 object-contain" />
                        <span className="text-sm">{item.label}</span>
                    </li>
                ))}
            </ul>
            <ExhibitionCard />
        </div>
    );
}
