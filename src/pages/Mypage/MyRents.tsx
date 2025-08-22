import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import calendar_icon from '../../icons/calendar.svg';
import home from '../../icons/home.svg';
import chat from '../../icons/chat.svg';

type Reservation = {
    id: number;
    spaceName: string;
    period: string;
    spaceLocation: string;
    request: string;
    status: '대기중' | '처리완료';
    isApproved?: boolean;
};

export default function MyRents() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'전체' | '대기중' | '처리완료'>('전체');
    const [showDetail, setShowDetail] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
    const [showCancelModal, setShowCancelModal] = useState(false);

    const [reservations, setReservations] = useState<Reservation[]>([
        {
            id: 1,
            spaceName: '스튜디오 A',
            period: '2025년 3월 20일 ~ 2025년 3월 21일',
            spaceLocation: '서울시 종로구 홍지문2길 20',
            request: '빔프로젝터 사용 요청, 조용한 환경 선호',
            status: '대기중',
        },
        {
            id: 2,
            spaceName: '회의실 B',
            period: '2025년 4월 10일 ~ 2025년 4월 11일',
            spaceLocation: '서울시 강남구 테헤란로 231',
            request: '화이트보드 사용 요청, 팀 회의 목적',
            status: '처리완료',
            isApproved: true,
        },
        {
            id: 3,
            spaceName: '컨퍼런스룸 C',
            period: '2025년 5월 1일 ~ 2025년 5월 2일',
            spaceLocation: '서울시 마포구 서강로 45',
            request: '회의 녹화 장비 필요',
            status: '처리완료',
            isApproved: false,
        },
    ]);

    const filteredReservations = activeTab === '전체' ? reservations : reservations.filter((r) => r.status === activeTab);

    const handleCancelReservation = () => {
        if (!selectedReservation) return;
        setReservations((prev) => prev.filter((r) => r.id !== selectedReservation.id));
        setShowCancelModal(false);
        setShowDetail(false);
    };

    const handleWriteReview = () => {
        if (selectedReservation) {
            navigate(`/spaces/${selectedReservation.id}/review`);
        }
    };

    return (
        <div className="flex items-center gap-5">
            <main className="flex-1">
                <div className="w-full bg-white rounded-2xl shadow-lg p-10">
                    <h1 className="text-2xl font-bold mb-6">예약 요청 내역</h1>

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
                                    {activeTab === '전체' && '아직 예약 요청한 공간이 없습니다.'}
                                    {activeTab === '대기중' && '대기중인 공간이 없습니다.'}
                                    {activeTab === '처리완료' && '처리완료된 공간이 없습니다.'}
                                </div>
                            ) : (
                                filteredReservations.map((r, idx) => (
                                    <div
                                        key={r.id}
                                        className={`flex justify-between items-center w-full py-4 ${idx === 0 ? 'border-t border-default-gray-400' : ''}`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <img src={calendar_icon} alt="calendar icon" className="w-[30px] h-[30px]" />
                                            <div className="flex flex-col">
                                                <span className="text-sm">{r.spaceName}</span>
                                                <span className="text-sm">{r.period}</span>
                                            </div>
                                        </div>

                                        {/* 버튼 로직 */}
                                        {activeTab === '전체' ? (
                                            r.status === '대기중' ? (
                                                <div className="flex gap-2">
                                                    <button className="w-[100px] h-[35px] text-sm rounded-[50px] border border-primary-300 text-primary-300">
                                                        승인 대기중
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedReservation(r);
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
                                                            r.isApproved
                                                                ? 'border-primary-300 text-white bg-primary-300'
                                                                : 'border-default-gray-400 bg-default-gray-400 text-default-gray-600'
                                                        }`}
                                                    >
                                                        {r.isApproved ? '승인됨' : '거절됨'}
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedReservation(r);
                                                            setShowDetail(true);
                                                        }}
                                                        className="w-[70px] h-[35px] text-sm rounded-[50px] border border-primary-300 text-primary-300"
                                                    >
                                                        자세히
                                                    </button>
                                                </div>
                                            )
                                        ) : r.status === '대기중' ? (
                                            <button className="w-[100px] h-[35px] text-sm rounded-[50px] border border-primary-300 text-primary-300">
                                                승인 대기중
                                            </button>
                                        ) : (
                                            <div className="flex gap-2">
                                                <button
                                                    className={`w-[70px] h-[35px] text-sm rounded-[50px] border ${
                                                        r.isApproved
                                                            ? 'border-primary-300 text-white bg-primary-300'
                                                            : 'border-default-gray-400 bg-default-gray-400 text-default-gray-600'
                                                    }`}
                                                >
                                                    {r.isApproved ? '승인됨' : '거절됨'}
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setSelectedReservation(r);
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
                        selectedReservation && (
                            <div className="w-full max-w-[1040px] p-6 rounded-2xl shadow-md border border-default-gray-100 bg-white flex flex-col gap-6">
                                {/* 예약 일정 */}
                                <div className="flex items-center pb-6 gap-8 border-b border-default-gray-400">
                                    <div className="flex items-center gap-2">
                                        <img src={calendar_icon} alt="calendar icon" className="w-[24px] h-[24px]" />
                                        <span className="text-lg font-medium">예약 일정</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="font-semibold text-sm">{selectedReservation.period}</span>
                                        <span
                                            className={`px-3 py-1 text-xs rounded-full border ${
                                                selectedReservation.status === '대기중'
                                                    ? 'text-primary-300 border-primary-300'
                                                    : selectedReservation.isApproved
                                                      ? 'bg-primary-300 text-white border-primary-300'
                                                      : 'border-default-gray-400 bg-default-gray-400 text-default-gray-600'
                                            }`}
                                        >
                                            {selectedReservation.status === '대기중' ? '승인 대기중' : selectedReservation.isApproved ? '승인됨' : '거절됨'}
                                        </span>
                                    </div>
                                </div>

                                {/* 공간 정보 */}
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center">
                                        <img src={home} alt="home icon" className="w-[24px] h-[24px] inline-block mr-2" />
                                        <span className="font-semibold text-lg">공간 정보</span>
                                    </div>
                                    <div className="text-sm grid grid-cols-[100px_1fr] gap-y-2">
                                        <span className="font-medium">공간 이름</span>
                                        <span>{selectedReservation.spaceName}</span>

                                        <span className="font-medium">예약 기간</span>
                                        <span>{selectedReservation.period}</span>

                                        <span className="font-medium">공간 위치</span>
                                        <span>{selectedReservation.spaceLocation}</span>
                                    </div>
                                </div>

                                {/* 요청 사항 */}
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center">
                                        <img src={chat} alt="chat icon" className="w-[24px] h-[24px] inline-block mr-2" />
                                        <span className="font-semibold text-lg">내가 적은 요청 사항</span>
                                    </div>
                                    <div className="text-sm">
                                        <p>{selectedReservation.request}</p>
                                    </div>
                                </div>

                                {/* 승인된 전시의 리뷰 작성 버튼 */}
                                {selectedReservation.status === '처리완료' && selectedReservation.isApproved && (
                                    <div className="flex justify-center gap-6 mt-6">
                                        <button onClick={handleWriteReview} className="w-[180px] h-[45px] rounded-[50px] bg-primary-300 text-white">
                                            전시 공간 리뷰 쓰기
                                        </button>
                                    </div>
                                )}

                                {/* 예약 취소 버튼 */}
                                {selectedReservation.status === '대기중' && (
                                    <div className="flex justify-center gap-6 mt-6">
                                        <button
                                            onClick={() => setShowCancelModal(true)}
                                            className="w-[150px] h-[45px] rounded-[50px] border border-primary-300 text-primary-300 bg-white"
                                        >
                                            예약 요청 취소
                                        </button>
                                    </div>
                                )}
                            </div>
                        )
                    )}
                </div>
            </main>

            {/* 예약 요청 취소 모달 */}
            {showCancelModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40">
                    <div className="bg-white w-[450px] p-8 rounded-2xl relative shadow-lg">
                        <p className="text-center text-base mb-6 leading-relaxed">
                            정말 이 예약 요청을 취소하시겠어요?
                            <br />
                            취소한 요청은 되돌릴 수 없습니다.
                        </p>

                        <div className="flex gap-4 mt-4">
                            <button onClick={handleCancelReservation} className="flex-1 py-2 rounded-lg bg-primary-300 text-white">
                                취소하기
                            </button>
                            <button onClick={() => setShowCancelModal(false)} className="flex-1 py-2 rounded-lg border border-primary-300 text-primary-300">
                                돌아가기
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
