import { useState, useEffect, useRef } from 'react';

import { ChevronDown } from 'lucide-react';
import LeftFilledArrow from '../../../icons/left-filled-arrow.svg';
import RightFilledArrow from '../../../icons/right-filled-arrow.svg';

export default function DatePickerInput({
    value,
    onChange,
    placeholder,
    startDate,
    isEndDate = false,
}: {
    value: string;
    onChange: (date: string) => void;
    placeholder: string;
    startDate?: string;
    isEndDate?: boolean;
}) {
    const [open, setOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const dropdownRef = useRef<HTMLDivElement>(null);

    // 외부 클릭 시 닫기
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

    // 날짜 형식 변환 함수
    const formatDate = (date: Date) => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    };

    const formatDisplayDate = (dateStr: string) => {
        if (!dateStr) return placeholder;
        const [y, m, d] = dateStr.split('-');
        return `${y}.${m}.${d}`;
    };

    // 날짜가 선택 가능한지 확인하는 함수
    const isDateDisabled = (date: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // 과거 날짜는 비활성화
        if (date < today) {
            return true;
        }

        // 종료일의 경우 시작일보다 이전 날짜는 비활성화
        if (isEndDate && startDate) {
            const start = new Date(startDate);
            start.setHours(0, 0, 0, 0);
            if (date < start) {
                return true;
            }
        }

        return false;
    };

    // 날짜를 offset 만큼 변경하여 onChange 호출
    const changeDate = (offset: number) => {
        let currentDate;
        if (value) {
            const [y, m, d] = value.split('-').map(Number);
            currentDate = new Date(y, m - 1, d);
        } else {
            currentDate = new Date();
        }
        currentDate.setHours(0, 0, 0, 0);

        // 새로운 날짜 계산
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + offset);

        // 선택 가능한 날짜인지 확인
        if (!isDateDisabled(newDate)) {
            onChange(formatDate(newDate));
        }
    };

    // 주어진 월의 날짜 배열 생성
    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startDayOfWeek = firstDay.getDay();

        const days = [];

        // 이전 달 마지막 날짜들
        for (let i = 0; i < startDayOfWeek; i++) {
            const prevDate = new Date(year, month, -startDayOfWeek + i + 1);
            days.push({ date: prevDate, isCurrentMonth: false, isDisabled: true });
        }

        // 현재 달 날짜들
        for (let i = 1; i <= daysInMonth; i++) {
            const d = new Date(year, month, i);
            days.push({ date: d, isCurrentMonth: true, isDisabled: isDateDisabled(d) });
        }

        return days;
    };

    // 사용자가 날짜 클릭 시 선택 처리 및 드롭다운 닫기
    const handleDateSelect = (date: Date) => {
        if (isDateDisabled(date)) return;

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
        <div className="relative" ref={dropdownRef}>
            <div
                className="rounded-lg min-h-[50px] flex items-center justify-between px-3 gap-2 cursor-pointer"
                style={{ border: `1px solid var(--color-primary-300)` }}
            >
                {/* 왼쪽 화살표 */}
                <img src={LeftFilledArrow} alt="왼쪽 화살표" className="w-[18px] h-[18px] cursor-pointer" onClick={() => changeDate(-1)} />

                {/* 현재 선택된 날짜 표시 및 클릭 시 달력 열기/닫기 */}
                <div
                    className={`flex items-center gap-2 select-none cursor-pointer ${!value ? 'text-default-gray-600' : 'text-black'}`}
                    onClick={() => setOpen(!open)}
                >
                    <span>{formatDisplayDate(value)}</span>
                </div>

                {/* 오른쪽 화살표 */}
                <img src={RightFilledArrow} alt="오른쪽 화살표" className="w-[18px] h-[18px] cursor-pointer" onClick={() => changeDate(1)} />
            </div>

            {/* 달력 드롭다운 */}
            {open && (
                <div
                    className="w-[260px] absolute top-full mt-2 left-0 right-0 bg-white rounded-xl z-50 p-4"
                    style={{ border: `1px solid var(--color-primary-300)` }}
                >
                    {/* 달력 헤더 */}
                    <div className="flex items-center justify-between">
                        <button onClick={() => changeMonth(-1)} className="p-1 cursor-pointer">
                            <ChevronDown size={18} className="rotate-90" style={{ color: 'var(--color-default-gray-700)' }} />
                        </button>
                        <span>
                            {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
                        </span>
                        <button onClick={() => changeMonth(1)} className="p-1 cursor-pointer">
                            <ChevronDown size={18} className="-rotate-90" style={{ color: 'var(--color-default-gray-700)' }} />
                        </button>
                    </div>

                    {/* 요일 헤더 */}
                    <div className="grid grid-cols-7 gap-1">
                        {['일', '월', '화', '수', '목', '금', '토'].map((day) => (
                            <div key={day} className="text-default-gray-700 text-center text-sm py-2">
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
                                    disabled={day.isDisabled}
                                    className={`flex items-center justify-center w-7 h-7 text-sm rounded transition-colors
                                        ${day.isDisabled ? 'cursor-not-allowed text-gray-300' : 'cursor-pointer'}
                                        ${isSelected ? 'bg-[var(--color-primary-300)] text-white' : ''}
                                        ${!isSelected && !day.isDisabled ? 'hover:bg-[var(--color-default-gray-400)]' : ''}
                                        ${isToday && !isSelected && !day.isDisabled ? 'ring-1 ring-[var(--color-primary-300)]' : ''}
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
