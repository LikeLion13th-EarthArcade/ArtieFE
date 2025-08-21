import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaQuestionCircle } from 'react-icons/fa';
import { ChevronDown, X } from 'lucide-react';

import Gallery from '../Components/Exhibition/Gallery';

import mark_icon from '../../icons/mark_icon.svg';
import sample1 from '../../images/sample1.jpeg';
import sample2 from '../../images/sample2.jpeg';
import sample3 from '../../images/sample3.jpeg';
import sample4 from '../../images/sample4.jpeg';
import sample5 from '../../images/sample5.jpeg';

export default function SpaceManageDetail() {
    const navigate = useNavigate();

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleDelete = () => {
        console.log('삭제 완료');
        setIsDeleteModalOpen(false);
    };

    const space = {
        id: '1',
        title: 'Gallery hoM',
        type: '전시회',
        inform: '10-30명 중소 공간(40평)',
        mood: '집중형 조명',
        hashtags: ['전시회', '10-30명 중소 공간(40평)', '집중형 조명'],
        address: '서울시 종로구 삼청로 124-1 갤러리 에이치오엠',
        time: '10:00 - 18:00',
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
                <div className="flex mb-6">
                    <span className="text-sm text-default-gray-600">공간 운영하기</span>
                    <ChevronDown size={20} className="-rotate-90 text-default-gray-600" />
                    <span className="text-sm text-default-gray-600">내 공간 관리</span>
                </div>
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

                    <div className="flex gap-3">
                        {/* 삭제 버튼 */}
                        <button
                            onClick={() => setIsDeleteModalOpen(true)}
                            className="w-[130px] h-[50px] rounded-[50px] text-primary-300 bg-white border border-primary-300"
                        >
                            삭제하기
                        </button>{' '}
                        {/* 수정 버튼 */}
                        <button
                            onClick={() => navigate(`/spaces/edit/${space.id}`, { state: space })}
                            className="w-[130px] h-[50px] rounded-[50px] text-white bg-primary-300 border border-primary-300"
                        >
                            수정하기
                        </button>
                    </div>
                </div>

                {/* 삭제 확인 모달 */}
                {isDeleteModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
                        <div className="bg-white w-[400px] p-6 rounded-2xl shadow-lg relative">
                            <button onClick={() => setIsDeleteModalOpen(false)} className="absolute top-4 right-4 text-default-gray-500">
                                <X size={20} />
                            </button>

                            <p className="text-center text-lg mb-6">정말 삭제하시겠습니까?</p>

                            <div className="flex justify-center gap-4">
                                <button onClick={handleDelete} className="text-sm px-6 py-2 rounded-full bg-primary-300 text-white">
                                    삭제하기
                                </button>
                                <button
                                    onClick={() => setIsDeleteModalOpen(false)}
                                    className="text-sm px-6 py-2 rounded-full border border-primary-300 text-primary-300"
                                >
                                    취소하기
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <p className="text-gray-400 mt-2">서울특별시 종로구 삼청로 30 지하1층</p>
            </div>
            {/* 갤러리 부분 시작 부분 */}
            <Gallery images={[sample1, sample2, sample3, sample4, sample5]} />

            {/* 공간 소개 */}
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
        </div>
    );
}
