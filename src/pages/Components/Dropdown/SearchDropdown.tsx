import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import LeftFilledArrow from '../../../icons/left-filled-arrow.svg';
import RightFilledArrow from '../../../icons/right-filled-arrow.svg';

type DropdownKey = 'type' | 'region' | 'mood' | 'date';

interface DropdownProps {
    selectedOptions: Record<DropdownKey, string>;
    onDropdownChange: (key: DropdownKey, value: string) => void;
    dropdowns: {
        key: DropdownKey;
        label: string;
        options: string[];
    }[];
    onSearch: () => void;
}

// 드롭다운 UI
function SelectDropdown({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // 드롭다운 외부 클릭 시 닫기
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

    return (
        <div className="flex-1 h-full flex items-center justify-between pl-12 pr-8 relative" ref={dropdownRef}>
            <span className="text-base select-none cursor-pointer text-default-gray-700 text-center whitespace-nowrap mx-auto" onClick={() => setOpen(!open)}>
                {value || label}
            </span>

            {/* 화살표 아이콘 */}
            <button
                type="button"
                className={`text-default-gray-700 transition-transform duration-200 cursor-pointer ${open ? 'rotate-180' : 'rotate-0'}`}
                onClick={(e) => {
                    e.stopPropagation();
                    setOpen((prev) => !prev);
                }}
            >
                <ChevronDown size={26} />
            </button>

            {/* 옵션 리스트 */}
            {open && (
                <div className="absolute top-full mt-4 left-0 right-0 bg-white rounded-[12px] shadow-[0_4px_10px_0_rgba(0,0,0,0.1)] z-50 max-h-[200px] overflow-hidden">
                    <div className="max-h-[200px] overflow-y-auto">
                        {options.map((opt: string, idx: number) => (
                            <div
                                key={opt}
                                onClick={() => {
                                    onChange(value === opt ? '' : opt);
                                    setOpen(false);
                                }}
                                className={`px-4 py-3 text-sm cursor-pointer text-center border-b border-default-gray-400
                                    ${idx === options.length - 1 ? 'border-b-0' : ''} ${value === opt ? 'text-primary-300' : 'text-default-gray-700'} 
                                hover:bg-default-gray-100`}
                            >
                                {opt}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
// 구분선
function Divider() {
    return <div className="w-[1px] h-[60%] bg-default-gray-400" />;
}

// 날짜 선택기
function DatePicker({ value, onChange }: { value: string; onChange: (date: string) => void }) {
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

    const formatDate = (date: Date): string => {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    };

    const formatDisplayDate = (dateStr: string): string => {
        if (!dateStr) return '날짜 선택';
        const [y, m, d] = dateStr.split('-').map(Number);
        return `${y}.${String(m).padStart(2, '0')}.${String(d).padStart(2, '0')}`;
    };

    const changeDate = (offset: number) => {
        let base: Date;
        if (value) {
            const [y, m, d] = value.split('-').map(Number);
            base = new Date(y, m - 1, d);
        } else {
            base = new Date();
        }
        base.setDate(base.getDate() + offset);
        onChange(formatDate(base));
    };

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDay = firstDay.getDay();
        const days = [];

        for (let i = 0; i < startDay; i++) {
            days.push({ date: new Date(year, month, -startDay + i + 1), isCurrentMonth: false });
        }
        for (let i = 1; i <= lastDay.getDate(); i++) {
            days.push({ date: new Date(year, month, i), isCurrentMonth: true });
        }
        return days;
    };

    const days = getDaysInMonth(currentMonth);

    let selectedDate: Date | null = null;
    if (value) {
        const [y, m, d] = value.split('-').map(Number);
        selectedDate = new Date(y, m - 1, d);
    }

    return (
        <div className="flex-1 h-full flex items-center justify-between px-8 relative" ref={dropdownRef}>
            {/* 날짜 이동 버튼 */}
            <img src={LeftFilledArrow} alt="왼쪽" className="w-[20px] h-[20px] cursor-pointer" onClick={() => changeDate(-1)} />
            <div className="flex items-center gap-2 text-base text-default-gray-700 select-none cursor-pointer" onClick={() => setOpen(!open)}>
                <span>{formatDisplayDate(value)}</span>
            </div>
            <img src={RightFilledArrow} alt="오른쪽" className="w-[20px] h-[20px] cursor-pointer" onClick={() => changeDate(1)} />

            {/* 캘린더 팝업 */}
            {open && (
                <div className="absolute top-full mt-4 left-0 right-0 bg-white rounded-[12px] shadow-md z-50 p-4">
                    <div className="flex items-center justify-between mb-4">
                        <button
                            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                            className="p-1 cursor-pointer"
                        >
                            <ChevronDown size={18} className="rotate-90" />
                        </button>
                        <span className="text-base font-medium">
                            {currentMonth.getFullYear()}년 {currentMonth.getMonth() + 1}월
                        </span>
                        <button
                            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                            className="p-1 cursor-pointer"
                        >
                            <ChevronDown size={18} className="-rotate-90" />
                        </button>
                    </div>

                    {/* 요일 */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
                            <div key={d} className="text-default-gray-700 text-center text-sm py-1">
                                {d}
                            </div>
                        ))}
                    </div>

                    {/* 날짜 */}
                    <div className="grid grid-cols-7 gap-1">
                        {days.map((day, idx) => {
                            const isSelected = selectedDate && day.date.toDateString() === selectedDate.toDateString();
                            const isToday = new Date().toDateString() === day.date.toDateString();

                            return (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        onChange(formatDate(day.date));
                                        setOpen(false);
                                    }}
                                    className={`flex items-center justify-center w-7 h-7 text-sm rounded transition-colors cursor-pointer
                                        ${!day.isCurrentMonth ? 'text-default-gray-400' : 'text-default-gray-700'}
                                        ${isSelected ? 'bg-primary-300 text-white' : ''}
                                        ${isToday && !isSelected ? 'bg-default-gray-400' : ''}
                                        hover:bg-default-gray-400`}
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

export default function SearchDropdown({ selectedOptions, onDropdownChange, dropdowns }: DropdownProps) {
    return (
        <div className="flex justify-center items-center py-8 gap-6 w-[70%] mx-auto">
            <div className="w-full flex-1 max-w-[1365px] h-[55px] bg-white shadow-md rounded-[40px] flex items-center">
                {dropdowns.map((dd, idx) => (
                    <div key={dd.key} className="flex items-center h-full flex-1 min-w-0">
                        {dd.key !== 'date' ? (
                            <SelectDropdown
                                label={dd.label}
                                value={selectedOptions[dd.key]}
                                options={dd.options}
                                onChange={(v) => onDropdownChange(dd.key, v)}
                            />
                        ) : (
                            <DatePicker value={selectedOptions.date} onChange={(v) => onDropdownChange('date', v)} />
                        )}
                        {idx < dropdowns.length - 1 && <Divider />}
                    </div>
                ))}
            </div>
        </div>
    );
}
