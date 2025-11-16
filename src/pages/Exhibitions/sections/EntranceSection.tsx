import Dropdown from '../../Components/Dropdown/Dropdown';
import { SectionHeader } from '../../Components/Common/SectionHeader';
import { FormInput } from '../../Components/Common/FormInput';

interface EntranceSectionProps {
    openId: string;
    onToggleDropdown: (id: string) => void;

    priceOption: string;
    price: string;
    link: string;

    onChangePriceOption: (v: string) => void;
    onChangePrice: (v: string) => void;
    onChangeLink: (v: string) => void;
}

export function EntranceSection({
    openId,
    onToggleDropdown,
    priceOption,
    price,
    link,
    onChangePriceOption,
    onChangePrice,
    onChangeLink,
}: EntranceSectionProps) {
    return (
        <div className="flex flex-col gap-4 w-full max-w-[1040px]">
            <SectionHeader number={7} title="입장 및 외부 링크" />

            <div className="flex flex-col gap-4">
                <Dropdown
                    id="price"
                    label="입장 정보"
                    helperText="무료 / 유료 여부를 선택하고, 유료일 경우 가격을 입력해주세요."
                    placeholder="무료 / 유료 여부를 선택해주세요."
                    options={['무료', '유료']}
                    selected={priceOption}
                    isOpen={openId === 'price'}
                    onToggle={onToggleDropdown}
                    onChange={onChangePriceOption}
                />

                {priceOption === '유료' && (
                    <input
                        type="text"
                        placeholder="가격을 입력해주세요."
                        className="rounded-lg p-3 w-full min-h-[50px] border border-primary-300 placeholder-default-gray-600 focus:outline-none focus:ring-0"
                        value={price}
                        onChange={(e) => onChangePrice(e.target.value)}
                    />
                )}
            </div>

            <FormInput
                label="연결 링크"
                value={link}
                onChange={onChangeLink}
                placeholder="더 많은 정보를 볼 수 있는 웹사이트, SNS, 예매처 링크 등을 입력해주세요."
            />
        </div>
    );
}
