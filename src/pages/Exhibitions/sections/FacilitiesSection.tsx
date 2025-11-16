import { SectionHeader } from '../../Components/Common/SectionHeader';
import { FacilityCheckbox } from '../../Components/Common/FacilityCheckbox';
import type { FacilitiesState } from '../useExhibitionForm';

interface FacilityOption {
    label: string;
    value: string;
    checked: boolean;
}

interface FacilitiesSectionProps {
    facilityOptions: FacilityOption[];
    onChangeFacility: (value: keyof FacilitiesState) => void;
}

export function FacilitiesSection({ facilityOptions, onChangeFacility }: FacilitiesSectionProps) {
    return (
        <div className="flex flex-col gap-4 w-full max-w-[1040px]">
            <SectionHeader number={6} title="시설•옵션" />

            <FacilityCheckbox label="기타(선택)" options={facilityOptions} onChange={(value: string) => onChangeFacility(value as keyof FacilitiesState)} />
        </div>
    );
}
