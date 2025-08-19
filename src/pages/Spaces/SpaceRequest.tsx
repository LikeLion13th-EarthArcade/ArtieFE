import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-clock/dist/Clock.css';

export default function SpaceRequest() {
    const [step, setStep] = useState(1);
    const location = useLocation();
    const navigate = useNavigate();
    const space = location.state?.space;

    // 날짜/시간 상태
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    // 개인정보
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [requests, setRequests] = useState('');

    // Step 검증
    const validateStep = () => {
        if (step === 1) return startDate && endDate && startTime && endTime;
        if (step === 2) return name && phone && email;
        return true; // step 3, 4는 선택 사항
    };

    const handleNext = () => {
        if (!validateStep()) {
            alert('필수 입력값을 모두 채워주세요.');
            return;
        }
        setStep((prev) => prev + 1);
    };

    const handlePrev = () => setStep((prev) => prev - 1);

    const handleSubmit = () => {
        if (!validateStep()) {
            alert('필수 입력값을 모두 채워주세요.');
            return;
        }

        const reservationData = {
            startDate,
            endDate,
            startTime,
            endTime,
            name,
            phone,
            email,
            requests,
        };
        console.log('예약 정보:', reservationData);
        alert('예약이 완료되었습니다!');
        navigate(`/spaces/${space.id}/reserveComplete`, { state: { space, reservationData } });
    };

    return (
        <div className="flex flex-col justify-center px-10 py-8 max-w-3xl mx-auto">
            <div className="flex flex-col rounded-lg bg-white shadow-lg p-10 space-y-6">
                <h1 className="text-3xl font-bold">공간 예약하기 | {space.title}</h1>
                <div className="h-[1px] w-full bg-primary-300"></div>

                {/* Stepper */}
                <div className="flex justify-between text-sm font-medium text-gray-500">
                    <span className={step === 1 ? 'text-primary-300' : ''}>날짜 선택</span>
                    <span className={step === 2 ? 'text-primary-300' : ''}>개인정보</span>
                    <span className={step === 3 ? 'text-primary-300' : ''}>요청사항</span>
                    <span className={step === 4 ? 'text-primary-300' : ''}>결제수단</span>
                </div>

                {/* Step 1: 날짜/시간 */}
                {step === 1 && (
                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="flex-1 flex flex-col">
                                <span className="font-semibold">
                                    시작 날짜 <span className="text-primary-300">*</span>
                                </span>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    selectsStart
                                    minDate={new Date()}
                                    dateFormat={'yyyy/MM/dd'}
                                    showYearDropdown
                                    dropdownMode="select"
                                    startDate={startDate}
                                    endDate={endDate}
                                    className="mt-1 w-full border p-2 rounded-lg focus:outline-primary-300"
                                    placeholderText="날짜 선택"
                                />
                            </div>
                            <div className="flex-1 flex flex-col">
                                <span className="font-semibold">
                                    종료 날짜 <span className="text-primary-300">*</span>
                                </span>
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    selectsEnd
                                    showYearDropdown
                                    minDate={startDate || new Date()}
                                    dropdownMode="select"
                                    dateFormat={'yyyy/MM/dd'}
                                    startDate={startDate}
                                    endDate={endDate}
                                    className="mt-1 w-full border p-2 rounded-lg focus:outline-primary-300"
                                    placeholderText="날짜 선택"
                                />
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <label className="flex-1">
                                <span className="font-semibold">
                                    시작 시간 <span className="text-primary-300">*</span>
                                </span>
                                <input
                                    type="time"
                                    value={startTime}
                                    onChange={(e) => setStartTime(e.target.value)}
                                    className="mt-1 w-full border p-2 rounded-lg focus:outline-primary-300"
                                    required
                                />
                            </label>
                            <label className="flex-1">
                                <span className="font-semibold">
                                    종료 시간 <span className="text-primary-300">*</span>
                                </span>
                                <input
                                    type="time"
                                    value={endTime}
                                    onChange={(e) => setEndTime(e.target.value)}
                                    min={startTime}
                                    max="23:59"
                                    className="mt-1 w-full border p-2 rounded-lg focus:outline-primary-300"
                                    required
                                />
                            </label>{' '}
                        </div>
                    </div>
                )}

                {/* Step 2: 개인정보 */}
                {step === 2 && (
                    <div className="space-y-4">
                        <label className="block">
                            <span className="font-semibold">
                                이름 <span className="text-primary-300">*</span>
                            </span>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 w-full border p-2 rounded-lg focus:outline-primary-300"
                                placeholder="이름을 입력하세요"
                                required
                            />
                        </label>
                        <label className="block">
                            <span className="font-semibold">
                                전화번호 <span className="text-primary-300">*</span>
                            </span>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="mt-1 w-full border p-2 rounded-lg focus:outline-primary-300"
                                placeholder="010-1234-5678"
                                required
                            />
                        </label>
                        <label className="block">
                            <span className="font-semibold">
                                이메일 <span className="text-primary-300">*</span>
                            </span>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 w-full border p-2 rounded-lg focus:outline-primary-300"
                                placeholder="example@email.com"
                                required
                            />
                        </label>
                    </div>
                )}
                {step === 3 && (
                    <div className="space-y-4">
                        <label className="block">
                            <span className="font-semibold">요청사항 (선택)</span>
                            <textarea
                                value={requests}
                                onChange={(e) => setRequests(e.target.value)}
                                className="mt-1 w-full border p-2 rounded-lg resize-none focus:outline-primary-300"
                                rows={5}
                                placeholder="공간 이용과 관련해 호스트에게 전하고 싶은 내용을 입력해주세요. (예: 설치 요청, 입·퇴실 시간 등)"
                            />
                        </label>
                    </div>
                )}

                {step === 4 && (
                    <div className="space-y-6">
                        <p className="font-semibold text-lg mb-3">결제 수단 안내</p>
                        <div className="flex flex-col gap-6">
                            <div className="bg-gray-100 p-6 rounded-xl shadow-sm">
                                <p className="text-gray-700 leading-relaxed">
                                    예약 요청 즉시 호스트에게 알림이 전송되고 호스트가 대여자님께 개별 연락 드려 계좌 정보를 안내해 드립니다. 입금 확인 후
                                    호스트가 예약을 최종 확정합니다.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                    {step > 1 && (
                        <button className="py-2 px-6 text-primary-300 border border-primary-300 rounded-lg" onClick={handlePrev}>
                            이전
                        </button>
                    )}
                    {step < 4 ? (
                        <button className="ml-auto py-2 px-6 text-white bg-primary-300 rounded-lg" onClick={handleNext}>
                            다음
                        </button>
                    ) : (
                        <button className="ml-auto py-2 px-6 text-white bg-primary-300 rounded-lg" onClick={handleSubmit}>
                            예약 완료
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
