import keyboard from '../../../icons/keyboard.svg';
import { SectionHeader } from '../../Components/Common/SectionHeader';
import { FormInput } from '../../Components/Common/FormInput';
import { FormTextarea } from '../../Components/Common/FormTextarea';

interface BasicInfoSectionProps {
    title: string;
    description: string;
    onChangeTitle: (v: string) => void;
    onChangeDescription: (v: string) => void;
}

export function BasicInfoSection({ title, description, onChangeTitle, onChangeDescription }: BasicInfoSectionProps) {
    return (
        <div className="flex flex-col gap-4 w-full max-w-[1040px]">
            <SectionHeader number={1} title="전시 기본 정보" />

            <FormInput
                label="전시 제목"
                value={title}
                onChange={onChangeTitle}
                placeholder='전시의 이름을 입력해주세요. (예: "빛과 그림자의 대화")'
                maxLength={20}
                showCounter
            />

            <FormTextarea
                label="전시 설명"
                value={description}
                onChange={onChangeDescription}
                maxLength={500}
                showCounter
                icon={keyboard}
                iconAlt="keyboard icon"
                iconText="전시의 취지, 주요 작품, 작가 소개 등을 자유롭게 작성해주세요."
            />
        </div>
    );
}
