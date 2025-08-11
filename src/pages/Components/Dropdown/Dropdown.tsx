import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import SearchIcon from '../../../icons/search.svg';

// 개별 선택 드롭다운 컴포넌트
function SelectDropdown({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // 드롭다운 외부 클릭 감지 후 닫기 처리
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
            <span className={`text-[18px] select-none cursor-pointer text-center text-[#636363]`} onClick={() => setOpen(!open)}>
                {value || label}
            </span>

            {/* 화살표 아이콘 */}
            <button
                type="button"
                className={`transition-transform duration-200 cursor-pointer text-[#636363] ${open ? 'rotate-180' : 'rotate-0'}`}
                onClick={(e) => {
                    e.stopPropagation();
                    setOpen((prev) => !prev);
                }}
            >
                <ChevronDown size={28} />
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
                                className={`px-4 py-3 text-[18px] hover:bg-gray-100 cursor-pointer text-center border-b border-[#EAEAEA] ${
                                    idx === options.length - 1 ? 'border-b-0' : ''
                                }`}
                                style={{
                                    color: value === opt ? '#E45F5F' : '#636363',
                                }}
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
// 구분선 컴포넌트
function Divider() {
    return <div className="w-[1px] h-[60%] bg-[#EAEAEA]" />;
}

// 전체 드롭다운 컨테이너 컴포넌트
function DropdownWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full min-w-0 flex-1 max-w-[1365px] h-[70px] bg-white shadow-[0_4px_10px_rgba(0,0,0,0.1)] rounded-[40px] flex items-center overflow-visible">
            {children}
        </div>
    );
}

// 검색 버튼 컴포넌트
function SearchBtn({ onClick }: { onClick: () => void }) {
    return (
        <div
            onClick={onClick}
            className="flex-shrink-0 w-[60px] h-[60px] flex items-center justify-center cursor-pointer bg-[#E45F5F] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-full"
        >
            <img src={SearchIcon} alt="검색 이미지" className="w-[25px] h-[25px] object-contain" />
        </div>
    );
}

type DropdownKey = 'type' | 'region' | 'format' | 'date';

interface DropdownProps {
    selectedOptions: Record<DropdownKey, string>;
    onDropdownChange: (key: DropdownKey, value: string) => void;
    dropdowns: {
        key: DropdownKey;
        label: string;
        options: string[];
    }[];
    children?: React.ReactNode;
    onSearch: () => void;
}

export default function Dropdown({ selectedOptions, onDropdownChange, dropdowns, children, onSearch }: DropdownProps) {
    return (
        <div className="flex justify-center items-center py-8 gap-6 w-full max-w-screen-2xl mx-auto px-4">
            <DropdownWrapper>
                {dropdowns.map((dd, idx) => (
                    <div key={dd.key} className="flex items-center h-full flex-1 min-w-0">
                        {/* 개별 드롭다운 */}
                        <SelectDropdown label={dd.label} value={selectedOptions[dd.key]} options={dd.options} onChange={(v) => onDropdownChange(dd.key, v)} />
                        {/* 드롭다운 사이 구분선 */}
                        {idx < dropdowns.length - 1 && <Divider />}
                    </div>
                ))}
                {/* 추가 children (ex. DatePicker) 있으면 오른쪽에 표시 */}
                {children && (
                    <>
                        <Divider />
                        <div className="flex items-center h-full flex-1 min-w-0">{children}</div>
                    </>
                )}
            </DropdownWrapper>
            {/* 검색 버튼 */}
            <SearchBtn onClick={onSearch} />
        </div>
    );
}
