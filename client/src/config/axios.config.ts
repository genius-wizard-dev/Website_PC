// axios.config.ts
import axios, { AxiosError } from 'axios';

// Tạo instance axios với các cấu hình mặc định
const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '',

});

// Xử lý interceptor cho response
instance.interceptors.response.use(
    // Xử lý khi response thành công
    response => {
        return response;
    },
    // Xử lý khi có lỗi
    (error: AxiosError) => {
        if (error.response) {
            // Lỗi từ phía server (có response)
            console.error('Lỗi Response:', {
                status: error.response.status,
                data: error.response.data,
                message: error.message
            });
        } else if (error.request) {
            // Lỗi không nhận được response
            console.error('Lỗi Request:', error.request);
        } else {
            // Lỗi trong quá trình thiết lập request
            console.error('Lỗi:', error.message);
        }
        return Promise.reject(error);
    }
);

// Xuất instance để sử dụng trong ứng dụng
export default instance;
