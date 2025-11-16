import Dropdown from '../../Components/Dropdown/Dropdown';
import { SectionHeader } from '../../Components/Common/SectionHeader';
import type { SelectedValuesState } from '../useExhibitionForm';

interface CharacteristicsSectionProps {
    openId: string;
    onToggleDropdown: (id: string) => void;

    selectedType: string;
    selectedForm: string;
    selectedMood: string;

    onChangeSelectedValues: React.Dispatch<React.SetStateAction<SelectedValuesState>>;
}

export function CharacteristicsSection({
    openId,
    onToggleDropdown,
    selectedType,
    selectedForm,
    selectedMood,
    onChangeSelectedValues,
}: CharacteristicsSectionProps) {
    const handleChangeField = (field: keyof SelectedValuesState, value: string) => {
        onChangeSelectedValues((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <div className="flex flex-col gap-4 w-full max-w-[1040px]">
            <SectionHeader number={5} title="전시 성격" />

            <div className="grid grid-cols-2 gap-4">
                <Dropdown
                    id="type"
                    label="전시 유형"
                    placeholder="전시 유형을 선택해주세요."
                    options={['회화', '조각·설치', '공예·디자인', '사진·미디어 아트']}
                    selected={selectedType}
                    isOpen={openId === 'type'}
                    onToggle={onToggleDropdown}
                    onChange={(value) => handleChangeField('type', value)}
                />

                <Dropdown
                    id="form"
                    label="전시 형태"
                    placeholder="전시 형태를 선택해주세요."
                    options={['개인전', '단체전']}
                    selected={selectedForm}
                    isOpen={openId === 'form'}
                    onToggle={onToggleDropdown}
                    onChange={(value) => handleChangeField('form', value)}
                />
            </div>

            <Dropdown
                id="mood"
                label="전시 분위기"
                placeholder="전시 분위기를 선택해주세요."
                options={['혼자 보기 좋은', '데이트 하기 좋은', '트렌디한 MZ 감성이 있는', '가족과 즐기기 좋은']}
                selected={selectedMood}
                isOpen={openId === 'mood'}
                onToggle={onToggleDropdown}
                onChange={(value) => handleChangeField('mood', value)}
            />
        </div>
    );
}
