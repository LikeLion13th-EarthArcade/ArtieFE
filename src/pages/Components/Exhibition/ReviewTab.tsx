// ReviewTab.tsx
import type { Review } from '@/types/exhibitions/exhibitions';

interface ReviewTabProps {
    review: Review;
}

export default function ReviewTab({ review }: ReviewTabProps) {
    return (
        <div className="border rounded p-4">
            <p className="font-semibold">{review.userName}</p>
            <p>{review.content}</p>
            <p className="text-gray-400 text-sm">{review.createdAt}</p>
        </div>
    );
}
