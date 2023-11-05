import axios from 'axios';

const API_BASE_URL = 'https://localhost:5001/api';

export const getUserInventory = async (userToken) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Fooditem/myInventory`, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error getting user inventory', error);
    throw error;
  }
};

export const getExpiringFoodItems = async (userToken) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Fooditem/expiring`, {
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

export const addFoodItem = async (foodItem, userToken) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Fooditem`, foodItem, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding food item', error);
    throw error;
  }
};

export const getDiscountedStoreFoodItems = async (userToken) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/StoreFoodItem/discounted`, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error getting discounted store food items', error);
    throw error;
  }
};

export const getListedStoreFoodItems = async (userToken) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/StoreFoodItem/listed`, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error getting listed store food items', error);
    throw error;
  }
};

export const getStoreInventory = async (userToken) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/StoreFoodItem/storeInventory`, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error getting store inventory', error);
    throw error;
  }
};

export const getDiscountedStoreInventoryByStoreOwner = async (storeOwnerId, userToken) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/StoreFoodItem/storeInventory/discounted/byStoreOwner?id=${storeOwnerId}`, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error getting store inventory by store owner', error);
    throw error;
  }
};

export const getNotificationStatus = async (userToken) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/StoreFoodItem/notification`, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error getting expiring food notification status', error);
    throw error;
  }
};

export const addStoreFoodItem = async (foodItem, userToken) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/StoreFoodItem`, foodItem, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding store food item', error);
    throw error;
  }
};

export const updateFoodItem = async (foodItem, userToken) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/Fooditem/${foodItem.id}`, foodItem, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating food item', error);
    throw error;
  }
};

export const updateStoreFoodItem = async (foodItem, userToken) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/StoreFoodItem/${foodItem.id}`, foodItem, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating store food item', error);
    throw error;
  }
};

export const deleteFoodItem = async (foodItemId, userToken) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/Fooditem/${foodItemId}`, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting food item', error);
    throw error;
  }
};

export const deleteStoreFoodItem = async (foodItemId, userToken) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/StoreFoodItem/${foodItemId}`, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting store food item', error);
    throw error;
  }
};