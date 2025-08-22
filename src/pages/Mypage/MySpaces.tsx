import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import home from '../../icons/home.svg';
import { X } from 'lucide-react';

import sample1 from '../../images/sample1.jpeg';
import sample2 from '../../images/sample2.jpeg';
import sample3 from '../../images/sample3.jpeg';

interface Space {
    id: number;
    title: string;
    description: string;
    address: string;
    status: '대기중' | '처리완료';
    isApproved?: boolean;
    operatingHours: string;
    type: string;
    spaceInfo: string;
    mood: string;
    question: {
        phonenum: string;
        email: string;
        website?: string;
        sns?: string;
    };
    facilities: {
        wifi: boolean;
        restroom: boolean;
        lounge: boolean;
        parking: boolean;
        elevator: boolean;
        wheelchair: boolean;
    };
    images: string[];
}

export default function MySpaces() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'전체' | '대기중' | '처리완료'>('전체');
    const [showDetail, setShowDetail] = useState(false);
    const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);

    // 공간 목록
    const [spaces] = useState<Space[]>([
        {
            id: 1,
            title: '홍대 아트룸',
            description: '홍대 근처에 위치한 소규모 전시 및 팝업 공간입니다.',
            address: '서울시 마포구 홍익로 25',
            status: '대기중',
            operatingHours: '10:00 - 18:00',
            type: '전시회',
            spaceInfo: '1-10명, 소형 공간',
            mood: '화이트 박스',
            question: {
                phonenum: '010-1234-5678',
                email: 'artroom@example.com',
                website: 'https://artroom.com',
                sns: 'https://instagram.com/artroom',
            },
            facilities: {
                wifi: true,
                restroom: true,
                lounge: false,
                parking: true,
                elevator: false,
                wheelchair: true,
            },
            images: [sample1, sample2, sample3],
        },
        {
            id: 2,
            title: '강남 팝업홀',
            description: '대형 브랜드 팝업 전시가 자주 열리는 공간입니다.',
            address: '서울시 강남구 테헤란로 231',
            status: '처리완료',
            isApproved: true,
            operatingHours: '09:00 - 20:00',
            type: '팝업스토어',
            spaceInfo: '50명 이상, 대형 공간',
            mood: '인더스트리얼',
            question: {
                phonenum: '02-987-6543',
                email: 'popup@example.com',
                website: 'https://popuphall.com',
                sns: '',
            },
            facilities: {
                wifi: true,
                restroom: true,
                lounge: true,
                parking: true,
                elevator: true,
                wheelchair: true,
            },
            images: [sample1, sample2],
        },
    ]);

    const filteredSpaces = activeTab === '전체' ? spaces : spaces.filter((s) => s.status === activeTab);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleDelete = () => {
        console.log('삭제 완료');
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="flex items-center gap-5">
            <main className="flex-1">
                <div className="w-full bg-white rounded-2xl shadow-lg p-10">
                    <h1 className="text-2xl font-bold mb-6">내가 등록한 공간</h1>

                    {/* 탭 메뉴 */}
                    <div className="flex gap-10 w-full max-w-[1040px] mb-4">
                        {['전체', '대기중', '처리완료'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => {
                                    setActiveTab(tab as '전체' | '대기중' | '처리완료');
                                    setShowDetail(false);
                                }}
                                className={`pb-2 font-medium ${activeTab === tab ? 'text-primary-300 border-b-2 border-primary-300' : 'text-default-gray-500'}`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* 콘텐츠 */}
                    {!showDetail ? (
                        <div className="flex flex-col w-full max-w-[1040px] divide-y divide-default-gray-400">
                            {filteredSpaces.length === 0 ? (
                                <div className="p-6 text-center text-default-gray-500">
                                    {activeTab === '전체' && '아직 등록한 공간이 없습니다.'}
                                    {activeTab === '대기중' && '대기중인 공간이 없습니다.'}
                                    {activeTab === '처리완료' && '처리완료된 공간이 없습니다.'}
                                </div>
                            ) : (
                                filteredSpaces.map((space, idx) => (
                                    <div
                                        key={space.id}
                                        className={`flex justify-between items-center w-full py-4 ${idx === 0 ? 'border-t border-default-gray-400' : ''}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <img src={home} alt="home icon" className="w-[30px] h-[30px]" />
                                            <div className="flex flex-col">
                                                <span className="text-sm">{space.title}</span>
                                                <span className="text-sm">{space.address}</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-2">
                                            {space.status === '대기중' ? (
                                                <button className="w-[100px] h-[35px] text-sm rounded-[50px] border border-primary-300 text-primary-300">
                                                    승인 대기중
                                                </button>
                                            ) : (
                                                <button
                                                    className={`w-[70px] h-[35px] text-sm rounded-[50px] border ${
                                                        space.isApproved
                                                            ? 'border-primary-300 text-white bg-primary-300'
                                                            : 'border-default-gray-400 bg-default-gray-400 text-default-gray-600'
                                                    }`}
                                                >
                                                    {space.isApproved ? '승인됨' : '거절됨'}
                                                </button>
                                            )}
                                            <button
                                                onClick={() => {
                                                    setSelectedSpace(space);
                                                    setShowDetail(true);
                                                }}
                                                className="w-[70px] h-[35px] text-sm rounded-[50px] border border-primary-300 text-primary-300"
                                            >
                                                자세히
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    ) : (
                        // 상세보기
                        selectedSpace && (
                            <div className="w-full max-w-[1040px] p-6 rounded-2xl shadow-md border border-default-gray-100 bg-white flex flex-col gap-6">
                                {/* 공간명 + 상태 */}
                                <div className="flex justify-between items-center">
                                    <span className="text-xl border-b-2 border-primary-300">{selectedSpace.title}</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setIsDeleteModalOpen(true)}
                                            className="w-[90px] h-[30px] text-sm text-primary-300 border border-primary-300 rounded-full"
                                        >
                                            삭제하기
                                        </button>
                                        <button
                                            onClick={() => navigate(`/spaces/edit/${selectedSpace.id}`, { state: selectedSpace })}
                                            className="w-[90px] h-[30px] text-sm text-white border border-primary-300 bg-primary-300 rounded-full"
                                        >
                                            수정하기
                                        </button>
                                    </div>
                                </div>

                                {/* 삭제 모달 */}
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

                                {/* 공간 소개 */}
                                <div className="flex flex-col gap-2">
                                    <span className="font-semibold">공간 소개</span>
                                    <span className="text-sm">{selectedSpace.description}</span>
                                </div>

                                {/* 공간 이미지 */}
                                <div className="flex flex-col gap-2">
                                    <span className="font-semibold">공간 이미지</span>
                                    <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2">
                                        {selectedSpace.images.map((img: string, idx: number) => (
                                            <img
                                                key={idx}
                                                src={img}
                                                alt={`공간 이미지 ${idx + 1}`}
                                                className="w-40 h-40 object-cover rounded-lg shadow-md flex-shrink-0"
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* 주소 + 운영 */}
                                <div className="grid grid-cols-[100px_1fr] gap-y-2 text-sm">
                                    <span className="font-medium">주소</span>
                                    <span>{selectedSpace.address}</span>
                                    <span className="font-medium">운영 시간</span>
                                    <span>{selectedSpace.operatingHours}</span>
                                </div>

                                {/* 유형, 사양, 분위기 */}
                                <div className="grid grid-cols-[100px_1fr] gap-y-2 text-sm">
                                    <span className="font-medium">공간 유형</span>
                                    <span>{selectedSpace.type}</span>
                                    <span className="font-medium">공간 사양</span>
                                    <span>{selectedSpace.spaceInfo}</span>
                                    <span className="font-medium">공간 분위기</span>
                                    <span>{selectedSpace.mood}</span>
                                </div>

                                {/* 문의 정보 */}
                                <div className="grid grid-cols-[100px_1fr] gap-y-2 text-sm">
                                    <span className="font-medium">연락처</span>
                                    <span>{selectedSpace.question.phonenum}</span>
                                    <span className="font-medium">이메일</span>
                                    <span>{selectedSpace.question.email}</span>
                                    {selectedSpace.question.website && (
                                        <>
                                            <span className="font-medium">웹사이트</span>
                                            <a href={selectedSpace.question.website}>{selectedSpace.question.website}</a>
                                        </>
                                    )}
                                    {selectedSpace.question.sns && (
                                        <>
                                            <span className="font-medium">SNS</span>
                                            <a href={selectedSpace.question.sns}>{selectedSpace.question.sns}</a>
                                        </>
                                    )}
                                </div>
                            </div>
                        )
                    )}
                </div>
            </main>
        </div>
    );
}
