import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import calendar from '../../icons/calendar.svg';
import exhibiton_icon from '../../icons/exhibition_icon.svg';
import chat from '../../icons/chat.svg';
import { X } from 'lucide-react';

import sample1 from '../../images/sample1.jpeg';
import sample2 from '../../images/sample2.jpeg';
import sample3 from '../../images/sample3.jpeg';
import sample4 from '../../images/sample4.jpeg';
import sample5 from '../../images/sample5.jpeg';

interface Exhibition {
    id: number;
    title: string;
    period: string;
    location: string;
    description: string;
    status: '대기중' | '처리완료';
    isApproved?: boolean;
    operatingHours: string;
    spaceName: string;
    spaceLocation: string;
    exhibitionType: string;
    exhibitionFormat: string;
    exhibitionMood: string;
    admissionInfo: string;
    websiteLink: string;
    hashtags: string[];
    images: string[];
}

export default function MyExhibitions() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'전체' | '대기중' | '처리완료'>('전체');
    const [showDetail, setShowDetail] = useState(false);
    const [selectedExhibition, setSelectedExhibition] = useState<Exhibition | null>(null);

    const [exhibitions] = useState<Exhibition[]>([
        {
            id: 1,
            title: '현대 조각의 새로운 시선',
            period: '2025년 3월 20일 ~ 2025년 3월 30일',
            location: '서울시 종로구 홍지문2길 20',
            description: '현대 조각 작품들을 통해 새로운 예술적 시각을 제시하는 전시입니다.',
            status: '대기중',
            operatingHours: '10:00 - 18:00 (월요일 휴관)',
            spaceName: '아트갤러리 A',
            spaceLocation: '서울시 종로구 홍지문2길 20',
            exhibitionType: '회화',
            exhibitionFormat: '개인전',
            exhibitionMood: '혼자 보기 좋은',
            admissionInfo: '성인 12,000원 / 청소년 8,000원',
            websiteLink: 'https://example.com/exhibition1',
            hashtags: ['현대미술', '조각', '예술'],
            images: [sample1, sample2, sample3, sample4, sample5],
        },
        {
            id: 2,
            title: '디지털 아트의 미래',
            period: '2025년 4월 10일 ~ 2025년 4월 20일',
            location: '서울시 강남구 테헤란로 231',
            description: '디지털 기술과 예술의 만남을 보여주는 혁신적인 전시회입니다.',
            status: '처리완료',
            isApproved: true,
            operatingHours: '09:00 - 20:00',
            spaceName: '디지털아트센터',
            spaceLocation: '서울시 강남구 테헤란로 231',
            exhibitionType: '조각•설치',
            exhibitionFormat: '단체전',
            exhibitionMood: '데이트 하기 좋은',
            admissionInfo: '성인 15,000원 / 청소년 10,000원',
            websiteLink: 'https://example.com/exhibition2',
            hashtags: ['디지털아트', '미래', '기술'],
            images: [sample1, sample2, sample3],
        },
        {
            id: 3,
            title: '전통과 현대의 만남',
            period: '2025년 5월 1일 ~ 2025년 5월 15일',
            location: '서울시 마포구 서강로 45',
            description: '전통 미술과 현대적 해석이 조화를 이루는 특별 전시입니다.',
            status: '처리완료',
            isApproved: false,
            operatingHours: '11:00 - 17:00',
            spaceName: '전통문화갤러리',
            spaceLocation: '서울시 마포구 서강로 45',
            exhibitionType: '공예•디자인',
            exhibitionFormat: '단체전',
            exhibitionMood: '가족과 즐기기 좋은',
            admissionInfo: '무료 관람',
            websiteLink: 'https://example.com/exhibition3',
            hashtags: ['전통미술', '한국화', '문화유산'],
            images: [sample1, sample2, sample3],
        },
    ]);

    const filteredReservations = activeTab === '전체' ? exhibitions : exhibitions.filter((e) => e.status === activeTab);

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleDelete = () => {
        console.log('삭제 완료');
        setIsDeleteModalOpen(false);
    };

    return (
        <div className="flex items-center gap-5">
            <main className="flex-1">
                <div className="w-full bg-white rounded-2xl shadow-lg p-10">
                    <h1 className="text-2xl font-bold mb-6">내가 등록한 전시</h1>

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
                            {filteredReservations.length === 0 ? (
                                <div className="p-6 text-center text-default-gray-500">
                                    {activeTab === '전체' && '아직 등록한 전시가 없습니다.'}
                                    {activeTab === '대기중' && '대기중인 전시가 없습니다.'}
                                    {activeTab === '처리완료' && '처리완료된 전시가 없습니다.'}
                                </div>
                            ) : (
                                filteredReservations.map((exhibition, idx) => (
                                    <div
                                        key={exhibition.id}
                                        className={`flex justify-between items-center w-full py-4 ${idx === 0 ? 'border-t border-default-gray-400' : ''}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <img src={exhibiton_icon} alt="calendar icon" className="w-[30px] h-[30px]" />
                                            <div className="flex flex-col">
                                                <span className="text-sm">{exhibition.title}</span>
                                                <span className="text-sm">{exhibition.period}</span>
                                            </div>
                                        </div>

                                        {/* 버튼 로직 */}
                                        {activeTab === '전체' ? (
                                            exhibition.status === '대기중' ? (
                                                <div className="flex gap-2">
                                                    <button className="w-[100px] h-[35px] text-sm rounded-[50px] border border-primary-300 text-primary-300">
                                                        승인 대기중
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedExhibition(exhibition);
                                                            setShowDetail(true);
                                                        }}
                                                        className="w-[70px] h-[35px] text-sm rounded-[50px] border border-primary-300 text-primary-300"
                                                    >
                                                        자세히
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex gap-2">
                                                    <button
                                                        className={`w-[70px] h-[35px] text-sm rounded-[50px] border ${
                                                            exhibition.isApproved
                                                                ? 'border-primary-300 text-white bg-primary-300'
                                                                : 'border-default-gray-400 bg-default-gray-400 text-default-gray-600'
                                                        }`}
                                                    >
                                                        {exhibition.isApproved ? '승인됨' : '거절됨'}
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedExhibition(exhibition);
                                                            setShowDetail(true);
                                                        }}
                                                        className="w-[70px] h-[35px] text-sm rounded-[50px] border border-primary-300 text-primary-300"
                                                    >
                                                        자세히
                                                    </button>
                                                </div>
                                            )
                                        ) : (
                                            <div className="flex gap-2">
                                                {exhibition.status === '대기중' ? (
                                                    <button className="w-[100px] h-[35px] text-sm rounded-[50px] border border-primary-300 text-primary-300">
                                                        승인 대기중
                                                    </button>
                                                ) : (
                                                    <button
                                                        className={`w-[70px] h-[35px] text-sm rounded-[50px] border ${
                                                            exhibition.isApproved
                                                                ? 'border-primary-300 text-white bg-primary-300'
                                                                : 'border-default-gray-400 bg-default-gray-400 text-default-gray-600'
                                                        }`}
                                                    >
                                                        {exhibition.isApproved ? '승인됨' : '거절됨'}
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => {
                                                        setSelectedExhibition(exhibition);
                                                        setShowDetail(true);
                                                    }}
                                                    className="w-[70px] h-[35px] text-sm rounded-[50px] border border-primary-300 text-primary-300"
                                                >
                                                    자세히
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    ) : (
                        // 상세 보기
                        selectedExhibition && (
                            <div className="w-full max-w-[1040px] p-6 rounded-2xl shadow-md border border-default-gray-100 bg-white flex flex-col gap-6">
                                {/* 전시 일정 */}
                                <div className="flex items-center pb-6 gap-8 border-b border-default-gray-400">
                                    <div className="flex items-center gap-2">
                                        <img src={calendar} alt="calendar icon" className="w-[24px] h-[24px]" />
                                        <span className="text-lg font-medium">전시 일정</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-semibold text-sm">{selectedExhibition.period}</span>
                                        <span
                                            className={`px-3 py-1 text-xs rounded-full border ${
                                                selectedExhibition.status === '대기중'
                                                    ? 'text-primary-300 border-primary-300'
                                                    : selectedExhibition.isApproved
                                                      ? 'bg-primary-300 text-white border-primary-300'
                                                      : 'border-default-gray-400 bg-default-gray-400 text-default-gray-600'
                                            }`}
                                        >
                                            {selectedExhibition.status === '대기중' ? '승인 대기중' : selectedExhibition.isApproved ? '승인됨' : '거절됨'}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <span className="text-xl border-b-2 border-primary-300">{selectedExhibition.title}</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setIsDeleteModalOpen(true)}
                                            className="w-[90px] h-[30px] text-sm text-primary-300 border border-primary-300 rounded-full"
                                        >
                                            삭제하기
                                        </button>
                                        <button
                                            onClick={() => navigate(`/exhibitions/edit/${selectedExhibition.id}`, { state: selectedExhibition })}
                                            className="w-[90px] h-[30px] text-sm text-white border border-primary-300 bg-primary-300 rounded-full"
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

                                {/* 전시 기본 정보 */}
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center">
                                        <img src={chat} alt="chat icon" className="w-[24px] h-[24px] inline-block mr-2" />
                                        <span className="font-semibold text-lg">전시 기본 정보</span>
                                    </div>
                                    <div className="text-sm grid grid-cols-[100px_1fr] gap-y-2">
                                        <span className="font-medium">전시 제목</span>
                                        <span>{selectedExhibition.title}</span>

                                        <span className="font-medium">전시 설명</span>
                                        <span>{selectedExhibition.description}</span>
                                    </div>
                                </div>

                                {/* 전시 이미지 */}
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center">
                                        <img src={chat} alt="chat icon" className="w-[24px] h-[24px] inline-block mr-2" />
                                        <span className="font-semibold text-lg">전시 이미지</span>
                                    </div>
                                    {selectedExhibition.images && selectedExhibition.images.length > 0 ? (
                                        <div className="flex gap-4 overflow-x-auto scrollbar-hide py-2">
                                            {selectedExhibition.images.map((img: string, idx: number) => (
                                                <img
                                                    key={idx}
                                                    src={img}
                                                    alt={`전시 이미지 ${idx + 1}`}
                                                    className="w-40 h-40 object-cover rounded-lg shadow-md flex-shrink-0"
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <span className="text-sm text-default-gray-500">등록된 이미지가 없습니다.</span>
                                    )}
                                </div>

                                {/* 일정 및 운영 정보 */}
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center">
                                        <img src={chat} alt="chat icon" className="w-[24px] h-[24px] inline-block mr-2" />
                                        <span className="font-semibold text-lg">일정 및 운영 정보</span>
                                    </div>
                                    <div className="text-sm grid grid-cols-[100px_1fr] gap-y-2">
                                        <span className="font-medium">전시 기간</span>
                                        <span>{selectedExhibition.period}</span>

                                        <span className="font-medium">운영 시간</span>
                                        <span>{selectedExhibition.operatingHours}</span>
                                    </div>
                                </div>

                                {/* 장소 정보 */}
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center">
                                        <img src={chat} alt="chat icon" className="w-[24px] h-[24px] inline-block mr-2" />
                                        <span className="font-semibold text-lg">장소 정보</span>
                                    </div>
                                    <div className="text-sm grid grid-cols-[100px_1fr] gap-y-2">
                                        <span className="font-medium">전시 공간 이름</span>
                                        <span>{selectedExhibition.spaceName}</span>

                                        <span className="font-medium">전시 공간 위치</span>
                                        <span>{selectedExhibition.spaceLocation}</span>
                                    </div>
                                </div>

                                {/* 전시 성격 */}
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center">
                                        <img src={chat} alt="chat icon" className="w-[24px] h-[24px] inline-block mr-2" />
                                        <span className="font-semibold text-lg">전시 성격</span>
                                    </div>
                                    <div className="text-sm grid grid-cols-[100px_1fr] gap-y-2">
                                        <span className="font-medium">전시 유형</span>
                                        <span>{selectedExhibition.exhibitionType}</span>

                                        <span className="font-medium">전시 형태</span>
                                        <span>{selectedExhibition.exhibitionFormat}</span>

                                        <span className="font-medium">전시 분위기</span>
                                        <span>{selectedExhibition.exhibitionMood}</span>
                                    </div>
                                </div>

                                {/* 입장 및 외부 링크 */}
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center">
                                        <img src={chat} alt="chat icon" className="w-[24px] h-[24px] inline-block mr-2" />
                                        <span className="font-semibold text-lg">입장 및 외부 링크</span>
                                    </div>
                                    <div className="text-sm grid grid-cols-[100px_1fr] gap-y-2">
                                        <span className="font-medium">입장 정보</span>
                                        <span>{selectedExhibition.admissionInfo}</span>

                                        <span className="font-medium">연결 링크</span>
                                        <a href={selectedExhibition.websiteLink}>{selectedExhibition.websiteLink}</a>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </main>
        </div>
    );
}
