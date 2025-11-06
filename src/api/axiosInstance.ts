import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosRequestConfig } from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    withCredentials: true,
    timeout: 1000 * 15,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

/** 🍪 쿠키에서 XSRF-TOKEN 추출 */
const getCsrfTokenFromCookie = (): string | null => {
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    return match ? decodeURIComponent(match[1].trim()) : null;
};

/** 🧩 CSRF 토큰이 없을 경우 서버로 요청하여 쿠키 + 헤더 기반으로 발급 */
const ensureCsrfCookie = async (): Promise<string | null> => {
    let token = getCsrfTokenFromCookie();
    if (!token) {
        try {
            console.log('🔄 CSRF 토큰 없음 → 서버에 발급 요청 중...');
            const res = await axios.get(`${baseURL}/api/v1/security/csrf`, {
                withCredentials: true,
            });

            // ✅ 1. 응답 본문에서 result 속성 내 토큰 추출 (UUID 패턴)
            const resultText: string = res.data?.result ?? '';
            const match = resultText.match(/[0-9a-fA-F-]{36}/);
            if (match) {
                token = match[0];
                console.log('✅ 응답 본문에서 토큰 추출 성공:', token);
            }

            // ✅ 2. 응답 헤더에도 혹시 토큰이 있으면 헤더에서 가져오기
            const headerToken = res.headers['x-xsrf-token'];
            if (!token && headerToken) {
                token = headerToken;
                console.log('✅ 응답 헤더에서 토큰 추출 성공:', token);
            }

            // ✅ 3. 쿠키 저장을 보장하기 위해 microtask 대기
            await new Promise((resolve) => setTimeout(resolve, 0));

            // ✅ 4. 쿠키 재확인 (혹시 서버가 직접 Set-Cookie한 경우)
            if (!token) {
                token = getCsrfTokenFromCookie();
                if (!token) console.warn('⚠️ 응답 본문/헤더/쿠키 어디에서도 CSRF 토큰 찾기 실패');
            }

            return token || null;
        } catch (err) {
            console.error('❌ CSRF 토큰 발급 실패:', err);
            throw err;
        }
    }

    return token;
};

/** 🧾 요청 인터셉터 — POST/PUT/PATCH/DELETE 시 CSRF 헤더 첨부 */
axiosInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const method = config.method?.toUpperCase();

        if (method && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
            const token = (await ensureCsrfCookie()) || getCsrfTokenFromCookie();

            if (token) {
                config.headers['X-XSRF-TOKEN'] = token;
                console.log('✅ X-XSRF-TOKEN 헤더 추가:', token.slice(0, 10) + '...');
            } else {
                console.warn('⚠️ CSRF 토큰 없음 — 헤더 미부착');
            }
        }

        return config;
    },
    (error) => Promise.reject(error),
);

/** 🪪 응답 인터셉터 — 세션 만료 시 재발급 처리 */
axiosInstance.interceptors.response.use(
    (res) => {
        // ✅ 서버 응답 헤더에 새 CSRF 토큰이 있으면 쿠키로 갱신
        const newToken = res.headers['x-xsrf-token'];
        if (newToken) {
            document.cookie = `XSRF-TOKEN=${newToken}; path=/`;
            console.log('♻️ 응답 헤더로부터 CSRF 토큰 갱신');
        }

        return res;
    },
    async (error) => {
        const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            // 홈('/') 페이지가 아닐 때만 재발급 시도
            if (window.location.pathname !== '/') {
                try {
                    await axios.post(`${baseURL}/api/v1/security/reissue-cookie`, null, {
                        withCredentials: true,
                    });
                    return axiosInstance(originalRequest);
                } catch (reissueError) {
                    console.error('❌ 토큰 재발급 실패:', reissueError);
                    window.location.href = '/';
                }
            }
        }

        return Promise.reject(error);
    },
);

export default axiosInstance;
