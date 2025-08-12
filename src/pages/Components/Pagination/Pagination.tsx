import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ page, totalPages, setPage }: { page: number; totalPages: number; setPage: (page: number) => void }) {
    return (
        <div className="flex justify-center gap-4 my-10 items-center">
            <button onClick={() => setPage(page - 1)} disabled={page === 1} className="disabled:cursor-default cursor-pointer">
                <ChevronLeft size={28} color={page === 1 ? '#C8C8C8' : '#E45F5F'} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-[40px] h-[40px] text-lg cursor-pointer ${p === page ? 'bg-[#E45F5F] text-white rounded-full' : 'text-[#636363]'}`}
                    aria-current={p === page ? 'page' : undefined}
                >
                    {p}
                </button>
            ))}

            <button onClick={() => setPage(page + 1)} disabled={page === totalPages} className="disabled:cursor-default cursor-pointer">
                <ChevronRight size={28} color={page === totalPages ? '#C8C8C8' : '#E45F5F'} />
            </button>
        </div>
    );
}
