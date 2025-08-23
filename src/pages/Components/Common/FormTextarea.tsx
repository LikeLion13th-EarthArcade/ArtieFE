interface FormTextareaProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    maxLength?: number;
    showCounter?: boolean;
    minHeight?: string;
    icon?: string;
    iconAlt?: string;
    iconText?: string;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
    label,
    value,
    onChange,
    placeholder,
    maxLength,
    showCounter = false,
    minHeight = '200px',
    icon,
    iconAlt,
    iconText,
}) => {
    return (
        <div className="flex flex-col gap-4">
            <span className="text-lg text-primary-300 ml-1">{label}</span>
            <div className="relative w-full" style={{ minHeight }}>
                <textarea
                    value={value}
                    onChange={(e) => {
                        const newValue = e.target.value;
                        if (maxLength && newValue.length <= maxLength) {
                            onChange(newValue);
                        } else if (!maxLength) {
                            onChange(newValue);
                        }
                    }}
                    className="placeholder-transparent rounded-lg p-3 w-full border border-primary-300 focus:outline-none focus:ring-0 resize-none"
                    style={{ minHeight }}
                    maxLength={maxLength}
                    placeholder={placeholder}
                />
                {value.length === 0 && icon && iconText && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-4">
                        <img src={icon} alt={iconAlt} className="w-9 h-9 mb-2" />
                        <span className="text-default-gray-600">{iconText}</span>
                    </div>
                )}
            </div>
            {showCounter && maxLength && (
                <span className="text-default-gray-500 text-sm text-right block mr-1">
                    {value.length} /{maxLength}
                </span>
            )}
        </div>
    );
};
