import axiosInstance from './axios-instance';

interface LoginResponse {
    access_token: string;
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
        axiosInstance.defaults.headers.common['token'] = token;
        axiosInstance.defaults.headers['token'] = token;

        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        throw error;
    }
};
