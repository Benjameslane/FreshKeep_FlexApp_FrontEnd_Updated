import axios from 'axios';

const API_BASE_URL = 'https://localhost:5001/api'; 

export const getNearestFoodShelters = async (latitude, longitude) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/foodshelters/nearest`, {
      params: { latitude, longitude },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching food shelters:', error);
    throw error;
  }
};

export const getUserLocation = async (address) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/UserLocation/byAddress`, {
      params: { address },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting user location:', error);
    throw error;
  }
};
