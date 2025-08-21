import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import clsx from 'clsx';
import { Menu, X, ChevronDown } from 'lucide-react';
import profileIcon from '../../../icons/profile.svg';

const NAV_ITEMS = [
    { label: '전시 추천', path: '/exhibitions' },
    { label: '전시 찾기', path: '/exhibitions/search' },
    { label: '전시 등록하기', path: '/exhibitions/new' },
    { label: '공간 대여하기', path: '/spaces' },
];

const SPACE_SUB_ITEMS = [
    { label: '공간 운영하기', path: '/spaces/management' },
    { label: '공간 등록하기', path: '/spaces/new' },
    { label: '예약 관리', path: '/spaces/reserve' },
];

export default function Navbar() {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    const [mobileSpaceMenuOpen, setMobileSpaceMenuOpen] = useState(false);
    const navigate = useNavigate();

    function handleLogoClick() {
        navigate('/');
    }

    return (
        <nav className="w-full bg-white shadow-md px-6 py-4">
            <div className="flex items-center justify-between">
                {/* 로고 */}
                <div>
                    <img src="/ArtieLogo.svg" alt="Artie Logo" className="h-6 cursor-pointer" onClick={handleLogoClick} />
                </div>

                {/* PC 메뉴 */}
                <ul className="hidden md:flex gap-6 items-center">
                    {NAV_ITEMS.map((item) => (
                        <li key={item.label}>
                            <Link
                                to={item.path}
                                className={clsx(
                                    'flex items-center px-4 py-2 rounded-full cursor-pointer transition',
                                    location.pathname === item.path ? 'bg-primary-300 text-white' : 'text-default-gray-700',
                                )}
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}

                    {/* 공간 운영 드롭다운 */}
                    <li className="relative flex items-center group">
                        <button
                            className={clsx(
                                'flex items-center px-4 py-2 rounded-full cursor-pointer transition',
                                SPACE_SUB_ITEMS.some((sub) => location.pathname === sub.path) ? 'bg-primary-300 text-white' : 'text-default-gray-700',
                            )}
                        >
                            공간 운영하기
                        </button>

                        <ul
                            className="absolute text-center top-full left-1/2 -translate-x-1/2 mt-3 w-40 
                   bg-white shadow-[0_4px_10px_0_rgba(0,0,0,0.1)] rounded-xl overflow-hidden 
                   z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                        >
                            {SPACE_SUB_ITEMS.map((sub, i) => (
                                <li key={sub.label}>
                                    <Link
                                        to={sub.path}
                                        className={clsx(
                                            'block px-4 py-2 text-sm transition',
                                            i !== SPACE_SUB_ITEMS.length - 1 && 'border-b border-default-gray-400',
                                            location.pathname === sub.path ? 'bg-gray-100 text-primary-300' : 'hover:bg-default-gray-100 text-default-gray-700',
                                        )}
                                    >
                                        {sub.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                </ul>

                {/* 프로필 아이콘 */}
                <Link to="/mypage" className="hidden md:block">
                    <div className="w-10 h-10 rounded-full bg-default-gray-200 overflow-hidden">
                        <img src={profileIcon} alt="프로필이미지" />
                    </div>
                </Link>

                {/* 모바일 메뉴 토글 */}
                <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* 모바일 메뉴 */}
            {menuOpen && (
                <div className="md:hidden mt-4 space-y-2">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.label}
                            to={item.path}
                            onClick={() => setMenuOpen(false)}
                            className={clsx(
                                'block px-4 py-2 rounded-md transition',
                                location.pathname === item.path ? 'bg-primary-300 text-white' : 'text-default-gray-700 hover:bg-default-gray-100',
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}

                    {/* 모바일 공간 운영하기 드롭다운 */}
                    <div>
                        <button
                            onClick={() => setMobileSpaceMenuOpen(!mobileSpaceMenuOpen)}
                            className={clsx(
                                'w-full text-left px-4 py-2 rounded-md transition flex justify-between items-center',
                                SPACE_SUB_ITEMS.some((sub) => location.pathname === sub.path)
                                    ? 'bg-primary-300 text-white'
                                    : 'text-default-gray-700 hover:bg-default-gray-100',
                            )}
                        >
                            <span>공간 운영하기</span>
                            <ChevronDown
                                className={clsx('w-5 h-5 transform transition-transform duration-200', mobileSpaceMenuOpen ? 'rotate-180' : 'rotate-0')}
                            />
                        </button>

                        {mobileSpaceMenuOpen && (
                            <div className="ml-4 mt-2 space-y-1">
                                {SPACE_SUB_ITEMS.map((sub) => (
                                    <Link
                                        key={sub.label}
                                        to={sub.path}
                                        onClick={() => {
                                            setMenuOpen(false);
                                            setMobileSpaceMenuOpen(false);
                                        }}
                                        className={clsx(
                                            'block px-4 py-2 text-sm rounded-md transition',
                                            location.pathname === sub.path ? 'bg-gray-100 text-primary-300' : 'text-default-gray-600 hover:bg-default-gray-100',
                                        )}
                                    >
                                        {sub.label}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    <Link to="/mypage" onClick={() => setMenuOpen(false)}>
                        <div className="flex items-center gap-2 px-4 py-2">
                            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                                <img src={profileIcon} alt="프로필이미지" />
                            </div>
                            <span className="text-default-gray-700">마이페이지</span>
                        </div>
                    </Link>
                </div>
            )}
        </nav>
    );
}
