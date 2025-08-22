import { useNavigate, useLocation } from 'react-router-dom';

import previous_arrow from '../../../icons/previous_arrow.svg';

export default function MyPageNav() {
    const navigate = useNavigate();
    const location = useLocation();

    const menuItems = [
        { label: '개인정보 관리', path: '/mypage/profile' },
        { label: '내 활동 보기', path: '/mypage/activity' },
        { label: '예약 요청 내역', path: '/mypage/rents' },
        { label: '내가 등록한 전시', path: '/mypage/exhibitions' },
        { label: '내가 등록한 공간', path: '/mypage/spaces' },
    ];

    return (
        <aside className="w-45">
            <div className="flex items-center gap-4 mb-6">
                <img src={previous_arrow} alt="뒤로가기" className="w-5 h-5 cursor-pointer" onClick={() => navigate('/')} />
                <h2 className="text-lg font-semibold text-primary-300">마이페이지</h2>
            </div>

            <nav className="flex flex-col gap-3">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path || (location.pathname === '/mypage' && item.path === '/mypage/profile');

                    return (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`flex items-center justify-center gap-3 px-4 py-2 rounded-xl font-medium transition
                                ${isActive ? 'bg-primary-300 text-white' : 'border border-primary-300 text-primary-300'}`}
                        >
                            {item.label}
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
}
