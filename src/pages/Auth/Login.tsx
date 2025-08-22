import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { emailAuthRequest, emailAuthVerify, signup, login } from '@/api/auth/auth';
import { useMutation } from '@tanstack/react-query';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
    const navigate = useNavigate();
    const { login: setLoginState } = useAuth(); // useAuth 가져오기
    const slides = [
        { id: 1, title: '아띠는 친한 친구라는 순우리말이에요. ', middle: '전시가 처음이라 막막해도 괜찮아요.', desc: 'Artie가 옆에서 같이 찾아줄게요.' },
        { id: 2, title: '어디서 전시를 시작해야 할지 몰랐다면', middle: 'Artie가 당신의 전시에 어울리는 공간을', desc: '큐레이션합니다.' },
        { id: 3, title: '몰랐던 우리 동네 전시,', middle: 'Artie는 예술가와 공간을 이어주는 ', desc: 'AI 큐레이터입니다.' },
    ];

    const [current, setCurrent] = useState(0);
    const [authMode, setAuthMode] = useState('login');

    // 입력값 상태
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');

    // 포커스 상태
    const [emailFocused, setEmailFocused] = useState(false);
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [confirmFocused, setConfirmFocused] = useState(false);
    const [nameFocused, setNameFocused] = useState(false);

    // 인증 관련 상태
    const [verificationCode, setVerificationCode] = useState('');
    const [verificationFocused, setVerificationFocused] = useState(false);
    const [isVerificationSent, setIsVerificationSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    // 비밀번호 표시 여부
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [slides.length]);

    useEffect(() => {
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setName('');
        setVerificationCode('');
        setIsVerificationSent(false);
        setIsVerified(false);
    }, [authMode]);

    const progress = ((current + 1) / slides.length) * 100;

    const sendCodeMutation = useMutation<unknown, Error, { email: string }>({
        mutationFn: emailAuthRequest,
        onSuccess: () => {
            setIsVerificationSent(true);
            setIsVerified(false);
        },
        onError: (error) => {
            console.error('인증번호 전송 실패:', error);
            alert('인증번호 전송에 실패했습니다. 다시 시도해주세요.');
        },
    });

    const verifyCodeMutation = useMutation({
        mutationFn: emailAuthVerify,
        onSuccess: () => {
            setIsVerified(true);
        },
        onError: (error) => {
            console.error('인증 실패:', error);
            alert('인증번호가 올바르지 않습니다.');
        },
    });

    const handleVerificationSend = () => {
        if (email) {
            sendCodeMutation.mutate({ email });
        }
    };

    const handleVerificationCheck = () => {
        if (verificationCode) {
            verifyCodeMutation.mutate({ email, code: verificationCode });
        }
    };

    const handleResendVerification = () => {
        setVerificationCode('');
        setIsVerified(false);
        if (email) {
            sendCodeMutation.mutate({ email });
        }
    };

    const loginMutation = useMutation({
        mutationFn: ({ email, password }: { email: string; password: string }) => login({ email, password }),
        onSuccess: (data) => {
            console.log('로그인 성공:', data);
            setLoginState(data.result);
            navigate('/home');
        },
        onError: (error) => {
            console.error('로그인 실패:', error);
            alert('로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.');
        },
    });

    const signupMutation = useMutation({
        mutationFn: ({ email, password, name }: { email: string; password: string; name: string }) => signup({ email, password, name }),
        onSuccess: (data) => {
            console.log('회원가입 성공:', data);
            alert('회원가입이 완료되었습니다!');
            setAuthMode('login');
        },
        onError: (error) => {
            console.error('회원가입 실패:', error);
            alert('회원가입에 실패했습니다. 입력값을 확인해주세요.');
        },
    });

    const handleSubmit = () => {
        if (authMode === 'login') {
            loginMutation.mutate({ email, password });
        } else {
            if (!isVerified) {
                alert('이메일 인증을 완료해주세요.');
                return;
            }
            if (password !== confirmPassword) {
                alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
                return;
            }
            signupMutation.mutate({ email, password, name });
        }
    };

    return (
        <div className="flex h-screen">
            {/* 왼쪽 슬라이드 */}
            <div className="w-1/2 flex flex-col relative bg-pink-50">
                <div className="p-6">
                    <div className="text-2xl font-bold text-primary-300">Artie</div>
                </div>
                <div className="flex-1 flex items-center justify-center overflow-hidden relative">
                    <div
                        className="flex transition-transform duration-500"
                        style={{
                            transform: `translateX(-${current * 100}%)`,
                            width: `${slides.length * 100}%`,
                        }}
                    >
                        {slides.map((slide) => (
                            <div key={slide.id} className="w-full flex-shrink-0 flex flex-col items-center px-8">
                                <h2 className="text-3xl text-primary-300 font-bold mb-4 text-center">{slide.title}</h2>
                                <p className="text-lg text-primary-300 text-center">{slide.middle}</p>
                                <p className="text-lg text-primary-300 text-center">{slide.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full h-1 bg-gray-300">
                    <div className="h-full bg-red-500 transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
            </div>

            {/* 오른쪽 로그인/회원가입 */}
            <div className="w-1/2 flex items-center justify-center bg-white">
                <div className="w-80">
                    {/* 탭 버튼 */}
                    <div className="flex border border-primary-300 text-primary-300 rounded-full mb-6 overflow-hidden select-none">
                        <button
                            onClick={() => setAuthMode('login')}
                            className={`flex-1 py-2 font-semibold transition-colors duration-200 ${
                                authMode === 'login' ? 'bg-primary-300 text-white cursor-default rounded-full' : 'text-primary-300 bg-white cursor-pointer'
                            }`}
                            type="button"
                        >
                            로그인
                        </button>
                        <button
                            onClick={() => setAuthMode('signup')}
                            className={`flex-1 py-2 font-semibold transition-colors duration-200 ${
                                authMode === 'signup' ? 'bg-primary-300 text-white cursor-default rounded-full' : 'text-primary-300 bg-white cursor-pointer'
                            }`}
                            type="button"
                        >
                            회원가입
                        </button>
                    </div>

                    {/* 이메일 */}
                    <div className={`mb-3 flex flex-col gap-1 transition-colors ${emailFocused || email ? 'text-primary-300' : 'text-gray-400'}`}>
                        <p className="text-sm transition-colors">이메일</p>
                        {authMode === 'login' ? (
                            <input
                                type="email"
                                value={email}
                                onFocus={() => setEmailFocused(true)}
                                onBlur={() => setEmailFocused(false)}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="이메일"
                                className="border border-gray-300 p-2 w-full rounded text-gray-900 focus:border-primatext-primary-300 focus:outline-none transition-colors focus:placeholder-transparent"
                            />
                        ) : (
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    value={email}
                                    onFocus={() => setEmailFocused(true)}
                                    onBlur={() => setEmailFocused(false)}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="예 : artieMail@artie.com"
                                    className="border border-gray-300 p-2 flex-[2] rounded text-gray-900 focus:border-primatext-primary-300 focus:outline-none transition-colors focus:placeholder-transparent"
                                />
                                <button
                                    type="button"
                                    onClick={handleVerificationSend}
                                    disabled={!email || isVerificationSent}
                                    className={`flex-1 rounded text-sm font-medium transition-colors ${
                                        !email || isVerificationSent
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-primary-300 text-white hover:bg-red-500'
                                    }`}
                                >
                                    {isVerificationSent ? '전송완료' : '인증번호 전송'}
                                </button>
                            </div>
                        )}
                    </div>

                    {authMode === 'signup' && isVerificationSent && (
                        <div
                            className={`mb-3 flex flex-col gap-1 transition-all duration-300 ${verificationFocused || verificationCode ? 'text-primary-300' : 'text-gray-400'}`}
                        >
                            <p className="text-sm transition-colors">인증번호</p>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={verificationCode}
                                    onFocus={() => setVerificationFocused(true)}
                                    onBlur={() => setVerificationFocused(false)}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    placeholder="인증번호를 입력하세요"
                                    disabled={isVerified}
                                    className={`border p-2 flex-[3] rounded text-gray-900 focus:outline-none transition-colors focus:placeholder-transparent ${
                                        isVerified ? 'border-primary-300 bg-primary-300/50' : 'border-gray-300 focus:border-primatext-primary-300'
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={handleVerificationCheck}
                                    disabled={!verificationCode || isVerified}
                                    className={`flex-1 rounded text-sm font-medium transition-colors ${
                                        !verificationCode || isVerified
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : 'bg-primary-300 text-white hover:bg-primary-200'
                                    }`}
                                >
                                    {isVerified ? '인증완료' : '확인'}
                                </button>
                                <button
                                    type="button"
                                    onClick={handleResendVerification}
                                    disabled={isVerified}
                                    className={`flex-1 rounded text-sm font-medium transition-colors ${
                                        isVerified ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-500 text-white hover:bg-gray-600'
                                    }`}
                                >
                                    재전송
                                </button>
                            </div>
                            {isVerified && <p className="text-xs text-primary-300 mt-1">✓ 인증이 완료되었습니다.</p>}
                        </div>
                    )}

                    {/* 비밀번호 */}
                    <div className={`mb-5 flex flex-col gap-1 transition-colors ${passwordFocused || password ? 'text-primary-300' : 'text-gray-400'}`}>
                        <p className="text-sm transition-colors">{authMode === 'login' ? '비밀번호' : '비밀번호 (8~16자의 영문, 숫자, 특수기호)'}</p>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={() => setPasswordFocused(false)}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={authMode === 'login' ? '비밀번호' : '영문, 숫자 포함 8자 이상'}
                                className="border border-gray-300 p-2 w-full rounded pr-10 text-gray-900 focus:border-primatext-primary-300 focus:outline-none transition-colors focus:placeholder-transparent"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            >
                                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* 회원가입 전용 - 비밀번호 확인 */}
                    {authMode === 'signup' && (
                        <div
                            className={`mb-5 flex flex-col gap-1 transition-colors ${confirmFocused || confirmPassword ? 'text-primary-300' : 'text-gray-400'}`}
                        >
                            <p className="text-sm transition-colors">비밀번호 확인</p>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onFocus={() => setConfirmFocused(true)}
                                    onBlur={() => setConfirmFocused(false)}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="비밀번호를 한번 더 입력해주세요."
                                    className="border border-gray-300 p-2 w-full rounded pr-10 text-gray-900 focus:border-primatext-primary-300 focus:outline-none transition-colors focus:placeholder-transparent"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                >
                                    {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* 회원가입 전용 - 이름 */}
                    {authMode === 'signup' && (
                        <div className={`mb-3 flex flex-col gap-1 transition-colors ${nameFocused || name ? 'text-primary-300' : 'text-gray-400'}`}>
                            <p className="text-sm transition-colors">이름</p>
                            <input
                                type="text"
                                value={name}
                                onFocus={() => setNameFocused(true)}
                                onBlur={() => setNameFocused(false)}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="이름을 입력하세요"
                                className="border border-gray-300 p-2 w-full rounded text-gray-900 focus:border-primatext-primary-300 focus:outline-none transition-colors focus:placeholder-transparent"
                            />
                        </div>
                    )}

                    <button className="bg-primary-300 w-full text-white py-2 rounded-full mb-3 hover:bg-red-500 transition-colors" onClick={handleSubmit}>
                        {authMode === 'login' ? '로그인' : '회원가입'}
                    </button>
                </div>
            </div>
        </div>
    );
}
