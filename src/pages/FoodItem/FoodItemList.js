import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';  

const FoodItemList = () => {
  const [foodItems, setFoodItems] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchFoodItems = async () => {
      
      try {
        console.log(token)
        const response = await fetch('https://localhost:5001/api/FoodItem', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        setFoodItems(data);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };
    
    if (token) {
      fetchFoodItems();
    }
  }, [token]);

  const isCloseToExpiry = (expirationDate) => {
    const today = new Date();
    const expiryDate = new Date(expirationDate);
    const timeDiff = expiryDate.getTime() - today.getTime();
    const dayDiff = timeDiff / (1000 * 3600 * 24);
    return dayDiff <= 7;
  };

  return (
    <div>
      <h2>Your Food Items</h2>
      <table>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Expiration Date</th>
            <th>Quantity</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {foodItems.length > 0 ? (
            foodItems.map((item) => (
              <tr key={item.id} style={isCloseToExpiry(item.expirationDate) ? { backgroundColor: 'yellow' } : null}>
                <td>{item.itemName}</td>
                <td>{new Date(item.expirationDate).toLocaleDateString()}</td>
                <td>{item.quantity}</td>
                <td>{item.category}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No food items found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FoodItemList;
