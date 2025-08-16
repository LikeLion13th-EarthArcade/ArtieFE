import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import clsx from 'clsx';
import { Menu, X } from 'lucide-react'; // 햄버거/닫기 아이콘
import profileIcon from '../../../icons/profile.svg';

const NAV_ITEMS = [
    { label: '지금 뜨는 전시', path: '/exhibitions' },
    { label: '전시 찾기', path: '/exhibitions/search' },
    { label: '전시 등록하기', path: '/exhibitions/request' },
    { label: '공간 대여하기', path: '/spaces' },
    { label: '공간 운영하기', path: '/spaces/request' },
];

export default function Navbar() {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="w-full bg-white shadow-md px-6 py-4">
            <div className="flex items-center justify-between">
                {/* 로고 */}
                <div>
                    <img src="/ArtieLogo.svg" alt="Artie Logo" className="h-6" />
                </div>

                {/* 데스크탑 메뉴 */}
                <ul className="hidden md:flex gap-6">
                    {NAV_ITEMS.map((item) => (
                        <li key={item.label}>
                            <Link
                                to={item.path}
                                className={clsx(
                                    'px-4 py-2 rounded-full cursor-pointer transition',
                                    location.pathname === item.path ? 'bg-[#E45F5F] text-white' : 'text-gray-700 hover:bg-gray-100',
                                )}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                <Link to="/mypage" className="hidden md:block">
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                        <img src={profileIcon} alt="프로필이미지" />
                    </div>
                </Link>

                <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {menuOpen && (
                <div className="md:hidden mt-4 space-y-2">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.label}
                            to={item.path}
                            onClick={() => setMenuOpen(false)}
                            className={clsx(
                                'block px-4 py-2 rounded-md transition',
                                location.pathname === item.path ? 'bg-[#E45F5F] text-white' : 'text-gray-700 hover:bg-gray-100',
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}

                    <Link to="/mypage" onClick={() => setMenuOpen(false)}>
                        <div className="flex items-center gap-2 px-4 py-2">
                            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                                <img src={profileIcon} alt="프로필이미지" />
                            </div>
                            <span className="text-gray-700">마이페이지</span>
                        </div>
                    </Link>
                </div>
            )}
        </nav>
    );
}
