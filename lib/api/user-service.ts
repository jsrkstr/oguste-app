import axiosInstance from './axios-instance';

export const fetchUserData = async () => {
  try {
    const response = await axiosInstance.get(`/users/me/data`);
    return response.data;
  } catch (error) {
    console.log('Error fetching user data:', error);
    throw error;
  }
};
