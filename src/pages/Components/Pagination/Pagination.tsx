import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ page, totalPages, setPage }: { page: number; totalPages: number; setPage: (page: number) => void }) {
    return (
        <div className="flex justify-center gap-4 items-center">
            <button onClick={() => setPage(page - 1)} disabled={page === 1} className="disabled:cursor-default cursor-pointer">
                <ChevronLeft size={26} color={page === 1 ? 'var(--color-default-gray-500)' : 'var(--color-primary-300)'} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-[30px] h-[30px] text-base cursor-pointer ${p === page ? 'bg-[var(--color-primary-300)] text-white rounded-full' : 'text-[var(--color-default-gray-700)]'}`}
                    aria-current={p === page ? 'page' : undefined}
                >
                    {p}
                </button>
            ))}

            <button onClick={() => setPage(page + 1)} disabled={page === totalPages} className="disabled:cursor-default cursor-pointer">
                <ChevronRight size={26} color={page === totalPages ? 'var(--color-default-gray-500)' : 'var(--color-primary-300)'} />
            </button>
        </div>
    );
}
