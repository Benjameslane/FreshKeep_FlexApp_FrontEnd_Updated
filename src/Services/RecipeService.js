import axios from 'axios';

const API_BASE_URL = 'https://localhost:5001/api';

export const getRecipes = async (expiringFood, userToken) => {
  try {
    const itemNames = expiringFood.map(foodItem => foodItem.itemName).join(',+');
    const response = await axios.get(`${API_BASE_URL}/Recipe?ingredients=${itemNames}`, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error getting expiring food items', error);
    throw error;
  }
};