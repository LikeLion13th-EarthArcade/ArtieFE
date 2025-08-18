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
            {label && (
                <span className="text-[20px] ml-1" style={{ color: 'var(--color-primary-300)' }}>
                    {label}
                </span>
            )}
            {helperText && <span style={{ color: 'var(--color-default-gray-500)' }}>{helperText}</span>}
            <div
                className="rounded-lg p-3 w-full min-h-[50px] border flex justify-between items-center cursor-pointer"
                style={{ border: `1px solid var(--color-primary-300)`, color: selected ? '' : 'var(--color-default-gray-600)' }}
                onClick={() => onToggle(id)}
            >
                <span>{selected || placeholder}</span>
                <ChevronDown size={20} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </div>

            {isOpen && (
                <div
                    className="absolute top-full left-0 w-full bg-white shadow-md rounded-lg mt-1 z-10"
                    style={{ border: `1px solid var(--color-primary-300)` }}
                >
                    {options.map((option, idx) => (
                        <div key={idx} className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-center" onClick={() => handleSelect(option)}>
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
