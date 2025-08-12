import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import LeftFilledArrow from '../../../icons/left-filled-arrow.svg';
import RightFilledArrow from '../../../icons/right-filled-arrow.svg';

export default function DatePicker({
    value,
    onChange,
    formatDisplayDate,
    formatDate,
}: {
    value: string;
    onChange: (date: string) => void;
    formatDisplayDate: (dateStr: string) => string;
    formatDate: (date: Date) => string;
}) {
    const [open, setOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const dropdownRef = useRef<HTMLDivElement>(null);

    // 외부 클릭 시 드롭다운 닫기 처리
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        if (open) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [open]);

    // 날짜를 offset 만큼 변경하여 onChange 호출
    const changeDate = (offset: number) => {
        let currentDate;
        if (value) {
            const [year, month, day] = value.split('-').map(Number);
            currentDate = new Date(year, month - 1, day);
        } else {
            currentDate = new Date();
        }
        currentDate.setHours(0, 0, 0, 0);
        currentDate.setDate(currentDate.getDate() + offset);
        onChange(formatDate(currentDate));
    };

    // 주어진 월의 날짜 배열 생성
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();

        // 해당 월의 첫째 날과 마지막 날 계산
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();

        // 첫째 날의 요일 (0:일요일, 1:월요일, ...)
        const startDate = firstDay.getDay();

        const days = [];

        // 이전 달 마지막 날짜들 (달력 앞부분 빈칸 채우기용)
        for (let i = 0; i < startDate; i++) {
            const prevDate = new Date(year, month, -startDate + i + 1);
            days.push({ date: prevDate, isCurrentMonth: false });
        }

        // 현재 달 날짜들
        for (let i = 1; i <= daysInMonth; i++) {
            days.push({ date: new Date(year, month, i), isCurrentMonth: true });
        }

        return days;
    };

    // 사용자가 날짜 클릭 시 선택 처리 및 드롭다운 닫기
    const handleDateSelect = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDate();
        const normalizedDate = new Date(year, month, day, 0, 0, 0, 0);
        onChange(formatDate(normalizedDate));
        setOpen(false);
    };

    // 현재 보여지는 달 변경 (offset: -1 이전 달, +1 다음 달)
    const changeMonth = (offset: number) => {
        setCurrentMonth((prev) => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() + offset);
            return newDate;
        });
    };

    const days = getDaysInMonth(currentMonth);
    let selectedDate = null;
    if (value) {
        const [year, month, day] = value.split('-').map(Number);
        selectedDate = new Date(year, month - 1, day);
    }

    return (
        <div className="flex-1 h-full flex items-center justify-between px-8 relative" ref={dropdownRef}>
            {/* 왼쪽 화살표 */}
            <img src={LeftFilledArrow} alt="왼쪽 화살표" className="w-[28px] h-[28px] cursor-pointer" onClick={() => changeDate(-1)} />

            {/* 현재 선택된 날짜 표시 및 클릭 시 달력 열기/닫기 */}
            <div className="flex items-center gap-2 text-[#636363] text-[18px] select-none cursor-pointer" onClick={() => setOpen(!open)}>
                <span>{formatDisplayDate(value)}</span>
            </div>

            {/* 오른쪽 화살표 */}
            <img src={RightFilledArrow} alt="오른쪽 화살표" className="w-[28px] h-[28px] cursor-pointer" onClick={() => changeDate(1)} />

            {/* 달력 드롭다운 */}
            {open && (
                <div className="absolute top-full mt-4 left-0 right-0 bg-white rounded-[12px] shadow-[0_4px_10px_0_rgba(0,0,0,0.1)] z-50 p-4">
                    {/* 달력 헤더 */}
                    <div className="flex items-center justify-between mb-4">
                        <button onClick={() => changeMonth(-1)} className="p-1 cursor-pointer">
                            <ChevronDown size={20} className="rotate-90" />
                        </button>
                        <span className="text-lg font-medium">
                            {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
                        </span>
                        <button onClick={() => changeMonth(1)} className="p-1 cursor-pointer">
                            <ChevronDown size={20} className="-rotate-90" />
                        </button>
                    </div>

                    {/* 요일 헤더 */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                            <div key={day} className="text-center text-sm text-[#636363] py-2">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* 날짜 그리드 */}
                    <div className="grid grid-cols-7 gap-1">
                        {days.map((day, index) => {
                            const isSelected =
                                selectedDate &&
                                day.date.getDate() === selectedDate.getDate() &&
                                day.date.getMonth() === selectedDate.getMonth() &&
                                day.date.getFullYear() === selectedDate.getFullYear();

                            const isToday = new Date().toDateString() === day.date.toDateString();

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleDateSelect(day.date)}
                                    className={`
                                        p-2 text-sm rounded hover:bg-gray-100 transition-colors cursor-pointer
                                        ${!day.isCurrentMonth ? 'text-[#D9D9D9]' : 'text-[#636363]'}
                                        ${isSelected ? 'bg-[#E45F5F] text-white hover:bg-[#E45F5F]' : ''}
                                        ${isToday && !isSelected ? 'bg-gray-100' : ''}
                                    `}
                                >
                                    {day.date.getDate()}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
