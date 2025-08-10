import { useState, useEffect } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

export default function LandingLoginPage() {
    const slides = [
        { id: 1, title: '아띠는 ‘친한 친구’라는 순우리말이에요. ', middle: '전시가 처음이라 막막해도 괜찮아요.', desc: 'Artie가 옆에서 같이 찾아줄게요.' },
        { id: 2, title: '어디서 전시를 시작해야 할지 몰랐다면', middle: 'Artie가 당신의 전시에 어울리는 공간을', desc: '큐레이션합니다.' },
        { id: 3, title: '몰랐던 우리 동네 전시,', middle: 'Artie는 예술가와 공간을 이어주는 ', desc: 'AI 큐레이터입니다.' },
    ];

    const [current, setCurrent] = useState(0);
    const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const progress = ((current + 1) / slides.length) * 100;

    return (
        <div className="flex h-screen">
            {/* 왼쪽 슬라이드 */}
            <div className="w-1/2 flex flex-col relative bg-[#FDF4F4]">
                <img src="/ArtieLogo.svg" alt="Artie로고" className="p-6" />
                <div className="flex-1 flex items-center justify-center overflow-hidden relative">
                    <div
                        className="flex transition-transform duration-500"
                        style={{
                            transform: `translateX(-${current * 100}%)`,
                            width: `${slides.length * 100}%`,
                        }}
                    >
                        {slides.map((slide) => (
                            <div key={slide.id} className="w-full flex-shrink-0 flex flex-col items-center">
                                <h2 className="text-3xl text-[#E45F5F] font-bold mb-4">{slide.title}</h2>
                                <p className="text-lg text-[#E45F5F]">{slide.middle}</p>
                                <p className="text-lg text-[#E45F5F]">{slide.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full h-1 bg-gray-300">
                    <div className="h-full bg-red-500 transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
            </div>

            <div className="w-1/2 flex items-center justify-center bg-white">
                <div className="w-80">
                    <div className="flex border border-[#E45F5F] rounded-full mb-6 overflow-hidden select-none">
                        <button
                            onClick={() => setAuthMode('login')}
                            className={`flex-1 py-2 font-semibold transition-colors duration-200 ${
                                authMode === 'login' ? 'bg-[#E45F5F] text-white cursor-default rounded-full' : 'text-[#E45F5F] bg-white cursor-pointer'
                            }`}
                            type="button"
                        >
                            로그인
                        </button>
                        <button
                            onClick={() => setAuthMode('signup')}
                            className={`flex-1 py-2 font-semibold transition-colors duration-200 ${
                                authMode === 'signup' ? 'bg-[#E45F5F] text-white cursor-default rounded-full' : 'text-[#E45F5F] bg-white cursor-pointer'
                            }`}
                            type="button"
                        >
                            회원가입
                        </button>
                    </div>

                    <div className="mb-3 flex flex-col gap-1 focus-within:text-[#E45F5F] transition-colors">
                        <p className="text-[#999] text-sm transition-colors">이메일</p>
                        <input
                            type="email"
                            placeholder={authMode === 'login' ? '이메일' : '예 : artieMail@artie.com'}
                            className="border border-gray-300 p-2 w-full rounded focus:border-[#E45F5F] focus:outline-none transition-colors focus:placeholder-transparent"
                        />
                    </div>

                    {/* 비밀번호 */}
                    <div className="mb-5 flex flex-col gap-1 transition-colors">
                        <p className="text-[#999] text-sm transition-colors">
                            {authMode === 'login' ? '비밀번호' : '비밀번호 (8~16자의 영문, 숫자, 특수기호)'}
                        </p>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder={authMode === 'login' ? '비밀번호' : '영문, 숫자 포함 8자 이상'}
                                className="border border-gray-300 p-2 w-full rounded pr-10 focus:border-[#E45F5F] focus:outline-none transition-colors focus:placeholder-transparent"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                {showPassword ? <EyeIcon size={18} /> : <EyeOffIcon size={18} />}
                            </button>
                        </div>
                    </div>

                    {authMode === 'signup' && (
                        <div className="mb-5 flex flex-col gap-1 transition-colors">
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="비밀번호를 한번 더 입력해주세요."
                                    className="border border-gray-300 p-2 w-full rounded pr-10 focus:border-[#E45F5F] focus:outline-none transition-colors focus:placeholder-transparent"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                >
                                    {showConfirmPassword ? <EyeIcon size={18} /> : <EyeOffIcon size={18} />}
                                </button>
                            </div>
                        </div>
                    )}

                    {authMode === 'signup' && (
                        <div className="mb-3 flex flex-col gap-1 focus-within:text-[#E45F5F] transition-colors">
                            <p className="text-[#999] text-sm transition-colors">이름</p>
                            <input
                                type="text"
                                placeholder="이름을 입력하세요"
                                className="border border-gray-300 p-2 w-full rounded focus:border-[#E45F5F] focus:outline-none transition-colors focus:placeholder-transparent"
                            />
                        </div>
                    )}

                    <button className="bg-[#E45F5F] w-full text-white py-2 rounded-full mb-3">{authMode === 'login' ? '로그인' : '회원가입'}</button>
                </div>
            </div>
        </div>
    );
}
