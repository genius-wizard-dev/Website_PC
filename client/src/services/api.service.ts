import { AxiosResponse } from 'axios';
import instance from '../config/axios.config';

export const get = async <T>(uri: string, token?: string, params?: any): Promise<AxiosResponse<T>> => {
    try {
        const headers: any = {};
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const res = await instance.get<T>(uri, {
            headers,
            params
        });
        return res;
    } catch (error: any) {
        throw error;
    }
};

export const post = async <T>(
    uri: string,
    data?: any,
    token?: string
): Promise<AxiosResponse<T>> => {
    try {
        const headers: any = {};
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const res = await instance.post<T>(uri, data, { headers });
        return res;
    } catch (error: any) {
        throw error;
    }
};

export const put = async <T>(uri: string, data?: any, token?: string): Promise<AxiosResponse<T>> => {
    try {
        const headers: any = {};
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const res = await instance.put<T>(uri, data, { headers });
        return res;
    } catch (error: any) {
        throw error;
    }
};

export const del = async <T>(uri: string, data?: any, token?: string): Promise<AxiosResponse<T>> => {
    try {
        const headers: any = {};
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const res = await instance.delete<T>(uri, {
            headers,
            data
        });
        return res;
    } catch (error: any) {
        throw error;
    }
};

export const patch = async <T>(uri: string, data?: any, token?: string): Promise<AxiosResponse<T>> => {
    try {
        const headers: any = {};
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const res = await instance.patch<T>(uri, data, { headers });
        return res;
    } catch (error: any) {
        throw error;
    }
};


// Example usage functions
// export const fetchBannerData = () => api.get<{ result: BannerData[] }>(ENDPOINTS.BANNER);
// export const getCategories = () => api.get<{ result: Category[] }>(ENDPOINTS.CATEGORIES);
// export const loginUser = (credentials: Credentials) => api.post<LoginResponse>(ENDPOINTS.LOGIN, credentials);
// export const getAdvertisementById = (id: number) => api.get(`${ENDPOINTS.ADVERTISEMENT}/${id}`);
// export const getAllReviewsAdvertisementById = (id: number) => api.get(`${ENDPOINTS.REVIEWS}/${id}`);
