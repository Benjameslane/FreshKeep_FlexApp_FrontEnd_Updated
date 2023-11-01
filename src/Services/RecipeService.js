import axios from 'axios';

const API_URL = 'https://localhost:5001/api/'; 

const getRecipesByExpiringItems = async (days) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No authentication token found");
      return [];
    }

    const response = await axios.get(`${API_URL}recipes/by-expiring-items`, {
      params: { days },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching recipes", error);
    return [];
  }
};


export default {
  getRecipesByExpiringItems
};
