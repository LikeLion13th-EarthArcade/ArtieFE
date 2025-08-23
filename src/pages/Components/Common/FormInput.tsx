import React from 'react';

interface FormInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    maxLength?: number;
    showCounter?: boolean;
    readOnly?: boolean;
    helperText?: string;
}

export const FormInput: React.FC<FormInputProps> = ({ label, value, onChange, placeholder, maxLength, showCounter = false, readOnly = false, helperText }) => {
    return (
        <div className="flex flex-col gap-4">
            <span className="text-lg text-primary-300 ml-1">{label}</span>
            <input
                type="text"
                value={value}
                onChange={(e) => {
                    const newValue = e.target.value;
                    if (maxLength && newValue.length <= maxLength) {
                        onChange(newValue);
                    } else if (!maxLength) {
                        onChange(newValue);
                    }
                }}
                placeholder={placeholder}
                readOnly={readOnly}
                className="rounded-lg p-3 w-full min-h-[50px] placeholder-default-gray-600 border border-primary-300 focus:outline-none focus:ring-0"
                maxLength={maxLength}
            />
            {helperText && <span className="text-sm text-default-gray-500 ml-1">{helperText}</span>}
            {showCounter && maxLength && (
                <span className="text-default-gray-500 text-sm text-right block mr-1">
                    {value.length} /{maxLength}
                </span>
            )}
        </div>
    );
};
