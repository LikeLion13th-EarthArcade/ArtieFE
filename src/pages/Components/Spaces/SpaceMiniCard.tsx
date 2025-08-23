import type { ISpace } from '@/types/spaces/spaces';
import Sample1 from '../../../images/sample1.jpeg';

interface SpaceMiniCardProps {
    space: ISpace;
}

export default function SpaceMiniCard({ space }: SpaceMiniCardProps) {
    return (
        <div className="w-full h-[290px] rounded-2xl border border-primary-300 shadow-[0_4px_10px_0_rgba(0,0,0,0.1)] p-4">
            <img src={Sample1} alt="전시 공간 사진입니다." className="rounded-xl w-full h-[130px] object-cover" />
            <h3 className="text-base mt-3">{space.name}</h3>
            <div className="mt-2 grid grid-rows-1 gap-1">
                <div className="flex items-start gap-3">
                    <span className="w-[45px] flex-shrink-0 text-xs text-white px-2 py-1 rounded-lg text-center bg-primary-200">기간</span>
                    <span className="flex-1 text-sm">
                        {space.startDate} - {space.endDate}
                    </span>
                </div>
                <div className="flex items-start gap-3">
                    <span className="w-[45px] flex-shrink-0 text-xs text-white px-2 py-1 rounded-lg text-center bg-primary-200">장소</span>
                    <span className="flex-1 text-sm">{space.address}</span>
                </div>
            </div>
        </div>
    );
}
