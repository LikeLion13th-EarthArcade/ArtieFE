import { useNavigate } from 'react-router-dom';

interface Exhibition {
    exhibitionId: number;
    title: string;
    image: string;
    period: string;
    location: string;
}

interface ExhibitionMiniCardProps {
    ex: Exhibition;
}

export default function ExhibitionMiniCard({ ex }: ExhibitionMiniCardProps) {
    const navigate = useNavigate();
    function handleCardClick() {
        navigate(`/exhibitions/${ex.exhibitionId}`);
    }
    return (
        <div
            className="w-full rounded-2xl border border-primary-300 shadow-[0_4px_10px_0_rgba(0,0,0,0.1)] p-4 flex flex-col justify-center"
            onClick={handleCardClick}
        >
            <img src={ex.image} alt={ex.title} className="rounded-xl w-full h-[130px] object-cover" />

            <h3 className="text-base mt-3 w-full overflow-hidden text-ellipsis whitespace-nowrap">{ex.title}</h3>

            <div className="mt-2 space-y-3">
                <div className="flex items-start gap-2">
                    <span className="w-[45px] h-[23px] flex-shrink-0 text-xs text-white rounded-lg text-center bg-primary-200 flex items-center justify-center">
                        기간
                    </span>
                    <span className="flex-1 text-sm wrap">{ex.period}</span>
                </div>
                <div className="flex items-start gap-2">
                    <span className="w-[45px] h-[23px] flex-shrink-0 text-xs text-white rounded-lg text-center bg-primary-200 flex items-center justify-center">
                        장소
                    </span>
                    <span className="flex-1 text-sm wrap">{ex.location}</span>
                </div>
            </div>
        </div>
    );
}
