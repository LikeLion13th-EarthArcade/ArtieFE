import house_icon from '../../icons/house_icon.svg';
import mark_icon from '../../icons/mark_icon.svg';
import chat from '../../icons/chat.svg';
import sample1 from '../../images/sample1.jpeg';
import sample2 from '../../images/sample2.jpeg';
import sample3 from '../../images/sample3.jpeg';
import sample4 from '../../images/sample4.jpeg';
import sample5 from '../../images/sample5.jpeg';

import Gallery from '../Components/Exhibition/Gallery';

export default function ExhibitionDetail() {
    const exhibition = {
        id: '1',
        title: '론 뮤익',
        hashtags: ['현대미술', '조각', '인간의 본질'],
    };
    return (
        <div className="flex flex-col justify-center px-10 py-8 max-w-5xl mx-auto">
            <div></div>
            <div>
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <div className="flex gap-3">
                        <h1 className="text-3xl font-bold">론 뮤익</h1>
                        <div className="flex flex-wrap gap-1 mt-2 items-center">
                            {exhibition.hashtags.map((tag, idx) => (
                                <span key={idx} className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <button className="flex bg-primary-300 py-2 px-4 rounded-full text-white justify-center items-center w-[200px] gap-2">
                        <img src={house_icon} alt="버튼 아이콘" className="h-5 w-5" />
                        홈페이지 바로가기
                    </button>
                </div>
                <p className="text-gray-400 mt-2">서울특별시 종로구 삼청로 30 지하1층</p>
            </div>
            {/* 갤러리 부분 시작 부분 */}
            <Gallery images={[sample1, sample2, sample3, sample4, sample5]} />

            {/* 전시 소개 */}
            <div className="mt-8 gap-2">
                <h3 className="font-bold text-xl mb-1 flex items-center gap-2">
                    <img src={mark_icon} alt="" className="w-5 h-5" />
                    전시 개요
                </h3>
                {/* 기간 / 시간 / 요금 */}
                <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-1">기간</h3>
                        <p className="text-gray-600">2025.08.01 ~ 2025.10.31</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-1">운영 시간</h3>
                        <p className="text-gray-600">화~일요일 10:00 - 18:00 (월요일 휴관)</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-1">입장료</h3>
                        <p className="text-gray-600">성인 15,000원 / 청소년 10,000원</p>
                    </div>
                </div>
                <h3 className="text-lg font-semibold mt-5 mb-1">전시 소개</h3>
                <p className="text-gray-600">
                    론 뮤익의 작품 세계를 탐구하는 이번 전시는 그의 대표작들을 중심으로 구성되어 있습니다. 인간의 본질과 감정을 깊이 있게 탐구하는 뮤익의
                    작품들은 관람객에게 강렬한 인상을 남깁니다. 론 뮤익의 작품 세계를 탐구하는 이번 전시는 그의 대표작들을 중심으로 구성되어 있습니다. 인간의
                    본질과 감정을 깊이 있게 탐구하는 뮤익의 작품들은 관람객에게 강렬한 인상을 남깁니다. 론 뮤익의 작품 세계를 탐구하는 이번 전시는 그의
                    대표작들을 중심으로 구성되어 있습니다. 인간의 본질과 감정을 깊이 있게 탐구하는 뮤익의 작품들은 관람객에게 강렬한 인상을 남깁니다. 론 뮤익의
                    작품 세계를 탐구하는 이번 전시는 그의 대표작들을 중심으로 구성되어 있습니다. 인간의 본질과 감정을 깊이 있게 탐구하는 뮤익의 작품들은
                    관람객에게 강렬한 인상을 남깁니다. 론 뮤익의 작품 세계를 탐구하는 이번 전시는 그의 대표작들을 중심으로 구성되어 있습니다. 인간의 본질과
                    감정을 깊이 있게 탐구하는 뮤익의 작품들은 관람객에게 강렬한 인상을 남깁니다.
                </p>
                <h3 className="text-lg font-semibold mt-5 mb-1">예매 링크</h3>
                <a className="text-gray-600" href="https://www.mmca.go.kr/">
                    https://www.mmca.go.kr/
                </a>
            </div>
            {/* 시설 / 옵션 */}
            <div className="mt-5 gap-4">
                <h3 className="font-bold text-lg mb-1">시설 옵션</h3>
                <ul className="flex flex-wrap gap-4 list-none text-gray-600">
                    <li>화장실</li>
                    <li>휴게 공간</li>
                    <li>유모차 대여</li>
                </ul>
            </div>
            {/* 지도 */}
            {/* 임시 차원에서 냅두고 */}
            <div className="mt-10">
                <h2 className="text-xl font-semibold mb-3">위치 안내</h2>
                <div className="w-full h-[300px] bg-gray-200 rounded-2xl flex items-center justify-center text-gray-500">지도 API 들어갈 자리</div>
            </div>
            <div className="mt-8 gap-4">
                <div className="flex flex-wrap justify-between items-center mb-6">
                    <h3 className="font-bold text-xl mb-1 flex items-center gap-2">
                        <img src={chat} alt="" className="w-5 h-5" />
                        리뷰
                    </h3>
                    <button className="flex bg-primary-300 py-2 px-4 rounded-full text-white justify-center items-center w-[170px] gap-2">리뷰 작성하기</button>
                </div>
                <div className="flex gap-4"></div>
            </div>
        </div>
    );
}
