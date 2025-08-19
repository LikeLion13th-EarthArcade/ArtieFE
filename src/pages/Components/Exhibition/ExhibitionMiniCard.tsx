interface Exhibition {
    title: string;
    image: string;
    period: string;
    location: string;
}

interface ExhibitionMiniCardProps {
    ex: Exhibition;
}

export default function ExhibitionMiniCard({ ex }: ExhibitionMiniCardProps) {
    return (
        <div className="max-w-[350px] w-full rounded-[20px] shadow-[0_4px_10px_0_rgba(0,0,0,0.1)] p-6" style={{ border: `1px solid var(--color-primary-300)` }}>
            <img src={ex.image} alt={ex.title} className="rounded-[15px] w-full h-[180px] object-cover" />
            <h3 className="text-xl mt-4">{ex.title}</h3>
            <div className="mt-2 grid grid-rows-2 gap-1">
                <div className="flex items-start gap-3">
                    <span
                        className="w-[75px] flex-shrink-0 text-white px-2 py-1 rounded-[10px] text-center"
                        style={{ backgroundColor: 'var(--color-primary-200)' }}
                    >
                        기간
                    </span>
                    <span className="flex-1">{ex.period}</span>
                </div>
                <div className="flex items-start gap-3">
                    <span
                        className="w-[75px] flex-shrink-0 text-white px-2 py-1 rounded-[10px] text-center"
                        style={{ backgroundColor: 'var(--color-primary-200)' }}
                    >
                        장소
                    </span>
                    <span className="flex-1">{ex.location}</span>
                </div>
            </div>
        </div>
    );
}
