import { Outlet } from 'react-router-dom';
import MyPageNav from '../Components/MyPage/MyPageNav';

export default function MyPage() {
    return (
        <div className="flex items-center w-[80%] p-10 gap-20 mx-auto">
            {/* 네비바 */}
            <div className="w-[180px] shrink-0">
                <MyPageNav />
            </div>

            {/* 우측 컨텐츠 영역 */}
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    );
}
