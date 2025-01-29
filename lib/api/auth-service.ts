import axiosInstance from './axios-instance';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginResponse {
    access_token: string;
}

export const setAuthHeaders = async () => {
    const token: string | null = await AsyncStorage.getItem('access_token');
    if (token) {
        axiosInstance.defaults.headers.common['token'] = token;
        axiosInstance.defaults.headers['token'] = token;
    }
}

export const login = async (username: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await axiosInstance.post('/auth/token', {
            grant_type: 'password',
            username,
            password,
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        // Add the received token to axios instance options
        const token = response.data.access_token;
        // Store the token in async storage
        await AsyncStorage.setItem('access_token', token);
        await setAuthHeaders();

        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};

export const logout = async () => {
    await AsyncStorage.removeItem('access_token');
    delete axiosInstance.defaults.headers.common['token'];
    delete axiosInstance.defaults.headers['token'];
};
