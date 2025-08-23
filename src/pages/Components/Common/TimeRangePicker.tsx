interface TimeRangePickerProps {
    label: string;
    startTime: string;
    endTime: string;
    onStartTimeChange: (time: string) => void;
    onEndTimeChange: (time: string) => void;
    openId: string;
    onToggle: (id: string) => void;
    timeOptions: string[];
    timeToMinutes: (time: string) => number;
}

export const TimeRangePicker: React.FC<TimeRangePickerProps> = ({ label }) => {
    // Dropdown 컴포넌트를 import해야 함
    return (
        <div className="flex flex-col gap-4">
            <span className="text-lg text-primary-300 ml-1">{label}</span>
            <div className="flex gap-3">
                <div className="relative">{/* Dropdown 컴포넌트 사용 */}</div>
                <span className="flex items-center">~</span>
                <div className="relative">{/* Dropdown 컴포넌트 사용 */}</div>
            </div>
        </div>
    );
};
