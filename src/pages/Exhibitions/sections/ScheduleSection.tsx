import Dropdown from '../../Components/Dropdown/Dropdown';
import DatePickerInput from '../../Components/Common/DatePickerInput';
import { CheckboxGroup } from '../../Components/Common/CheckboxGroup';
import { SectionHeader } from '../../Components/Common/SectionHeader';

interface DayOffOption {
    value: string;
    label: string;
    checked: boolean;
}

interface ScheduleSectionProps {
    startDate: string;
    endDate: string;
    onChangeStartDate: (v: string) => void;
    onChangeEndDate: (v: string) => void;

    timeOptions: string[];
    openId: string;
    onToggleDropdown: (id: string) => void;
    startTime: string;
    endTime: string;
    onChangeStartTime: (v: string) => void;
    onChangeEndTime: (v: string) => void;

    dayOffOptions: DayOffOption[];
    onChangeDayOff: (day: string, checked: boolean) => void;

    holidayClosed: boolean;
    onChangeHolidayClosed: (v: boolean) => void;
}

export function ScheduleSection({
    startDate,
    endDate,
    onChangeStartDate,
    onChangeEndDate,
    timeOptions,
    openId,
    onToggleDropdown,
    startTime,
    endTime,
    onChangeStartTime,
    onChangeEndTime,
    dayOffOptions,
    onChangeDayOff,
    holidayClosed,
    onChangeHolidayClosed,
}: ScheduleSectionProps) {
    return (
        <div className="flex flex-col gap-4 w-full max-w-[1040px]">
            <SectionHeader number={3} title="일정 및 운영 정보" />

            {/* 전시 기간 */}
            <div className="flex flex-col gap-4">
                <span className="text-lg text-primary-300 ml-1">전시 기간</span>
                <div className="flex gap-3">
                    <DatePickerInput value={startDate} onChange={onChangeStartDate} placeholder="시작일을 선택하세요" />
                    <span className="flex items-center">~</span>
                    <DatePickerInput value={endDate} onChange={onChangeEndDate} placeholder="종료일을 선택하세요" />
                </div>
                <span className="text-sm text-default-gray-500">
                    전시 시작일과 종료일을 선택해주세요. <br /> (※ 종료일은 시작일보다 이후 날짜여야 합니다.)
                </span>
            </div>

            {/* 운영 시간 */}
            <div className="flex flex-col gap-4">
                <span className="text-lg text-primary-300 ml-1">운영 시간</span>
                <div className="flex gap-3">
                    <div className="relative">
                        <Dropdown
                            id="startTime"
                            placeholder="시작 시간"
                            options={timeOptions}
                            selected={startTime}
                            isOpen={openId === 'startTime'}
                            onToggle={onToggleDropdown}
                            onChange={onChangeStartTime}
                        />
                    </div>
                    <span className="flex items-center">~</span>
                    <div className="relative">
                        <Dropdown
                            id="endTime"
                            placeholder="종료 시간"
                            options={timeOptions}
                            selected={endTime}
                            isOpen={openId === 'endTime'}
                            onToggle={onToggleDropdown}
                            onChange={onChangeEndTime}
                        />
                    </div>
                </div>
            </div>

            {/* 정기 휴무 */}
            <CheckboxGroup
                label="정기 휴무"
                helperText="정기 휴무일이 없는 경우 선택하지 않으셔도 됩니다."
                options={dayOffOptions}
                onChange={onChangeDayOff}
                layout="horizontal"
            />

            {/* 공휴일 휴관 */}
            <div className="flex items-center gap-2 mt-2 ml-1">
                <div className="relative flex items-center">
                    <input
                        type="checkbox"
                        id="holidayClosed"
                        checked={holidayClosed}
                        onChange={(e) => onChangeHolidayClosed(e.target.checked)}
                        className="w-5 h-5 appearance-none border border-primary-300 rounded checked:bg-primary-300 checked:border-primary-300 cursor-pointer"
                    />
                    {holidayClosed && (
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
                <label htmlFor="holidayClosed" className="text-default-gray-700 cursor-pointer">
                    공휴일 휴관
                </label>
            </div>
        </div>
    );
}
