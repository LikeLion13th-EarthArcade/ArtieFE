interface CheckboxOption {
    value: string;
    label: string;
    checked: boolean;
}

interface CheckboxGroupProps {
    label?: string;
    helperText?: string;
    options: CheckboxOption[];
    onChange: (value: string, checked: boolean) => void;
    layout?: 'horizontal' | 'vertical';
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ label, helperText, options, onChange, layout = 'horizontal' }) => {
    return (
        <div className="flex flex-col gap-4">
            {label && <span className="text-lg text-primary-300 ml-1">{label}</span>}
            {helperText && <span className="text-sm text-default-gray-500 ml-1">{helperText}</span>}
            <div className={`flex ${layout === 'horizontal' ? 'flex-wrap' : 'flex-col'} gap-4`}>
                {options.map((option) => (
                    <label key={option.value} className="flex items-center text-default-gray-700 ml-1 gap-2 cursor-pointer">
                        <div className="relative flex items-center">
                            <input
                                type="checkbox"
                                className="w-5 h-5 appearance-none border border-primary-300 rounded checked:bg-primary-300 checked:border-primary-300 cursor-pointer"
                                checked={option.checked}
                                onChange={(e) => onChange(option.value, e.target.checked)}
                            />
                            {option.checked && (
                                <svg
                                    className="absolute top-0.5 left-0.5 w-4 h-4 text-white pointer-events-none"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            )}
                        </div>
                        {option.label}
                    </label>
                ))}
            </div>
        </div>
    );
};
