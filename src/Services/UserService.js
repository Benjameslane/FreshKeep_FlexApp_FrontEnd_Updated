import axios from 'axios';

const API_BASE_URL = 'https://localhost:5001/api';

export const getStoreOwnersList = async (userToken) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Users/storeOwners`, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error getting store owners', error);
    throw error;
  }
};