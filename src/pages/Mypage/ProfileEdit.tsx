import { useState } from 'react';
import profile_change from '../../icons/profile_change.png';
import { Eye, EyeOff } from 'lucide-react';
import logout_icon from '../../icons/logout.svg';
import { useAuth } from '@/context/AuthContext';
import { useMutation } from '@tanstack/react-query';
import type { TModifyAuthRequest } from '@/types/auth/auth';
import { modify } from '@/api/auth/auth';

export default function ProfileEdit() {
    const { logout, user } = useAuth();

    const [name, setName] = useState(user?.name || '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { mutate, isPending } = useMutation({
        mutationFn: (data: TModifyAuthRequest) => modify(data),
        onSuccess: (res) => {
            if (res.isSuccess) {
                alert('회원정보가 수정되었습니다');
            } else {
                alert(res.message || '수정에 실패했습니다.');
            }
        },
        onError: (error) => {
            console.error(error);
            alert('에러가 발생했습니다. 다시 시도해주세요.');
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutate({
            newName: name,
            currentPassword,
            newPassword,
            newPasswordConfirmation: newPasswordConfirm,
        });
    };

    const handleLogout = async () => {
        logout();
    };

    return (
        <div className="flex items-center gap-5">
            <main className="flex-1">
                <div className="w-full bg-white rounded-2xl shadow-lg p-10">
                    {/* 헤더 */}
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
                    <form className="flex flex-col gap-4 mx-40" onSubmit={handleSubmit}>
                        <div>
                            <label className="text-sm font-medium">이름</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full mt-1 p-3 border border-default-gray-600 rounded-lg focus:outline-none focus:ring-0"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium">비밀번호 변경</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="현재 비밀번호 입력"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
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
                                    type={showNewPassword ? 'text' : 'password'}
                                    placeholder="새 비밀번호를 입력해주세요."
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
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
                                    value={newPasswordConfirm}
                                    onChange={(e) => setNewPasswordConfirm(e.target.value)}
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
                            disabled={isPending}
                            className="mt-6 w-full py-3 bg-primary-300 text-white font-semibold rounded-full hover:opacity-90 disabled:opacity-50"
                        >
                            {isPending ? '변경 중...' : '변경하기'}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}
