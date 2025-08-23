import React from 'react';

interface FacilityCheckboxProps {
    label: string;
    options: { label: string; value: string; checked: boolean }[];
    onChange: (value: string) => void;
}

export const FacilityCheckbox: React.FC<FacilityCheckboxProps> = ({ label, options, onChange }) => {
    return (
        <div className="flex flex-col gap-4">
            <span className="text-lg text-primary-300 ml-1">{label}</span>
            <div className="flex flex-wrap justify-evenly items-center gap-3 rounded-lg p-3 w-full min-h-[50px] border border-primary-300 focus:outline-none focus:ring-0">
                {options.map((option, index) => (
                    <React.Fragment key={option.value}>
                        <label className="flex items-center gap-3 whitespace-nowrap">
                            {option.label}
                            <input type="checkbox" className="accent-primary-300" checked={option.checked} onChange={() => onChange(option.value)} />
                        </label>
                        {index < options.length - 1 && <div className="w-px h-6 bg-default-gray-500"></div>}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};
