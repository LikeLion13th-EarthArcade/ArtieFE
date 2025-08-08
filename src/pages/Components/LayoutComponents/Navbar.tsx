import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import profileIcon from '../../../icons/profile.svg';

const NAV_ITEMS = [
    { label: '지금 뜨는 전시', path: '/' },
    { label: '전시 찾기', path: '/exhibitions/search' },
    { label: '전시 등록하기', path: '/exhibitions/request' },
    { label: '공간 대여하기', path: '/spaces' },
    { label: '공간 운영하기', path: '/spaces/request' },
];

export default function Navbar() {
    const location = useLocation();

    return (
        <nav className="w-full flex items-center justify-between px-6 py-4 bg-white shadow-md">
            <div>
                <img src="/ArtieLogo.svg" alt="Artie Logo" className="h-6" />
            </div>

            <ul className="flex gap-6">
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
            <Link to="/mypage">
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                    <img src={profileIcon} alt="프로필이미지" />
                </div>
            </Link>
        </nav>
    );
}
