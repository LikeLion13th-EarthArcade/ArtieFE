import { useState } from 'react';
import calendar_icon from '../../icons/calendar.svg';
import profile_icon from '../../icons/profile_icon.svg';
import chat from '../../icons/chat.svg';
import pin from '../../icons/pin.svg';

export default function SpaceReservation() {
    const [activeTab, setActiveTab] = useState<'진행중' | '완료됨' | '취소됨'>('진행중');
    const [showDetail, setShowDetail] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [selectedReason, setSelectedReason] = useState('');
    const [customReason, setCustomReason] = useState('');

    const [reservations, setReservations] = useState<
        {
            id: number;
            name: string;
            email: string;
            phone: string;
            period: string;
            request: string;
            status: '진행중' | '완료됨' | '취소됨';
            cancelReason?: string;
        }[]
    >([
        {
            id: 1,
            name: '장지연',
            email: 'jjiyeon27@naver.com',
            phone: '010-1234-5678',
            period: '9월 17일 ~ 9월 18일',
            request: '빔프로젝터 사용 요청, 조용한 환경 선호',
            status: '진행중',
        },
        {
            id: 2,
            name: '지유진',
            email: 'gildong1234@naver.com',
            phone: '010-1234-5678',
            period: '9월 19일 ~ 9월 30일',
            request: '빔프로젝터 사용 요청, 조용한 환경 선호',
            status: '완료됨',
        },
    ]);

    const [selectedReservation, setSelectedReservation] = useState<(typeof reservations)[0] | null>(null);

    const cancelReasons = [
        '이용 목적이 부적절함',
        '허위 정보 또는 부정확한 예약 내용',
        '중복 예약 요청',
        '지나치게 급박한 일정 요청',
        '연락 불가 또는 응답 없음',
        '기타 (직접 입력)',
    ];

    // 예약 확정
    const handleConfirm = (id: number) => {
        setReservations((prev) => prev.map((r) => (r.id === id ? { ...r, status: '완료됨' } : r)));
        setSelectedReservation((prev) => (prev ? { ...prev, status: '완료됨' } : prev));
    };

    // 예약 취소
    const handleCancel = () => {
        if (selectedReason === '기타 (직접 입력)' && !customReason.trim()) {
            alert('취소 사유를 입력해주세요.');
            return;
        }
        setReservations((prev) =>
            prev.map((r) =>
                r.id === (selectedReservation?.id ?? 0)
                    ? { ...r, status: '취소됨', cancelReason: selectedReason === '기타 (직접 입력)' ? customReason : selectedReason }
                    : r,
            ),
        );
        setShowCancelModal(false);
        setShowDetail(false);
        setSelectedReservation(null);
    };

    return (
        <div className="flex flex-col items-center w-[70%] p-10 gap-10 mx-auto">
            {/* 타이틀 */}
            <div className="flex items-center gap-3 w-full max-w-[1040px]">
                <img src={calendar_icon} alt="calendar icon" className="w-[30px] h-[30px]" />
                <span className="text-3xl font-bold">예약 관리</span>
            </div>

            {/* 탭 메뉴 */}
            <div className="flex gap-10 w-full max-w-[1040px]">
                {['진행중', '완료됨', '취소됨'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => {
                            setActiveTab(tab as '진행중' | '완료됨' | '취소됨');
                            setShowDetail(false);
                        }}
                        className={`pb-2 text-lg font-medium ${activeTab === tab ? 'text-primary-300 border-b-2 border-primary-300' : 'text-default-gray-500'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* 콘텐츠 */}
            <div className="flex flex-col w-full max-w-[1040px] divide-y divide-default-gray-400">
                {!showDetail
                    ? reservations
                          .filter((r) => r.status === activeTab)
                          .map((r, idx) => (
                              <div
                                  key={r.id}
                                  className={`flex justify-between items-center w-full py-4 ${idx === 0 ? 'border-t border-default-gray-400' : ''}`}
                              >
                                  <div className="flex items-center gap-3">
                                      <img src={calendar_icon} alt="calendar icon" className="w-[30px] h-[30px]" />
                                      <div className="flex flex-col">
                                          <span>{r.period}</span>
                                          <span>{r.name}</span>
                                      </div>
                                  </div>
                                  {r.status === '취소됨' ? (
                                      <button className="px-4 py-2 rounded-[50px] border border-primary-300 text-primary-300 max-w-[200px] truncate">
                                          취소 사유: {r.cancelReason}
                                      </button>
                                  ) : (
                                      <button
                                          onClick={() => {
                                              setShowDetail(true);
                                              setSelectedReservation(r);
                                          }}
                                          className="w-[90px] h-[40px] rounded-[50px] text-white bg-primary-300 border border-primary-300"
                                      >
                                          자세히
                                      </button>
                                  )}
                              </div>
                          ))
                    : // 상세 보기
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
                                          className={`px-3 py-1 text-xs rounded-full ${
                                              selectedReservation.status === '완료됨'
                                                  ? 'bg-primary-300 text-white border border-primary-300'
                                                  : 'text-primary-300 border border-primary-300'
                                          }`}
                                      >
                                          {selectedReservation.status === '완료됨' ? '예약 완료됨' : '진행중'}
                                      </span>
                                  </div>
                              </div>

                              {/* 예약자 정보 */}
                              <div className="flex flex-col gap-4">
                                  <div className="flex items-center">
                                      <img src={profile_icon} alt="profile icon" className="w-[24px] h-[24px] inline-block mr-2" />
                                      <span className="font-semibold text-lg">예약자 정보</span>
                                  </div>
                                  <div className="text-sm grid grid-cols-[150px_1fr] gap-y-2">
                                      <span className="font-medium">예약자 이름</span>
                                      <span>{selectedReservation.name}</span>

                                      <span className="font-medium">예약자 이메일</span>
                                      <span>{selectedReservation.email}</span>

                                      <span className="font-medium">예약자 전화번호</span>
                                      <span>{selectedReservation.phone}</span>
                                  </div>
                              </div>

                              {/* 요청 사항 */}
                              <div className="flex flex-col gap-4">
                                  <div className="flex items-center">
                                      <img src={chat} alt="chat icon" className="w-[24px] h-[24px] inline-block mr-2" />
                                      <span className="font-semibold text-lg">요청 사항</span>
                                  </div>
                                  <div className="text-sm">
                                      <p>{selectedReservation.request}</p>
                                  </div>
                              </div>

                              {/* 버튼 */}
                              {selectedReservation.status === '진행중' && (
                                  <div className="flex justify-center gap-6 mt-6">
                                      <button
                                          onClick={() => setShowCancelModal(true)}
                                          className="w-[150px] h-[50px] rounded-[50px] border border-primary-300 text-primary-300 bg-white"
                                      >
                                          예약 취소
                                      </button>
                                      <button
                                          onClick={() => handleConfirm(selectedReservation.id)}
                                          className="w-[150px] h-[50px] rounded-[50px] text-white bg-primary-300 border border-primary-300"
                                      >
                                          예약확정
                                      </button>
                                  </div>
                              )}
                          </div>
                      )}
                {reservations.filter((r) => r.status === activeTab).length === 0 && (
                    <div className="p-6 text-center text-default-gray-500">
                        {activeTab === '진행중' && '진행중인 예약이 없습니다.'}
                        {activeTab === '완료됨' && '완료된 예약이 없습니다.'}
                        {activeTab === '취소됨' && '취소된 예약이 없습니다.'}
                    </div>
                )}
            </div>

            {/* 예약 취소 모달 */}
            {showCancelModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
                    <div className="bg-white rounded-2xl shadow-lg w-[400px] p-6 flex flex-col gap-6">
                        <div className="flex justify-between items-center pb-4 border-b border-primary-300">
                            <div className="flex items-center">
                                <img src={pin} alt="pin icon" className="w-[20px] h-[20px] inline-block mr-2" />
                                <h2 className="text-lg font-semibold">취소 사유 입력</h2>
                            </div>
                            <button onClick={() => setShowCancelModal(false)} className="text-default-gray-500">
                                ✕
                            </button>
                        </div>
                        <div className="flex flex-col gap-3">
                            {cancelReasons.map((reason) => (
                                <label key={reason} className="flex justify-between items-center cursor-pointer">
                                    <span>{reason}</span>
                                    <input
                                        type="radio"
                                        name="cancelReason"
                                        value={reason}
                                        checked={selectedReason === reason}
                                        onChange={(e) => setSelectedReason(e.target.value)}
                                        className="w-4 h-4 accent-primary-300"
                                    />
                                </label>
                            ))}
                        </div>
                        {selectedReason === '기타 (직접 입력)' && (
                            <div className="flex flex-col gap-2">
                                <textarea
                                    value={customReason}
                                    onChange={(e) => setCustomReason(e.target.value.slice(0, 300))}
                                    placeholder="취소 사유를 입력해주세요"
                                    className="w-full border border-default-gray-400 rounded-md p-2 text-sm 
                       focus:outline-none focus:ring-0 focus:border-primary-300"
                                />
                                <span className="text-xs text-right text-default-gray-500">{customReason.length} / 300</span>
                            </div>
                        )}
                        <button onClick={handleCancel} className="w-full h-[45px] rounded-[10px] bg-primary-300 text-white font-medium">
                            예약 취소
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
