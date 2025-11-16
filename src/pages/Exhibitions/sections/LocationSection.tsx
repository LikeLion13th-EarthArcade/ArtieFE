import DaumPostcode from 'react-daum-postcode';
import type { Address } from 'react-daum-postcode';

import { SectionHeader } from '../../Components/Common/SectionHeader';
import { FormInput } from '../../Components/Common/FormInput';

interface LocationSectionProps {
    address: string;
    detailAddress: string;
    onChangeDetailAddress: (v: string) => void;
    isPostcodeOpen: boolean;
    onTogglePostcode: (open: boolean) => void;
    onCompleteAddress: (data: Address) => void;
}

export function LocationSection({ address, detailAddress, onChangeDetailAddress, isPostcodeOpen, onTogglePostcode, onCompleteAddress }: LocationSectionProps) {
    return (
        <div className="flex flex-col gap-4 w-full max-w-[1040px]">
            <SectionHeader number={4} title="장소 정보" />

            <div className="flex flex-col gap-4">
                <div className="flex justify-between mx-1">
                    <span className="text-lg text-primary-300">전시 공간 위치</span>
                    <button
                        onClick={() => onTogglePostcode(true)}
                        className="text-sm text-default-gray-700 border border-default-gray-600 rounded-3xl px-4 py-1 cursor-pointer"
                    >
                        주소 검색
                    </button>
                </div>

                <FormInput label="" value={address} onChange={() => {}} placeholder="전시장 주소를 입력해주세요." readOnly />

                <FormInput label="" value={detailAddress} onChange={onChangeDetailAddress} placeholder="상세주소를 입력해주세요." />

                {isPostcodeOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
                        <div className="w-[450px] relative bg-white p-3 rounded-lg shadow-lg border border-primary-300">
                            <DaumPostcode onComplete={onCompleteAddress} autoClose={false} />
                            <div className="flex justify-end">
                                <button onClick={() => onTogglePostcode(false)} className="px-4 py-2 m-2 text-white bg-primary-300 rounded-lg cursor-pointer">
                                    닫기
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
