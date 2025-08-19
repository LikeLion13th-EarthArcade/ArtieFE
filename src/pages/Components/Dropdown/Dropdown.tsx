import { ChevronDown } from 'lucide-react';

interface DropdownProps {
    id: string;
    label?: string;
    helperText?: string;
    options: string[];
    placeholder: string;
    selected?: string;
    isOpen: boolean;
    onToggle: (id: string) => void;
    onChange?: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ id, label, helperText, options, placeholder, selected, isOpen, onToggle, onChange }) => {
    const handleSelect = (option: string) => {
        onChange?.(option);
        onToggle('');
    };

    return (
        <div className="flex flex-col gap-4 relative w-full">
            {label && <span className="text-primary-300 text-lg ml-1">{label}</span>}
            {helperText && <span className="text-default-gray-500 text-sm">{helperText}</span>}

            <div
                className={`rounded-lg p-3 w-full min-h-[50px] border border-primary-300 flex justify-between items-center cursor-pointer ${!selected ? 'text-default-gray-600' : 'text-black'}`}
                onClick={() => onToggle(id)}
            >
                <span className="pr-2">{selected || placeholder}</span>
                <ChevronDown size={20} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-white shadow-md border border-primary-300 rounded-lg mt-1 z-10 max-h-60 overflow-y-auto">
                    {options.map((option, idx) => (
                        <div
                            key={idx}
                            className="px-4 py-2 cursor-pointer hover:bg-default-gray-400 text-center text-default-gray-700"
                            onClick={() => handleSelect(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
