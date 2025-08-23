import { useState } from 'react';

import profile_change from '../../icons/profile_change.png';
import { Eye, EyeOff } from 'lucide-react';
import logout_icon from '../../icons/logout.svg';
import { useAuth } from '@/context/AuthContext';

export default function ProfileEdit() {
    const { logout, user } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log('Form submitted');
    };

    const handleLogout = async () => {
        logout();
    };

    return (
        <div className="flex items-center gap-5">
            <main className="flex-1">
                <div className="w-full bg-white rounded-2xl shadow-lg p-10">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">개인정보 관리</h1>
                        <div className="flex items-center border border-default-gray-500 px-3 py-1 rounded-2xl gap-2">
                            <button className="text-xs text-default-gray-600" onClick={handleLogout}>
                                로그아웃
                            </button>
                            <img src={logout_icon} alt="로그아웃" className="w-3 h-3" />
                        </div>
                    </div>

                    {/* 프로필 */}
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div className="w-20 h-20 rounded-full flex items-center justify-center">
                                <img src={profile_change} alt="프로필" className="w-20 h-20" />
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form className="flex flex-col gap-4 mx-40">
                        <div>
                            <label className="text-sm font-medium">이름</label>
                            <input
                                type="text"
                                defaultValue={user?.name}
                                className="w-full mt-1 p-3 border border-default-gray-600 rounded-lg focus:outline-none focus:ring-0"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">비밀번호 변경</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="현재 비밀번호 입력"
                                    className="w-full mt-1 p-3 border border-default-gray-600 rounded-lg focus:outline-none focus:ring-0"
                                />
                                <span
                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium">새 비밀번호 (8~16자의 영문, 숫자, 특수기호)</label>
                            <div className="relative mt-1">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="새 비밀번호를 입력해주세요."
                                    className="w-full p-3 border border-default-gray-600 rounded-lg focus:outline-none focus:ring-0"
                                />
                                <span
                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                >
                                    {showNewPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                                </span>
                            </div>

                            <div className="relative mt-3">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="새 비밀번호를 한 번 더 입력해주세요."
                                    className="w-full p-3 border border-default-gray-600 rounded-lg focus:outline-none focus:ring-0"
                                />
                                <span
                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                                </span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="mt-6 w-full py-3 bg-primary-300 text-white font-semibold rounded-full hover:opacity-90"
                        >
                            변경하기
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
