import { useLocation, useNavigate } from 'react-router-dom';

export default function ReserveComplete() {
    const navigate = useNavigate();
    const location = useLocation();
    const space = location.state?.space;
    const reservationData = location.state?.reservationData;

    const handleHomeClick = () => {
        navigate('/');
    };

    return (
        <div className="flex flex-col items-center text-center p-10 rounded-2xl shadow-lg max-w-xl mx-auto mt-10 bg-white">
            <h1 className="text-2xl font-bold mb-3">예약 요청이 완료되었습니다.</h1>
            <p className="text-gray-600 mb-8">공간 등록자에게 요청이 전달되었으며, 확인 후 승인 여부를 알려드릴게요.</p>

            {/* 예약 정보 카드 */}
            <div className="w-full text-left bg-gray-50 rounded-2xl shadow-sm p-6 mb-8">
                <h2 className="text-lg font-semibold mb-4 border-b pb-2">예약 정보</h2>
                <ul className="space-y-3">
                    <li className="flex justify-between">
                        <span className="text-gray-500 font-medium">공간 이름</span>
                        <span className="font-semibold text-gray-800">
                            {space.title} <span className="text-sm text-gray-500">({space.address})</span>
                        </span>
                    </li>
                    <li className="flex justify-between">
                        <span className="text-gray-500 font-medium">예약 날짜</span>
                        <span className="font-semibold text-gray-800">
                            {new Date(Date.parse(reservationData.startDate)).toLocaleDateString()} ~{' '}
                            {new Date(Date.parse(reservationData.endDate)).toLocaleDateString()}
                        </span>
                    </li>
                    <li className="flex justify-between">
                        <span className="text-gray-500 font-medium">예약 시간</span>
                        <span className="font-semibold text-gray-800">
                            {reservationData.startTime} ~ {reservationData.endTime}
                        </span>
                    </li>
                </ul>
            </div>

            {/* 버튼 */}
            <button
                className="px-6 py-3 bg-primary-300 text-white font-semibold rounded-full hover:bg-primary-200 transition w-[200px] shadow-md"
                onClick={handleHomeClick}
            >
                예약 내역 보러가기 &gt;
            </button>
        </div>
    );
}
