import { X } from 'lucide-react';

interface SubmitModalProps {
    step: 0 | 1 | null;
    onClose: () => void;
    onConfirmFirst: () => void; // step 0일 때 확인
    onConfirmSecond: () => void; // step 1일 때 확인
}

export function SubmitModal({ step, onClose, onConfirmFirst, onConfirmSecond }: SubmitModalProps) {
    if (step === null) return null;

    const isFirst = step === 0;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
            <div className="bg-white w-[450px] p-8 rounded-2xl relative shadow-lg">
                {/* 닫기 버튼 */}
                <button onClick={onClose} className="absolute top-4 right-4 text-default-gray-500">
                    <X size={20} />
                </button>

                {/* 내용 */}
                <p className="text-center text-base mb-6 leading-relaxed">
                    {isFirst ? (
                        <>
                            전시 등록은 검토 후 승인됩니다.
                            <br />
                            승인까지 영업일 기준 2~3일 소요될 수 있습니다.
                            <br />
                            <span className="text-default-gray-600">승인 후 마이페이지에서 수정/삭제 가능합니다.</span>
                        </>
                    ) : (
                        <>
                            전시가 정상적으로 등록되었습니다!
                            <br />
                            승인 결과는 마이페이지에서 확인할 수 있습니다.
                        </>
                    )}
                </p>

                {/* 확인 버튼 */}
                <div className="flex justify-center">
                    <button className="px-6 py-2 rounded-full text-white bg-primary-300" onClick={isFirst ? onConfirmFirst : onConfirmSecond}>
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
}
