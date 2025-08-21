import { useNavigate } from 'react-router-dom';
import mark_icon from '../../icons/mark_icon.svg';
import exhibition_icon from '../../icons/exhibition_icon.svg';

export default function SpaceManage() {
    const navigate = useNavigate();
    const spaces = [
        {
            id: 1,
            name: '스튜디오 J',
            address: '서울시 종로구 홍지문2길 20',
            status: '대기',
        },
        {
            id: 2,
            name: '스튜디오 Y',
            address: '서울특별시 종로구 삼청로 30',
            status: '승인',
        },
    ];

    return (
        <div className="flex flex-col items-center w-[70%] p-10 gap-10 mx-auto">
            {/* 타이틀 */}
            <div className="flex items-center gap-3 w-full max-w-[1040px]">
                <img src={mark_icon} alt="mark icon" className="w-[30px] h-[30px]" />
                <span className="text-3xl font-bold">공간 운영하기</span>
                <span className="text-sm text-default-gray-600 self-end">({spaces.length}개)</span>
            </div>

            {/* 콘텐츠 */}
            <div className="flex flex-col w-full max-w-[1040px] divide-y divide-default-gray-400">
                {spaces.map((space) => (
                    <div key={space.id} className="flex justify-between items-center w-full py-4 first:border-t last:border-b border-default-gray-400">
                        {/* 좌측 */}
                        <div className="flex items-center gap-3">
                            <img src={exhibition_icon} alt="exhibition icon" className="w-[30px] h-[30px]" />
                            <div className="flex flex-col">
                                <span>{space.name}</span>
                                <span>{space.address}</span>
                            </div>
                        </div>

                        {/* 우측 */}
                        <div className="flex gap-3">
                            <button className="w-[130px] h-[50px] rounded-[50px] text-primary-300 bg-white border border-primary-300">
                                {space.status === '대기' ? '승인 대기중' : '승인 완료'}
                            </button>
                            <button
                                onClick={() => navigate(`/spaces/management/${space.id}`)}
                                className="w-[130px] h-[50px] rounded-[50px] text-white bg-primary-300 border border-primary-300"
                            >
                                내 공간 관리
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
