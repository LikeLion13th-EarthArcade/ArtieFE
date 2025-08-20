import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
}); //일단은 VITE_API_BASE_URL로 설정해두고, 추후에 변경 필요하고 쿠키로 인증을 받을 예정입니다
// withCredentials: true는 쿠키를 포함한 요청을 보내기 위해 설정합니하고 이 설정은 CORS 요청에서 쿠키를 전송할 때 필요합니닷
