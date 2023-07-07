import axios from 'axios';

const BASE_URL = 'http://localhost:5000';

export const getDishes = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/food_items`);
    return response.data;
  } catch (error) {
    console.error('Error retrieving dishes:', error);
    return [];
  }
};

export const placeOrder = async (order) => {
  try {
    const response = await axios.post(`${BASE_URL}/orders`, order);
    return response.data;
  } catch (error) {
    console.error('Error placing order:', error);
    return null;
  }
};
