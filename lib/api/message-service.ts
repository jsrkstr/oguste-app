import axiosInstance from './axios-instance';

export const fetchMessages = async (conversationId: string) => {
  try {
    // const response = await axiosInstance.get(`/users/me/data`);
    // return response.data;
    return [
      {
        id: '1',
        conversation_id: "4d2802ad-ffcf-4df4-b565-bc96c5e7e21d",
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        metadata: {},
        created_at:  "2025-01-21T13:48:53.839000",
        updated_at: "2025-01-21T13:48:53.839000"
      },
      {
        id: '2',
        conversation_id: "4d2802ad-ffcf-4df4-b565-bc96c5e7e21d",
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        metadata: {},
        created_at:  "2025-01-21T13:48:53.839000",
        updated_at: "2025-01-21T13:48:53.839000"
      },
      {
        id: '3',
        conversation_id: "7195d448-3c80-422d-a090-bddbb07744f9",
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        metadata: {},
        created_at:  "2025-01-21T13:48:53.839000",
        updated_at: "2025-01-21T13:48:53.839000"
      },
      {
        id: '4',
        conversation_id: "7195d448-3c80-422d-a090-bddbb07744f9",
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        metadata: {},
        created_at:  "2025-01-21T13:48:53.839000",
        updated_at: "2025-01-21T13:48:53.839000"
      },
    ];
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
