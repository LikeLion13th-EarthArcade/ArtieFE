interface SectionHeaderProps {
    number: number;
    title: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ number, title }) => {
    return (
        <div className="flex items-center gap-3">
            <div className="w-[27px] h-[27px] bg-primary-300 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">{number}</span>
            </div>
            <span className="text-2xl font-bold">{title}</span>
        </div>
    );
};
