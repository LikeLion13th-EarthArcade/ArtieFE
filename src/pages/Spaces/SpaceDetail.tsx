import mark_icon from '../../icons/mark_icon.svg';
import chat from '../../icons/chat.svg';
import sample1 from '../../images/sample1.jpeg';
import sample2 from '../../images/sample2.jpeg';
import sample3 from '../../images/sample3.jpeg';
import sample4 from '../../images/sample4.jpeg';
import sample5 from '../../images/sample5.jpeg';

import { FaQuestionCircle } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';

import Gallery from '../Components/Exhibition/Gallery';

export default function SpaceDetail() {
    const navigate = useNavigate();
    const handleReviewClick = () => {
        navigate(`/spaces/${space.id}/review`);
    };
    const handleReservationClick = () => {
        navigate(`/spaces/${space.id}/request`, { state: { space } });
    };
    const space = {
        id: '1',
        title: 'Gallery hoM',
        type: '개인•단체전',
        hashtags: ['화이트박스', '집중형 조명'],
        address: '서울시 종로구 삼청로 124-1 갤러리 에이치오엠',
        time: '화-일 10:00 - 18:00',
        inform: '10-30명 중소 공간(40평)',
        description:
            '갤러리 에이치오엠은 현대미술을 중심으로 다양한 전시를 선보이는 공간입니다. 집중형 조명과 화이트박스 구조로 작품 감상에 최적화되어 있습니다.',

        images: [sample1, sample2, sample3, sample4, sample5],
        question: {
            phonenum: '010-1234-5678',
            email: 'jyujin507@gmail.com',
            website: 'https://www.galleryhom.com',
            sns: 'https://www.instagram.com/galleryhom',
        },
        isAvailable: true,
    };

    return (
        <div className="flex flex-col justify-center px-10 py-8 max-w-5xl mx-auto">
            <div>
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <div className="flex gap-3">
                        <h1 className="text-3xl font-bold">{space.title}</h1>
                        <div className="flex flex-wrap gap-1 mt-2 items-center">
                            {space.hashtags.map((tag, idx) => (
                                <span key={idx} className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col items-end">
                        <button
                            className={`flex py-2 px-4 rounded-full justify-center items-center w-[160px] gap-2 ${
                                space.isAvailable ? 'bg-primary-300 text-white hover:bg-primary-400' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                            disabled={!space.isAvailable}
                            onClick={handleReservationClick}
                        >
                            예약하기
                        </button>
                        <p className="mt-2 text-sm font-medium text-center text-primary-300">
                            {space.isAvailable ? '현재 예약 가능한 공간입니다' : '현재 예약이 불가능한 공간입니다'}
                        </p>
                    </div>
                </div>
                <p className="text-gray-400 mt-2">{space.address}</p>
            </div>
            <Gallery images={[sample1, sample2, sample3, sample4, sample5]} />

            <div className="mt-8 gap-2">
                <h3 className="font-bold text-xl mb-1 flex items-center gap-2">
                    <img src={mark_icon} alt="" className="w-5 h-5" />
                    공간 개요
                </h3>

                <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-1">운영 시간</h3>
                        <p className="text-gray-600">{space.time}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-1">공간 사양</h3>
                        <p className="text-gray-600">{space.inform}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-1">유형</h3>
                        <p className="text-gray-600">{space.type}</p>
                    </div>
                </div>
                <h3 className="text-lg font-semibold mt-5 mb-1">공간 소개</h3>
                <p className="text-gray-600">{space.description}</p>
            </div>

            <div className="mt-5 gap-4">
                <h3 className="font-bold text-lg mb-1">시설 옵션</h3>
                <ul className="flex flex-wrap gap-4 list-none text-gray-600">
                    <li>화장실</li>
                    <li>휴게 공간</li>
                </ul>
            </div>
            {/* 지도 */}
            {/* 임시 차원에서 냅두고 */}
            <div className="mt-5 gap-4">
                <h2 className="text-xl font-semibold mb-3">위치 안내</h2>
                <div className="w-full h-[300px] bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500">지도 API 들어갈 자리</div>
            </div>
            <div className="mt-5 gap-4">
                <h3 className="font-bold text-xl mb-1 flex items-center gap-2">
                    <FaQuestionCircle className="w-5 h-5 fill-primary-300" />
                    문의하기
                </h3>
                <div className="mt-4 space-y-2">
                    {Object.entries(space.question).map(([key, value]) => (
                        <div key={key} className="flex gap-4">
                            <h3 className="text-md font-semibold capitalize">
                                {key === 'phonenum' ? '전화' : key === 'email' ? '이메일' : key === 'website' ? '웹사이트' : key === 'sns' ? 'SNS' : key}
                            </h3>
                            <p className="text-gray-600">{value}</p>
                        </div>
                    ))}
                </div>
            </div>
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
                <div className="flex flex-col gap-4"></div>
            </div>
        </div>
    );
}
